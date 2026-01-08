
import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#FF6153] overflow-hidden flex items-center justify-center">
      <style>{`
        .dash {
          stroke-dasharray: 700;
          animation: dash 15s linear infinite;
          stroke: #FBC02E;
          fill: none;
        }
        
        .dash_0 { animation-delay: 0s; }
        .dash_1 { transform: translateY(100px); animation-delay: 2.5s; }
        .dash_2 { transform: translateY(200px); animation-delay: 6s; }
        .dash_3 { transform: translateY(300px); animation-delay: 4s; }
        .dash_4 { transform: translateY(400px); animation-delay: 1s; }
        .dash_5 { transform: translateY(500px); animation-delay: 5s; }
        .dash_6 { transform: translateY(600px); animation-delay: 3s; }
        .dash_7 { transform: translateY(700px); animation-delay: 1.5s; }
        .dash_8 { transform: translateY(800px); animation-delay: 5.5s; }
        .dash_9 { transform: translateY(900px); animation-delay: 1s; }

        @keyframes dash {
          0% {
            stroke-dashoffset: 10;
            stroke: #FBC02E;
          }
          50% {
            stroke: #19D8FF;
          }
          100% {
            stroke-dashoffset: 9800;
            stroke: #FBC02E;
          }
        }
        
        .section_wave {
            width: 150%;
            height: 150%;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
        }
      `}</style>
      
      <section className="section_wave">
        <svg width="100%" height="100%" viewBox="0 0 1500 1000" preserveAspectRatio="xMidYMid slice">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                {Array.from({ length: 10 }).map((_, i) => (
                    <path 
                        key={i}
                        className={`dash dash_${i}`} 
                        d="M16,16 C76.235,16 77.932,77 138.167,77 C198.402,77 198.402,16 260.333,16 C320.568,16 322.265,77 382.5,77 C442.735,77 442.735,16 504.667,16 C564.902,16 566.598,77 626.833,77 C687.068,77 687.068,16 749,16 C809.235,16 810.932,77 871.167,77 C931.402,77 931.402,16 993.333,16 C1053.568,16 1055.265,77 1115.5,77 C1175.735,77 1175.735,16 1237.667,16 C1297.902,16 1299.598,77 1359.833,77 C1420.068,77 1420.068,16 1482,16" 
                        strokeWidth="32"
                    ></path>
                ))}
            </g>
        </svg>
      </section>
    </div>
  );
};

export default WaveBackground;
