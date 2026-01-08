
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Extend Window interface to include THREE property
declare global {
  interface Window {
    THREE: any;
  }
}

const AuroraHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    let scene: any, camera: any, renderer: any, material: any;
    let startTime = Date.now();
    let animationId: number;

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float iTime;
        uniform vec2 iResolution;
        varying vec2 vUv;

        #define S smoothstep

        vec4 Line(vec2 uv, float speed, float height, vec3 col) {
            uv.y += S(1., 0., abs(uv.x)) * sin(iTime * speed + uv.x * height) * 0.2;
            return vec4(S(0.06 * S(0.2, 0.9, abs(uv.x)), 0., abs(uv.y) - 0.004) * col, 1.0) * S(1., 0.3, abs(uv.x));
        }

        void main() {
            vec2 uv = (vUv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0);
            vec4 O = vec4(0.);
            
            for (float i = 0.; i <= 5.; i += 1.) {
                float t = i / 5.;
                float timeOffset = iTime * 0.3 + t * 2.0;
                
                // Aurora color palette
                vec3 auroraColor = vec3(
                    0.1 + 0.6 * sin(timeOffset + t * 3.14159),
                    0.3 + 0.7 * sin(timeOffset * 1.3 + t * 2.0),
                    0.4 + 0.6 * cos(timeOffset * 0.8 + t * 1.5)
                );
                
                // Add some green-cyan aurora tones
                auroraColor = mix(auroraColor, vec3(0.0, 0.8, 0.6), sin(timeOffset + t) * 0.5 + 0.5);
                // Add purple-pink highlights
                auroraColor = mix(auroraColor, vec3(0.7, 0.2, 0.9), cos(timeOffset * 0.7 + t * 1.2) * 0.3 + 0.3);
                
                O += Line(uv, 1. + t * 0.8, 4. + t, auroraColor);
            }
            
            gl_FragColor = O;
        }
    `;

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio * 2, 3));
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(renderer.domElement);
        }

        material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2(window.innerWidth * 2, window.innerHeight * 2) }
            },
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        animate();
    };

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        material.uniforms.iTime.value = (Date.now() - startTime) * 0.001;
        renderer.render(scene, camera);
    };

    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.iResolution.value.set(window.innerWidth * 2, window.innerHeight * 2);
    };

    init();
    window.addEventListener('resize', onWindowResize);

    return () => {
        window.removeEventListener('resize', onWindowResize);
        cancelAnimationFrame(animationId);
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center">
        <div ref={containerRef} className="absolute inset-0 z-0"></div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-4 w-full">
             <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-monolith font-thin text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#bf953f] to-[#aa771c] drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] tracking-widest animate-pulse pb-4 whitespace-normal md:whitespace-pre-line leading-tight break-words">
                {t('pet_hero_title')}
             </h1>
             <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent my-6"></div>
             <p className="text-neutral-200 uppercase tracking-[0.2em] text-xs md:text-xl font-light max-w-2xl leading-relaxed text-shadow-sm text-center">
                {t('pet_hero_sub')}
             </p>
        </div>
    </div>
  );
};

export default AuroraHero;
