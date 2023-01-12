import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import spinnerAnimation from "../assets/animations/spinner.json";

const TokenMintSpinner: React.FC = () => {
    const spinnerRef = useRef(null);

    useEffect(() => {
        if (spinnerRef.current) {
            lottie.loadAnimation({
                container: spinnerRef.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: spinnerAnimation,
            });
        }
    }, []);

    return (
            <div
                    data-testid="spinner"
                    ref={ spinnerRef }>
            </div>
    )
}

export default TokenMintSpinner