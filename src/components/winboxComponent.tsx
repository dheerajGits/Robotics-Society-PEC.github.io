"use client";
import { useEffect, useRef } from "react";

declare global {
    interface Window {
        WinBox: any;
    }
}

export default function WinBoxComponent() {
    const winboxRef = useRef<any>(null);

    useEffect(() => {
        const loadWinBox = async () => {
            if (!window.WinBox) {
                const script = document.createElement("script");
                script.src = "/winbox/winbox.bundle.min.js";
                script.async = true;
                document.body.appendChild(script);
            }
        };
        loadWinBox();
    }, []);

    const openWinBox = () => {
        if (winboxRef.current) {
            if (winboxRef.current.minimized) {
                winboxRef.current.restore();
            }
            winboxRef.current.focus();
            return;
        }

        winboxRef.current = new window.WinBox("My Window", {
            width: "400px",
            height: "300px",
            background: "#323332",
            onclose: () => {
                winboxRef.current = null;
            },
            onminimize: function () {
                winboxRef.current.minimized = true;
            },
            onrestore: function () {
                winboxRef.current.minimized = false;
            },
        });

        const winElement = winboxRef.current.dom;
        winElement.style.border = "2px solid #2D3747";
        winElement.querySelector(".wb-title").style.backgroundColor = "#4A5568";
    };

    return <button onClick={openWinBox}>Open WinBox</button>;
}
