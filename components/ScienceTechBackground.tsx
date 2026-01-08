import React from 'react';

const ScienceTechBackground: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#F9FAFB]'}`}>
      <style>{`
        .sci-tech-container {
            --color: ${isDark ? '#a855f7' : '#7e22ce'}; /* Shining Purple - Darker in light mode */
            --animation-duration: 1600;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            position: relative;
        }

        .center-dot {
            width: 1.5vh;
            height: 1.5vh;
            background: var(--color);
            border-radius: 50%;
            box-shadow: 0 0 1vh 1px var(--color);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        }

        .sci-svg {
            width: 100%;
            height: 75vh;
        }

        .sci-circle {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            fill: none;
            stroke: var(--color);
            stroke-width: 1;
            stroke-dasharray: 310;
            stroke-dashoffset: 310;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: calc(var(--animation-duration) * 4ms);
            transform-origin: center;
        }

        @keyframes drawCircle {
            to {
                stroke-dashoffset: -310;
            }
        }

        .sci-circle:nth-child(1) {
            transform: rotateX(80deg) rotateY(20deg) rotateZ(0deg);
            animation-name: drawCircle, rotateCircle1;
        }

        @keyframes rotateCircle1 {
            to {
                transform: rotateX(80deg) rotateY(20deg) rotateZ(360deg);
            }
        }

        .sci-circle:nth-child(2) {
            transform: rotateX(75deg) rotateY(60deg) rotateZ(0deg);
            animation-name: drawCircle, rotateCircle2;
            animation-delay: 0.125s;
        }

        @keyframes rotateCircle2 {
            to {
                transform: rotateX(75deg) rotateY(60deg) rotateZ(360deg);
            }
        }

        .sci-circle:nth-child(3) {
            transform: rotateX(-75deg) rotateY(60deg) rotateZ(0deg);
            animation-name: drawCircle, rotateCircle3;
            animation-delay: 0.25s;
        }

        @keyframes rotateCircle3 {
            to {
                transform: rotateX(-75deg) rotateY(60deg) rotateZ(360deg);
            }
        }

        .sci-circle:nth-child(4) {
            transform: rotateX(-80deg) rotateY(20deg) rotateZ(0deg);
            animation-name: drawCircle, rotateCircle4;
            animation-delay: 0.375s;
        }

        @keyframes rotateCircle4 {
            to {
                transform: rotateX(-80deg) rotateY(20deg) rotateZ(360deg);
            }
        }
      `}</style>
      <div className="sci-tech-container">
        <div className="center-dot"></div>
        <svg className="sci-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle className="sci-circle" cx="50" cy="50" r="45" />
            <circle className="sci-circle" cx="50" cy="50" r="45" />
            <circle className="sci-circle" cx="50" cy="50" r="45" />
            <circle className="sci-circle" cx="50" cy="50" r="45" />
        </svg>
      </div>
    </div>
  );
};

export default ScienceTechBackground;