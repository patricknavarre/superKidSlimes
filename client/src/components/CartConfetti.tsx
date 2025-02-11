import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface CartConfettiProps {
  x: number;
  y: number;
}

const CartConfetti: React.FC<CartConfettiProps> = ({ x, y }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 2000); // Shorter duration for cart animation

    return () => clearTimeout(timer);
  }, []);

  if (!isActive) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <ReactConfetti
        confettiSource={{ x, y, w: 10, h: 10 }}
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={50}
        gravity={0.3}
        tweenDuration={100}
        initialVelocityY={10}
        colors={['#ec4899', '#f59e0b', '#f472b6', '#fcd34d']}
      />
    </div>
  );
};

export default CartConfetti; 