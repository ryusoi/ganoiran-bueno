import React, { useEffect, useRef, useState, useCallback } from 'react';

const CLICK_SOURCES = {
  mr1: "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mr1.mp3",
  mr2: "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mr2.mp3",
  mr3: "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mr3.mp3",
  mr4: "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mr4.mp3",
  mr5: "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mr5.mp3",
};
const BGM_SRC = "https://raw.githubusercontent.com/eby-lei/5003-5013/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/sound/mrbgm.mp3";

interface Particle {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
}

const MushroomHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(isMuted); // Ref to access current mute state in non-react loops/classes

  // Refs to store audio context and loop variables to survive re-renders
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<any>(null);
  const clickPlayersRef = useRef<any>({});
  const rafRef = useRef<number>(0);
  const activeParticlesRef = useRef<Set<Particle>>(new Set());
  const timersRef = useRef<WeakMap<Element, any>>(new WeakMap());
  const holdsRef = useRef<WeakMap<Element, any>>(new WeakMap());
  const ringLoopsRef = useRef<WeakMap<Element, any>>(new WeakMap());
  const idleTimersRef = useRef<WeakMap<Element, any>>(new WeakMap());

  // Sync ref
  useEffect(() => {
      isMutedRef.current = isMuted;
  }, [isMuted]);

  // --- AUDIO CLASSES & HELPERS (Defined in component scope using refs) ---
  
  // SamplePlayer Class Definition
  class SamplePlayer {
    el: HTMLAudioElement;
    gain: GainNode | null = null;
    srcNode: MediaElementAudioSourceNode | null = null;
    wired: boolean = false;

    constructor(url: string, loop = false) {
      this.el = new Audio(url);
      this.el.crossOrigin = "anonymous";
      this.el.loop = loop;
    }
    
    _wire() {
      if (this.wired || !audioCtxRef.current) return;
      this.gain = audioCtxRef.current.createGain();
      this.gain.gain.value = 0;
      this.srcNode = audioCtxRef.current.createMediaElementSource(this.el);
      this.srcNode.connect(this.gain);
      this.gain.connect(audioCtxRef.current.destination);
      this.wired = true;
    }

    async play(vol = 0.9, fadeIn = 0.02) {
      if (isMutedRef.current) return; 
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      this._wire();
      try { await this.el.play(); } catch (e) { console.warn(e); }
      if (!this.gain || !audioCtxRef.current) return;
      const t = audioCtxRef.current.currentTime;
      this.gain.gain.cancelScheduledValues(t);
      this.gain.gain.setValueAtTime(this.gain.gain.value, t);
      this.gain.gain.linearRampToValueAtTime(vol, t + fadeIn);
    }

    stop(fadeOut = 0.2) {
      if (!this.wired || !this.gain || !audioCtxRef.current) return;
      const t = audioCtxRef.current.currentTime;
      this.gain.gain.cancelScheduledValues(t);
      this.gain.gain.setTargetAtTime(0.0001, t, Math.max(0.05, fadeOut / 2));
      setTimeout(() => { try { this.el.pause(); this.el.currentTime = 0; } catch (e) {} }, fadeOut * 1000 + 80);
    }
  }

  const pinkNoiseNode = () => {
      if (!audioCtxRef.current) return null;
      const sr = audioCtxRef.current.sampleRate, len = sr * 2;
      const buf = audioCtxRef.current.createBuffer(1, len, sr), data = buf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < len; i++) {
          const w = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.96900 * b2 + w * 0.1538520;
          b3 = 0.86650 * b3 + w * 0.3104856; b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 * 0.5362; b6 = w * 0.115926; data[i] *= 0.11;
      }
      const src = audioCtxRef.current.createBufferSource(); src.buffer = buf; src.loop = true; return src;
  };

  const startHoldEnv = (kind = "bird", vol = 0.22) => {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const mix = ctx.createGain(); mix.gain.value = 0; mix.connect(ctx.destination);
      const nodes: any[] = [];
      const now = ctx.currentTime;
      mix.gain.setValueAtTime(0, now);
      mix.gain.linearRampToValueAtTime(vol, now + 0.25);

      let running = true;
      const stopper = () => { running = false; };

      if (kind === "bird") {
          const chirp = () => {
              if (!running) return;
              const o = ctx.createOscillator(); o.type = "sine";
              const g = ctx.createGain();
              const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
              o.frequency.value = 1800 + Math.random() * 600;
              g.gain.value = 0;
              lfo.type = "sine"; lfo.frequency.value = 6 + Math.random() * 4; lfoG.gain.value = 20;
              lfo.connect(lfoG); lfoG.connect(o.frequency);
              o.connect(g); g.connect(mix);
              const t = ctx.currentTime;
              g.gain.setValueAtTime(0, t);
              g.gain.linearRampToValueAtTime(vol * 0.9, t + 0.03);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
              o.start(t); lfo.start(t); o.stop(t + 0.2); lfo.stop(t + 0.2);
              nodes.push(o, g, lfo, lfoG);
              setTimeout(chirp, 260 + Math.random() * 200);
          };
          chirp();
      } else if (kind === "water") {
          const n = pinkNoiseNode();
          if (n) {
              const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1200;
              const trem = ctx.createOscillator(); trem.type = "sine"; trem.frequency.value = 0.7;
              const tremG = ctx.createGain(); tremG.gain.value = 0.35;
              trem.connect(tremG); tremG.connect(mix.gain);
              n.connect(lp); lp.connect(mix); n.start(); trem.start();
              nodes.push(n, lp, trem, tremG);
          }
      } else if (kind === "cricket") {
          const strid = () => {
              if (!running) return;
              const base = 4000 + Math.random() * 1000;
              for (let i = 0; i < 6; i++) {
                  const t = ctx.currentTime + i * 0.03;
                  const o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(base, t);
                  const g = ctx.createGain();
                  g.gain.setValueAtTime(0, t);
                  g.gain.linearRampToValueAtTime(vol * 0.8, t + 0.01);
                  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
                  o.connect(g); g.connect(mix);
                  o.start(t); o.stop(t + 0.06);
                  nodes.push(o, g);
              }
              setTimeout(strid, 520 + Math.random() * 240);
          };
          strid();
      } else if (kind === "owl") {
          const hoot = () => {
              if (!running) return;
              const base = 280;
              const t0 = ctx.currentTime;
              for (let i = 0; i < 2; i++) {
                  const t = t0 + i * 0.22;
                  const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.setValueAtTime(base, t);
                  const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.setValueAtTime(base * 2, t);
                  const g = ctx.createGain();
                  g.gain.setValueAtTime(0, t);
                  g.gain.linearRampToValueAtTime(vol * 0.85, t + 0.05);
                  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
                  o1.connect(g); o2.connect(g); g.connect(mix);
                  o1.start(t); o2.start(t); o1.stop(t + 0.25); o2.stop(t + 0.25);
                  nodes.push(o1, o2, g);
              }
              setTimeout(hoot, 900 + Math.random() * 360);
          };
          hoot();
      } else if (kind === "leaves") {
          const n = pinkNoiseNode();
          if (n) {
              const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1200; bp.Q.value = 0.6;
              const trem = ctx.createOscillator(); trem.type = "sine"; trem.frequency.value = 1.2;
              const tremG = ctx.createGain(); tremG.gain.value = 0.4;
              trem.connect(tremG); tremG.connect(mix.gain);
              n.connect(bp); bp.connect(mix); n.start(); trem.start();
              nodes.push(n, bp, trem, tremG);
          }
      }

      return {
          stop() {
              if (!audioCtxRef.current) return;
              const t = audioCtxRef.current.currentTime;
              mix.gain.cancelScheduledValues(t);
              mix.gain.setTargetAtTime(0.0001, t, 0.18);
              setTimeout(() => {
                  stopper();
                  nodes.forEach(n => { try { n.stop && n.stop(); } catch (e) { } });
                  try { mix.disconnect(); } catch (e) { }
              }, 420);
          }
      };
  };

  // --- PARTICLES ---
  const PARTICLE_CONF = {
      size: 5,
      sizeBright: 6,
      life: 1.6,
      speedMin: 40,
      speedMax: 80,
      angleCenter: -Math.PI / 2,
      angleHalf: (60 * Math.PI / 180) / 2
  };

  const spawnClickParticles = (host: Element, count = 10, bright = true) => {
      const rect = host.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if(!containerRect) return;

      // Relative coordinates to the container
      const px = rect.left - containerRect.left + rect.width / 2;
      const py = rect.top - containerRect.top + rect.height * 0.35;

      for (let i = 0; i < count; i++) {
          const a = PARTICLE_CONF.angleCenter + (Math.random() * 2 - 1) * PARTICLE_CONF.angleHalf;
          const spd = PARTICLE_CONF.speedMin + Math.random() * (PARTICLE_CONF.speedMax - PARTICLE_CONF.speedMin);
          const el = document.createElement('span');
          el.className = 'particle' + (bright ? ' bright' : '');
          el.style.left = px + 'px';
          el.style.top = py + 'px';
          el.style.position = 'absolute'; 
          
          containerRef.current?.querySelector('.particle-layer')?.appendChild(el);
          
          activeParticlesRef.current.add({
              el,
              x: px, y: py,
              vx: Math.cos(a) * spd,
              vy: Math.sin(a) * spd,
              t: 0
          });
      }
  };

  // --- IDLE PARTICLES ---
  const IDLE_CONF = {
      life: 2.2,
      speedMin: 14,
      speedMax: 28,
      angleCenter: -Math.PI / 2,
      angleHalf: (20 * Math.PI / 180)
  };

  const ensureBackLayer = (el: Element) => {
      let back = el.querySelector('.back');
      if (!back) {
          back = document.createElement('span');
          back.className = 'back';
          el.prepend(back);
      }
      return back;
  };

  const spawnIdleParticleFor = (el: Element) => {
      if (!containerRef.current?.contains(el)) return;
      
      const back = ensureBackLayer(el);
      const rect = back.getBoundingClientRect();
      const cx = rect.width * 0.50;
      const cy = rect.height * 0.60;

      const p = document.createElement('span');
      p.className = 'particle idle';
      p.style.position = 'absolute';
      p.style.left = `${cx + (Math.random() * 12 - 6)}px`;
      p.style.top = `${cy + (Math.random() * 8 - 4)}px`;
      back.appendChild(p);

      const a = IDLE_CONF.angleCenter + (Math.random() * 2 - 1) * IDLE_CONF.angleHalf;
      const spd = IDLE_CONF.speedMin + Math.random() * (IDLE_CONF.speedMax - IDLE_CONF.speedMin);

      const started = performance.now();
      let x = parseFloat(p.style.left), y = parseFloat(p.style.top);

      function step(now: number) {
          if (!p.isConnected) return;
          const t = (now - started) / 1000;
          if (t >= IDLE_CONF.life) { p.remove(); return; }
          x += Math.cos(a) * spd * (1 / 60);
          y += Math.sin(a) * spd * (1 / 60);
          p.style.left = `${x}px`;
          p.style.top = `${y}px`;
          p.style.opacity = String(1 - t / IDLE_CONF.life);
          requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
  };

  const idleEmitter = (el: Element) => {
      return setInterval(() => spawnIdleParticleFor(el), 1000 + Math.random() * 900);
  };

  // --- CHAKRA LOOPS ---
  const startChakraLoop = (el: HTMLElement) => {
      if (ringLoopsRef.current.has(el)) return;
      const rect = el.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if(!containerRect) return;

      const cx = rect.left - containerRect.left + rect.width / 2;
      const cy = rect.top - containerRect.top + rect.height * 0.35;

      const rings: HTMLElement[] = [];
      const layer = containerRef.current?.querySelector('.particle-layer');
      if(!layer) return;

      for (let i = 0; i < 4; i++) {
          const r = document.createElement('span');
          r.className = 'chakra' + (i ? ` t${i + 1}` : '');
          r.style.left = cx + 'px';
          r.style.top = cy + 'px';
          r.style.position = 'absolute';
          layer.appendChild(r);
          rings.push(r);
      }
      ringLoopsRef.current.set(el, { rings });
  };

  const stopChakraLoop = (el: Element) => {
      const loop = ringLoopsRef.current.get(el);
      if (!loop) return;
      loop.rings.forEach((r: HTMLElement) => r.remove());
      ringLoopsRef.current.delete(el);
  };

  // --- INTERACTIONS (Available to JSX) ---
  const LONG_PRESS_MS = 100;
  
  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current.resume();
      if (!isMutedRef.current) bgmRef.current.play(0.18, 1.0);

      const el = e.currentTarget;
      el.classList.add('active');

      // Click
      const key = el.dataset.click;
      if (key && !isMutedRef.current) clickPlayersRef.current[key]?.play(0.9, 0.02);
      spawnClickParticles(el, 10, true);

      // Hold
      const kind = el.dataset.hold;
      const t = setTimeout(() => {
          el.classList.add('hold');
          if (!isMutedRef.current) {
              const h = startHoldEnv(kind, 0.24);
              holdsRef.current.set(el, h);
          }
          startChakraLoop(el);
      }, LONG_PRESS_MS);
      timersRef.current.set(el, t);

      el.setPointerCapture(e.pointerId);
  };

  const onRelease = (e: React.PointerEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      clearTimeout(timersRef.current.get(el));
      timersRef.current.delete(el);
      
      const h = holdsRef.current.get(el);
      if (h) { h.stop(); holdsRef.current.delete(el); }
      
      stopChakraLoop(el);
      el.classList.remove('active', 'hold');
  };

  useEffect(() => {
    // --- INIT ---
    if(!bgmRef.current) {
        bgmRef.current = new SamplePlayer(BGM_SRC, true);
        clickPlayersRef.current = Object.fromEntries(
            Object.entries(CLICK_SOURCES).map(([k, url]) => [k, new SamplePlayer(url, false)])
        );
    }

    // --- ANIMATION LOOP ---
    let lastTS = performance.now();
    const raf = () => {
        const now = performance.now();
        const dt = Math.min(0.033, (now - lastTS) / 1000);
        lastTS = now;

        const particles = Array.from(activeParticlesRef.current) as Particle[];
        for (const p of particles) {
            p.t += dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            const life = PARTICLE_CONF.life;
            const a = Math.max(0, 1 - p.t / life);
            p.el.style.opacity = String(a);
            
            p.el.style.left = p.x + 'px';
            p.el.style.top = p.y + 'px';
            p.el.style.transform = 'none';

            if (p.t >= life) {
                activeParticlesRef.current.delete(p);
                p.el.remove();
            }
        }
        rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Attach Idle Emitters
    if(containerRef.current) {
        const mushrooms = containerRef.current.querySelectorAll('.mushroom');
        mushrooms.forEach(el => {
            const id = idleEmitter(el);
            idleTimersRef.current.set(el, id);
        });
    }

    // --- CLEANUP ---
    return () => {
        cancelAnimationFrame(rafRef.current);
        bgmRef.current?.stop(0);
        
        // Clear all timers and particles
        if(containerRef.current) {
             const mushrooms = containerRef.current.querySelectorAll('.mushroom');
             mushrooms.forEach(el => {
                 clearInterval(idleTimersRef.current.get(el));
             });
        }
    };
  }, []);

  const toggleMute = () => {
      const newState = !isMuted;
      setIsMuted(newState);
      if(newState) bgmRef.current?.stop(0.4);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden font-sans select-none bg-[#0a0c13]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&display=swap');
        
        /* Local Scoped Variables */
        .mushroom-hero-container {
            --mushroom-size: clamp(72px, 9vw, 140px);
            --chakra-scale-end: 6.4;
            --chakra-duration: 1800ms;
            --font-baloo: "Baloo 2", system-ui, sans-serif;
        }

        .bar {
            position: absolute; 
            top: 40px; 
            right: 30px; 
            z-index: 50;
        }
        
        .mute-btn {
            all: unset; cursor: pointer; font-size: 20px; 
            padding: 10px; border-radius: 50%; 
            background: rgba(255,255,255,0.05); /* Increased transparency */
            backdrop-filter: blur(2px);
            transition: background 0.3s, opacity 0.3s, transform 0.2s;
            color: rgba(255,255,255,0.6);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .mute-btn:hover { 
            background: rgba(255,255,255,0.15); 
            color: rgba(255,255,255,0.9);
            transform: scale(1.05);
        }

        .stage {
            position: relative; width: 100%; height: 100%;
            background: 
                url('https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/background.jpg') center/cover no-repeat,
                radial-gradient(900px 600px at 50% 120%, rgba(0,0,0,.45), transparent 60%),
                linear-gradient(#0a0c13, #0a0813 60%);
            /* Parallax Effect: Fixed background attachment ensures image stays relative to viewport */
            background-attachment: fixed;
        }

        /* Particle Layer for fixed-like absolute positioning */
        .particle-layer {
            position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 20;
        }

        .mushroom {
            --halo: rgba(255,180,90,.45);
            --vio: rgba(160,120,255,.35);
            position: absolute;
            left: var(--x); top: var(--y);
            transform: translate(-50%, -50%);
            width: var(--size, var(--mushroom-size));
            height: var(--size, var(--mushroom-size));
            border: 0; background: transparent; cursor: pointer; z-index: 10;
            touch-action: none; /* Prevent scrolling on mobile while interacting */
        }

        .mushroom .art {
            position: absolute; inset: 0; width: 100%; height: 100%;
            object-fit: contain; pointer-events: none; user-select: none;
            transition: transform .12s ease, filter .12s;
            z-index: 2;
        }

        .mushroom .back {
            position: absolute; inset: 0; z-index: 1; overflow: visible; pointer-events: none;
        }

        .mushroom.active .art { transform: translateY(-5%) scale(1.06); }
        .mushroom.hold .art {
            filter: drop-shadow(0 0 15px rgba(255,160,100,.45)) drop-shadow(0 0 30px rgba(160,120,255,.28));
        }

        /* Ground Glow */
        .mushroom::before {
            content: ""; position: absolute; left: 50%; top: 58%;
            width: 133%; height: 58%;
            transform: translate(-50%, -50%);
            background: radial-gradient(closest-side, rgba(255,255,255,.18), transparent 70%);
            filter: blur(5px) saturate(1.2);
            opacity: .75; pointer-events: none; z-index: 0;
        }

        /* Top Glow */
        .mushroom::after {
            content: ""; position: absolute; inset: -6%; z-index: 0; pointer-events: none;
            background: 
                radial-gradient(100% 70% at 50% 40%, var(--halo), transparent 65%),
                radial-gradient(100% 70% at 50% 40%, var(--vio), transparent 45%);
            opacity: 0; transition: opacity .14s;
            filter: blur(7px) saturate(1.05);
        }
        .mushroom.active::after { opacity: .55; }
        .mushroom.hold::after { opacity: .85; animation: pulseGlow 1.6s ease-in-out infinite; }

        .particle {
            position: absolute; border-radius: 50%; pointer-events: none; mix-blend-mode: screen;
            width: 5px; height: 5px;
            opacity: .95; filter: blur(.25px);
            background: radial-gradient(circle, #ffd08f, rgba(255,255,255,.16));
        }
        .particle.bright {
            width: 6px; height: 6px;
            background: radial-gradient(circle, #ffe2a8, rgba(255,255,255,.2));
        }
        .particle.idle { opacity: .7; }

        .chakra {
            position: absolute; width: 18px; height: 18px; border-radius: 999px; pointer-events: none;
            border: 2px solid rgba(255,190,220,.65);
            box-shadow: 0 0 10px rgba(255,140,200,.35), inset 0 0 8px rgba(255,180,230,.3);
            opacity: .9;
            animation: chakraLoop var(--chakra-duration) ease-out infinite;
        }
        .chakra.t2 { animation-delay: 180ms; opacity: .8; }
        .chakra.t3 { animation-delay: 360ms; opacity: .7; }
        .chakra.t4 { animation-delay: 540ms; opacity: .6; }

        @keyframes pulseGlow {
            0%, 100% { filter: blur(10px) saturate(1.0); }
            50% { filter: blur(14px) saturate(1.2); }
        }

        @keyframes chakraLoop {
            0% { transform: translate(-50%, -50%) scale(.6); opacity: .95; }
            100% { transform: translate(-50%, -50%) scale(var(--chakra-scale-end)); opacity: 0; }
        }
      `}</style>

      <div className="mushroom-hero-container w-full h-full relative">
          <div className="bar">
            <div className="controls">
                <button id="muteBtn" className="mute-btn" onClick={toggleMute} aria-label="toggle sound">
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>
          </div>

          <main className="stage">
             <div className="particle-layer"></div>

             <button className="mushroom" style={{'--x': '18.5%', '--y': '60%', '--size': '11vw'} as React.CSSProperties}
                data-click="mr1" data-hold="bird" aria-label="mushroom 1"
                onPointerDown={onDown} onPointerUp={onRelease} onPointerLeave={onRelease} onContextMenu={(e)=>e.preventDefault()}>
                <img className="art" src="https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/mushroom1.png" alt="" />
             </button>

             <button className="mushroom" style={{'--x': '48%', '--y': '66%', '--size': '7.5vw'} as React.CSSProperties}
                data-click="mr2" data-hold="water" aria-label="mushroom 2"
                onPointerDown={onDown} onPointerUp={onRelease} onPointerLeave={onRelease} onContextMenu={(e)=>e.preventDefault()}>
                <img className="art" src="https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/mushroom2.png" alt="" />
             </button>

             <button className="mushroom" style={{'--x': '62%', '--y': '62%', '--size': '12vw'} as React.CSSProperties}
                data-click="mr3" data-hold="cricket" aria-label="mushroom 3"
                onPointerDown={onDown} onPointerUp={onRelease} onPointerLeave={onRelease} onContextMenu={(e)=>e.preventDefault()}>
                <img className="art" src="https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/mushroom3.png" alt="" />
             </button>

             <button className="mushroom" style={{'--x': '35%', '--y': '48%', '--size': '5.5vw'} as React.CSSProperties}
                data-click="mr4" data-hold="owl" aria-label="mushroom 4"
                onPointerDown={onDown} onPointerUp={onRelease} onPointerLeave={onRelease} onContextMenu={(e)=>e.preventDefault()}>
                <img className="art" src="https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/mushroom4.png" alt="" />
             </button>

             <button className="mushroom" style={{'--x': '73%', '--y': '52%', '--size': '8.7vw'} as React.CSSProperties}
                data-click="mr5" data-hold="leaves" aria-label="mushroom 5"
                onPointerDown={onDown} onPointerUp={onRelease} onPointerLeave={onRelease} onContextMenu={(e)=>e.preventDefault()}>
                <img className="art" src="https://raw.githubusercontent.com/eby-lei/5003-5013/refs/heads/main/Describe%20It.%20Prompt%20It.%20Reflect%20On%20It/mushroom%20singing/picture/mushroom5.png" alt="" />
             </button>
          </main>
      </div>
    </div>
  );
};

export default MushroomHero;