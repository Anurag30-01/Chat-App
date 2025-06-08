import React, { useEffect, useState } from "react";

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;
  const angleOffset = Math.random() * 90; // Random angle offset for more variety

  return {
    x: Math.random() * window.innerWidth - 100, // set custom start X
    y: Math.random() * window.innerWidth - 100, // set custom start Y
    angle: Math.random() * 60, // angle in degrees (0 = right, 90 = down, 180 = left, 270 = up)
  };
};

export default function ShootingStars({
  minSpeed = 3,
  maxSpeed = 4,
  minDelay = 2000,
  maxDelay = 4000,
  // starColor = "#9E00FF",
  // trailColor = "#2EB9DF",
  starColor = "rgb(255, 255, 255)",
  trailColor = "rgba(33, 182, 227, 0.61)",
  starWidth = 20,
  starHeight = 2,
  className = "",
}) {
  const [star, setStar] = useState(null);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      setStar({
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      });

      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, delay);
    };

    createStar();
  }, []);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      if (star) {
        const rad = (star.angle * Math.PI) / 180;
        const newX = star.x + star.speed * Math.cos(rad);
        const newY = star.y + star.speed * Math.sin(rad);
        const newDistance = star.distance + star.speed;
        const newScale = 1 + newDistance / 100;

        if (
          newX < -20 ||
          newX > window.innerWidth + 20 ||
          newY < -20 ||
          newY > window.innerHeight + 20
        ) {
          setStar(null);
        } else {
          setStar({
            ...star,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          });
        }
      }
    });

    return () => cancelAnimationFrame(animation);
  }, [star]);

  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`}>
      {star && (
        <rect
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#shooting-gradient)"
          transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
        />
      )}
      <defs>
        <linearGradient
          id="shooting-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="100%" stopColor={starColor} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
