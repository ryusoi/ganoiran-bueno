
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Info } from 'lucide-react';

interface Nutrient {
  label: string;
  category: string;
  desc: string;
  val: number;
}

const NutritionalMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Nutrient | null>(null);
  const { t } = useLanguage();

  const nutrientData: Nutrient[] = [
    { label: "Beta-Glucans", category: "Polysaccharides", desc: "Activates Macrophages & NK Cells", val: 1.0 },
    { label: "Ganoderic Acids", category: "Triterpenes", desc: "Liver Protection & Anti-Histamine", val: 0.9 },
    { label: "Adenosine", category: "Nucleosides", desc: "Improves Circulation & Sleep", val: 0.7 },
    { label: "Germanium", category: "Minerals", desc: "Increases Oxygen Efficiency", val: 0.6 },
    { label: "Ergosterol", category: "Pro-Vitamin D", desc: "Bone Health & Immunity", val: 0.6 },
    { label: "Superoxide Dismutase", category: "Enzymes", desc: "Potent Antioxidant Defense", val: 0.8 },
    { label: "LZ-8", category: "Proteins", desc: "Immunomodulation", val: 0.5 },
    { label: "Lucidenic Acid", category: "Triterpenes", desc: "Cytotoxicity to Cancer Cells", val: 0.7 },
    { label: "Magnesium", category: "Minerals", desc: "Nervous System Support", val: 0.4 },
    { label: "Zinc", category: "Minerals", desc: "Immune Signaling", val: 0.4 },
    { label: "GABA", category: "Neurotransmitter", desc: "Calms Nervous System", val: 0.5 },
    { label: "Chitin", category: "Fiber", desc: "Gut Health Prebiotic", val: 0.6 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    const points: any[] = [];
    const numPoints = nutrientData.length;
    const radius = Math.min(width, height) * 0.35;

    // Initialize points in a 3D sphere layout
    for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(-1 + (2 * i) / numPoints);
        const theta = Math.sqrt(numPoints * Math.PI) * phi;
        points.push({
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi),
            data: nutrientData[i],
            screenX: 0,
            screenY: 0,
            scale: 1
        });
    }

    let angleX = 0.001;
    let angleY = 0.002;
    let mouseX = 0;
    let mouseY = 0;

    const rotate = (point: any, ax: number, ay: number) => {
        // Rotate around Y
        let x = point.x * Math.cos(ay) - point.z * Math.sin(ay);
        let z = point.x * Math.sin(ay) + point.z * Math.cos(ay);
        point.x = x;
        point.z = z;

        // Rotate around X
        let y = point.y * Math.cos(ax) - point.z * Math.sin(ax);
        z = point.y * Math.sin(ax) + point.z * Math.cos(ax);
        point.y = y;
        point.z = z;
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Connections
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)'; // Emerald low opacity
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const d = Math.sqrt(
                    Math.pow(points[i].screenX - points[j].screenX, 2) + 
                    Math.pow(points[i].screenY - points[j].screenY, 2)
                );
                if (d < 200) {
                    ctx.moveTo(points[i].screenX, points[i].screenY);
                    ctx.lineTo(points[j].screenX, points[j].screenY);
                }
            }
        }
        ctx.stroke();

        // Points
        points.forEach(p => {
            const perspective = 300 / (300 - p.z);
            p.scale = perspective;
            p.screenX = width / 2 + p.x * perspective;
            p.screenY = height / 2 + p.y * perspective;

            // Draw Node
            const size = 4 * p.scale + (p.data.val * 3);
            
            // Glow
            const gradient = ctx.createRadialGradient(p.screenX, p.screenY, 0, p.screenX, p.screenY, size * 2);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.screenX, p.screenY, size * 2, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(p.screenX, p.screenY, size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Text Label
            ctx.font = `${10 * p.scale}px Inter`;
            ctx.fillStyle = `rgba(255,255,255, ${Math.max(0.2, p.scale - 0.2)})`;
            ctx.textAlign = 'center';
            ctx.fillText(p.data.label, p.screenX, p.screenY + size + 15);
        });

        // Rotation
        points.forEach(p => rotate(p, angleX, angleY));
        
        // Interactive Rotation Speed
        angleX += (mouseY * 0.0001 - angleX) * 0.05;
        angleY += (mouseX * 0.0001 - angleY) * 0.05;

        // Hover Detection
        let found = null;
        // Sort by Z to check front-most first
        [...points].sort((a,b) => b.z - a.z).forEach(p => {
             const dx = p.screenX - lastMouseX;
             const dy = p.screenY - lastMouseY;
             if (Math.sqrt(dx*dx + dy*dy) < 20) {
                 found = p.data;
             }
        });
        setHoveredNode(found);

        requestAnimationFrame(draw);
    };

    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        lastMouseX = e.clientX - rect.left;
        lastMouseY = e.clientY - rect.top;
        mouseX = (e.clientX - rect.left) - width / 2;
        mouseY = (e.clientY - rect.top) - height / 2;
    };

    const handleResize = () => {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    draw();

    return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
        
        <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-10 px-4">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-widest text-chrome">NUTRITIONAL ARCHITECTURE</h3>
            <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.2em]">Active Compound Visualization</p>
        </div>

        {hoveredNode && (
            <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 p-6 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center w-64 animate-scale-in">
                    <div className="w-10 h-10 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                        <Info className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{hoveredNode.label}</h4>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-3">{hoveredNode.category}</p>
                    <p className="text-sm text-gray-300 leading-relaxed font-light">{hoveredNode.desc}</p>
                </div>
            </div>
        )}

        <div className="absolute bottom-6 left-6 pointer-events-none">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Live Molecular Simulation</span>
            </div>
        </div>
    </div>
  );
};

export default NutritionalMatrix;
