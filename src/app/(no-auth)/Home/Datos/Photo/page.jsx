'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';

// Debounce function to limit the rate of function calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ImageCard = ({ imageUrl, altText }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [flipY, setFlipY] = useState(false);
  const [flipX, setFlipX] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const transformString = useRef('');

  // Handle rotation
  const rotateLeft = () => setRotation((prevRotation) => prevRotation - 90);
  const rotateRight = () => setRotation((prevRotation) => prevRotation + 90);

  // Handle zoom
  const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 10, 200)); // Max zoom 200%
  const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 10, 50)); // Min zoom 50%

  // Handle flip
  const flipImageY = () => setFlipY((prevFlipY) => !prevFlipY);
  const flipImageX = () => setFlipX((prevFlipX) => !prevFlipX);

  // Start dragging
  const startDrag = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  // Stop dragging
  const endDrag = () => {
    setDragging(false);
  };

  // Handle drag movement with debounce
  const onDrag = useCallback(
    debounce((e) => {
      if (dragging) {
        const newPosition = {
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        };
        setPosition(newPosition);
      }
    }, 16), // 16ms for ~60fps
    [dragging]
  );

  useEffect(() => {
    // Build the transform string
    transformString.current = `rotate(${rotation}deg) scale(${zoom / 100}) ${flipY ? 'scaleX(-1)' : ''} ${flipX ? 'scaleY(-1)' : ''} translate3d(${position.x}px, ${position.y}px, 0)`;
  }, [rotation, zoom, flipY, flipX, position]);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);
    } else {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', endDrag);
    }
    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', endDrag);
    };
  }, [dragging, onDrag]);

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 relative">
      <div className="relative">
        <img
          src={imageUrl}
          alt={altText}
          ref={imgRef}
          className="transition-transform duration-300"
          style={{
            transform: transformString.current,
            transformOrigin: 'center center',
            willChange: 'transform',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={startDrag}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={rotateLeft}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Rotar Izquierda
        </button>
        <button
          onClick={rotateRight}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Rotar Derecha
        </button>
        <button
          onClick={zoomOut}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Menos Zoom
        </button>
        <button
          onClick={zoomIn}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Más Zoom
        </button>
        <button
          onClick={flipImageY}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Revertir Eje Y
        </button>
        <button
          onClick={flipImageX}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Revertir Eje X
        </button>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <div className="p-6">
      <ImageCard
        imageUrl="/ci.jpg"
        altText="Descripción de la imagen"
      />
    </div>
  );
};

export default App;