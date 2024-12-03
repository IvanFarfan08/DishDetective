import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function CardSectionWebCam() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem>
                    <div className="text-lg font-bold">
                        <p>Place your food under the camera</p>
                    </div>
                    <div className="h-5"></div>
                    <div id="webcam-container"></div>
                    {/* <div id="label-container" className="mt-4 text-sm text-gray-600"></div> */}
                </CardItem>
            </CardBody>
        </CardContainer>
    );
} 