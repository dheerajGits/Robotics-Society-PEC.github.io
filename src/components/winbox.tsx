"use client";
import { useEffect, useRef } from "react";
import Draggable from "./draggable";
import { createRoot } from "react-dom/client";

declare global {
    interface Window {
        WinBox: any;
    }
}

interface WinBoxComponentProps {
    title: string;
    mount: React.ReactNode;
    x?: string;
    y?: string;
    buttonX?: string;
    buttonY?: string;
}

export default function WinBoxComponent({
    title,
    mount,
    x = "10%",
    y = "10%",
    buttonX = "10%",
    buttonY = "10%"
}: WinBoxComponentProps) {
    const winboxRef = useRef<any>(null);

    useEffect(() => {
        if (!window.WinBox) {
            const script = document.createElement("script");
            script.src = "/winbox/winbox.bundle.min.js";
            script.async = true;
            document.body.appendChild(script);
        }

        const style = document.createElement("style");
        style.innerHTML = `
            .wb-body {
                background:#494959;
            }
        `;
        document.head.appendChild(style);
    }, []);

    const openWinBox = () => {
        if (winboxRef.current) {
            winboxRef.current.focus();
            return;
        }

        const mountContainer = document.createElement("div");
        mountContainer.className = "wb-body";
        createRoot(mountContainer).render(mount);

        winboxRef.current = new window.WinBox(title, {
            width: "400px",
            height: "300px",
            x,
            y,
            border: "3px",
            mount: mountContainer,
            onfocus: function () {
                this.setBackground("#4A5568");
            },
            onblur: function () {
                this.setBackground("#323332");
            },
            onclose: () => {
                winboxRef.current = null;
            },
        });
    };

    return (
        <Draggable initialX={buttonX} initialY={buttonY}>
            <button onClick={openWinBox} style={{ position: "absolute", left: buttonX, top: buttonY }}>
                <img src={`/icons/${title}.svg`} className="h-200 w-200" />
                <p>{title}</p>
            </button>
        </Draggable>
    );
}
