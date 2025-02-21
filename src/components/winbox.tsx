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
    openByDefault?: boolean;
}

export default function WinBoxComponent({
    title,
    mount,
    x = "60%",
    y = "10%",
    buttonX,
    buttonY,
    openByDefault = false
}: WinBoxComponentProps) {
    const winboxRef = useRef<any>(null);

    useEffect(() => {
        const loadWinBox = () => {
            if (!window.WinBox) {
                const script = document.createElement("script");
                script.src = "/winbox/winbox.bundle.min.js";
                script.async = true;
                script.onload = () => {
                    if (openByDefault) {
                        openWinBox();
                    }
                };
                document.body.appendChild(script);
            } else if (openByDefault) {
                openWinBox();
            }
        };

        loadWinBox();

        const style = document.createElement("style");
        style.innerHTML = `
            .wb-body {
                background:#494959;
            }
        `;
        document.head.appendChild(style);
    }, [openByDefault]);

    const openWinBox = () => {
        if (!window.WinBox) return;

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
            <div style={{ width: '128px', height: '128px'}}>
                <button onClick={openWinBox} style={{ position: "absolute", color: "#C0C1C0", left: buttonX, top: buttonY }}>
                    <img src={`/icons/${title}.png`} style={{ height: '78px', width: '78px' }} />
                    <p className="whitespace-nowrap">{title}</p>
                </button>
            </div>
        </Draggable>
    );
}