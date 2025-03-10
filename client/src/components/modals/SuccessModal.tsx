import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      console.log("Modal should be VERY VISIBLE now!");
      
      // REMOVED ALERT - it might have been blocking the UI
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Add keyframes to document head
  useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes rainbow {
          0% { border-color: red; }
          14% { border-color: orange; }
          28% { border-color: yellow; }
          42% { border-color: green; }
          57% { border-color: blue; }
          71% { border-color: indigo; }
          85% { border-color: violet; }
          100% { border-color: red; }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Create portal to render modal directly in body
  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <div 
        className="bg-white rounded-2xl p-8 shadow-xl relative max-w-md mx-4 w-full text-center"
        style={{
          animation: 'scaleIn 0.3s ease-out forwards, rainbow 3s infinite',
          border: '8px solid #FF1493',
          boxShadow: '0 0 30px #FF1493, 0 0 60px rgba(255, 20, 147, 0.5)'
        }}
      >
        <div className="mb-6">
          <div
            className="w-24 h-24 bg-[#FF1493] rounded-full mx-auto flex items-center justify-center"
            style={{
              animation: 'pulse 1.5s infinite',
              boxShadow: '0 0 20px #FF1493'
            }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#FF1493] mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-700 text-lg mb-6">
          Thank you! Your slimes will be hand-delivered with extra smiles! ✨
        </p>
        <div className="bg-[#FFE6F3] p-6 rounded-xl mb-6 border-2 border-[#FF1493]">
          <h3 className="font-bold text-[#FF1493] text-xl mb-3">Payment Due on Delivery:</h3>
          <div className="flex justify-center gap-4 mb-3">
            <span className="px-6 py-3 bg-[#FF1493] text-white rounded-full font-bold text-lg">Venmo</span>
            <span className="px-6 py-3 bg-black text-white rounded-full font-bold text-lg">Cash</span>
          </div>
          <p className="text-gray-700">We accept cash and Venmo for all orders!</p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-6 py-4 bg-[#FF1493] text-white rounded-full font-bold text-lg hover:bg-[#FF1493]/80 transition-colors"
          style={{
            boxShadow: '0 0 15px #FF1493'
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal; 