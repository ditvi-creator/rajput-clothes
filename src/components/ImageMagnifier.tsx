import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  magnifierSize?: number;
}

export default function ImageMagnifier({
  src,
  alt,
  className,
  zoomLevel = 2,
  magnifierSize = 150,
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: MouseEvent) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setImgSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    // calculate cursor position on the image
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />

      <AnimatePresence>
        {showMagnifier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              height: `${magnifierSize}px`,
              width: `${magnifierSize}px`,
              top: `${y - magnifierSize / 2}px`,
              left: `${x - magnifierSize / 2}px`,
              border: '2px solid rgba(212, 175, 55, 0.5)', // brand-gold with opacity
              borderRadius: '50%',
              backgroundColor: 'white',
              backgroundImage: `url('${src}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
              backgroundPosition: `${-x * zoomLevel + magnifierSize / 2}px ${-y * zoomLevel + magnifierSize / 2}px`,
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
              zIndex: 50,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
