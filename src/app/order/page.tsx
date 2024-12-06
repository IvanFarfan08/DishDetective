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

class Home extends Component<{}, State> {
    initialized = false;
    prices: Record<string, number> = {};
    model: any;
    webcam: any;
    labelContainer: any;
    maxPredictions: number = 0;

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
        if (this.webcam) {
            this.webcam.stop();
        }
    }

    async loadPrices() {
        try {
            const response = await fetch('/api/items');
            const items = await response.json();
            const prices: Record<string, number> = {};
            items.forEach((item: { name: string, price: number }) => {
                prices[item.name.toLowerCase()] = Number(item.price);
            });
            this.prices = prices;
            this.setState({ itemPrices: prices, pricesLoaded: true });
            // console.log(prices)
            return prices;
        } catch (error) {
            console.error('Error loading prices:', error);
            return null;
        }
    }

    async init() {
        const prices = await this.loadPrices();
        if (!prices) {
            console.error('Failed to load prices');
            return;
        }

        const URL = 'https://teachablemachine.withgoogle.com/models/LTvl9244F/';
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        this.model = await tmImage.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        const flip = true;
        const width = 430;
        const height = 400;
        const camToUse = videoDevices[1].deviceId;
        this.webcam = new tmImage.Webcam(width, height, flip);
        await this.webcam.setup({ deviceId: camToUse });

        const isIos = window.navigator.userAgent.indexOf('iPhone') > -1 || 
                      window.navigator.userAgent.indexOf('iPad') > -1;

        if (isIos) {
            document.getElementById('webcam-container')?.appendChild(this.webcam.webcam);
            const webCamVideo = document.getElementsByTagName('video')[0];
            webCamVideo.setAttribute("playsinline", "true");
            webCamVideo.muted = true;
            webCamVideo.style.width = width + 'px';
            webCamVideo.style.height = height + 'px';
            webCamVideo.style.borderRadius = '0.75rem';
        } else {
            document.getElementById("webcam-container")?.appendChild(this.webcam.canvas);
            this.webcam.canvas.style.borderRadius = '0.75rem';
        }

        this.labelContainer = document.getElementById('label-container');
        for (let i = 0; i < this.maxPredictions; i++) {
            this.labelContainer?.appendChild(document.createElement('div'));
        }

        this.webcam.play();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    async loop() {
        this.webcam.update();
        await this.predict();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    async predict() {
        let prediction;
        const isIos = window.navigator.userAgent.indexOf('iPhone') > -1 || 
                      window.navigator.userAgent.indexOf('iPad') > -1;

        if (isIos) {
            prediction = await this.model.predict(this.webcam.webcam);
        } else {
            prediction = await this.model.predict(this.webcam.canvas);
        }

        let highestPrediction = prediction[0];
        for (let i = 0; i < this.maxPredictions; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }

            const classPrediction =
                prediction[i].className + ': ' + (prediction[i].probability.toFixed(2) * 100) + '%';
            if (this.labelContainer?.childNodes[i]) {
                this.labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }

        if (highestPrediction.probability > 0.9 && highestPrediction.className !== 'background') {
            const itemName = highestPrediction.className.toLowerCase();
            const price = this.prices[itemName];
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