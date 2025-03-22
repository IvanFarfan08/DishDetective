'use client';
import React, { Component } from 'react';
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import { video } from 'framer-motion/client';
import { CardSectionWebCam } from "@/components/ui/CardSectionWebCam";
import { CardCheckout } from "@/components/ui/CardCheckout";

interface Item {
    name: string;
    confidence: number;
    price: number;
}

interface State {
    checkoutItems: Item[];
    itemPrices: Record<string, number>;
    pricesLoaded: boolean;
}

class WebcamManager {
    webcam: any;
    labelContainer: any;
    width: number = 430;
    height: number = 400;
    flip: boolean = true;

    async setupWebcam() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const camToUse = videoDevices[1].deviceId;
        this.webcam = new tmImage.Webcam(this.width, this.height, this.flip);
        await this.webcam.setup({ deviceId: camToUse });
    }

    attachWebcam(isIos: boolean) {
        if (isIos) {
            document.getElementById('webcam-container')?.appendChild(this.webcam.webcam);
            const webCamVideo = document.getElementsByTagName('video')[0];
            webCamVideo.setAttribute("playsinline", "true");
            webCamVideo.muted = true;
            webCamVideo.style.width = this.width + 'px';
            webCamVideo.style.height = this.height + 'px';
            webCamVideo.style.borderRadius = '0.75rem';
        } else {
            document.getElementById("webcam-container")?.appendChild(this.webcam.canvas);
            this.webcam.canvas.style.borderRadius = '0.75rem';
        }
    }

    play() {
        this.webcam.play();
    }

    update() {
        this.webcam.update();
    }
}

class ModelManager {
    model: any;
    maxPredictions: number = 0;

    async loadModel() {
        const URL = 'https://teachablemachine.withgoogle.com/models/0wJKr_-2l/';
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        this.model = await tmImage.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();
    }

    async predict(webcam: any, isIos: boolean) {
        return isIos ? await this.model.predict(webcam.webcam) : await this.model.predict(webcam.canvas);
    }
}

class PriceManager {
    prices: Record<string, number> = {};

    async loadPrices() {
        try {
            const response = await fetch('/api/items');
            const items = await response.json();
            items.forEach((item: { name: string, price: number }) => {
                this.prices[item.name.toLowerCase()] = Number(item.price);
            });
            return this.prices;
        } catch (error) {
            console.error('Error loading prices:', error);
            return null;
        }
    }
}

class Home extends Component<{}, State> {
    initialized = false;
    webcamManager = new WebcamManager();
    modelManager = new ModelManager();
    priceManager = new PriceManager();

    constructor(props: {}) {
        super(props);
        this.state = {
            checkoutItems: [],
            itemPrices: {},
            pricesLoaded: false,
        };
    }

    componentDidMount() {
        if (this.initialized) return;
        this.initialized = true;
        this.init();
    }

    componentWillUnmount() {
        if (this.webcamManager.webcam) {
            this.webcamManager.webcam.stop();
        }
    }

    async init() {
        const prices = await this.priceManager.loadPrices();
        if (!prices) {
            console.error('Failed to load prices');
            return;
        }
        this.setState({ itemPrices: prices, pricesLoaded: true });

        await this.modelManager.loadModel();
        await this.webcamManager.setupWebcam();

        const isIos = window.navigator.userAgent.indexOf('iPhone') > -1 || 
                      window.navigator.userAgent.indexOf('iPad') > -1;

        this.webcamManager.attachWebcam(isIos);
        this.webcamManager.play();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    async loop() {
        this.webcamManager.update();
        await this.predict();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    async predict() {
        const prediction = await this.modelManager.predict(this.webcamManager.webcam, this.isIos());
        let highestPrediction = prediction[0];
        for (let i = 0; i < this.modelManager.maxPredictions; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }

            const classPrediction =
                prediction[i].className + ': ' + (prediction[i].probability.toFixed(2) * 100) + '%';
            if (this.webcamManager.labelContainer?.childNodes[i]) {
                this.webcamManager.labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }

        if (highestPrediction.probability > 0.9 && highestPrediction.className !== 'background') {
            const itemName = highestPrediction.className.toLowerCase();
            const price = this.priceManager.prices[itemName];
            if (typeof price === 'undefined') {
                console.log('Price not found for item:', itemName);
                return;
            }

            this.setState((prevState: State) => {
                if (!prevState.checkoutItems.some(item => item.name === itemName)) {
                    return {
                        checkoutItems: [...prevState.checkoutItems, {
                            name: itemName,
                            confidence: highestPrediction.probability,
                            price: price
                        }]
                    };
                }
                return prevState;
            });
        }
    }

    isIos() {
        return window.navigator.userAgent.indexOf('iPhone') > -1 || 
               window.navigator.userAgent.indexOf('iPad') > -1;
    }

    render() {
        return (
            <div
                className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/Images/BcFood2.jpg')", // Replace with your actual image path
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
    
                {/* Content */}
                <div className="relative z-10 flex justify-center items-center min-h-screen">
                    <div className="flex justify-center items-center space-x-10">
                        <CardSectionWebCam />
                        <CardCheckout items={this.state.checkoutItems} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;