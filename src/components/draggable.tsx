import React, { useState, useRef, useEffect } from 'react';

interface DraggableProps {
    children: React.ReactNode;
    initialX?: string;
    initialY?: string;
    className?: string;
}

const Draggable: React.FC<DraggableProps> = ({
    children,
    initialX = '0px',
    initialY = '0px',
    className = '',
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;

            setPosition({
                x: `${deltaX}px`,
                y: `${deltaY}px`,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - parseInt(position.x),
            y: e.clientY - parseInt(position.y),
        });
    };

    return (
        <div
            ref={containerRef}
            className={`cursor-move ${className}`}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
};

export default Draggable;
