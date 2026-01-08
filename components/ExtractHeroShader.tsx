import React, { useEffect, useRef } from 'react';

const ExtractHeroShader: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl');
    if (!gl) {
      gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    }
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      #ifdef GL_ES
      precision highp float;
      #endif
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_is_dark;
      
      vec3 palette_fire(float t, float factor) {
          vec3 a = vec3(0.5, 0.1, 0.0);
          vec3 b = vec3(0.6, 0.3, 0.1);
          vec3 c = vec3(1.0, 1.0, 0.0);
          vec3 d = vec3(0.8, 0.7, 0.2);
         
          a += 0.1 * sin(vec3(0.1, 0.2, 0.3) * factor);
          b += 0.2 * cos(vec3(0.2, 0.3, 0.1) * factor);
         
          return a + b * cos(6.28318 * (c * t + d));
      }
      
      void main() {
          vec2 st = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
          st.x *= u_resolution.x/u_resolution.y;
          vec3 color = vec3(0.0);
          
          vec2 mouse_st = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution.xy;
          mouse_st = (mouse_st * 2.0 - 1.0) * vec2(1.0, -1.0);
          mouse_st.x *= u_resolution.x / u_resolution.y;
         
          vec2 mouse_vec = st - mouse_st;
          float mouse_dist = length(mouse_vec);
          float mouse_push = smoothstep(0.7, 0.0, mouse_dist) * 0.5;
         
          if (u_mouse.x > 0.0) {
              st += normalize(mouse_vec) * mouse_push;
          }
          
          float R_global = length(st);
          float angle_global = atan(st.y, st.x);
          float twist = 0.5 * sin(R_global * 3.0 - u_time * 0.4);
          st *= mat2(cos(twist), sin(twist), -sin(twist), cos(twist));
          
          for (float i = 1.0; i < 6.0; i++) {
              vec2 st0 = st;
              float sgn = 1.0 - 2.0 * mod(i, 2.0);
             
              float t = u_time * 0.02 - float(i);
              st0 *= mat2(cos(t), sin(t), -sin(t), cos(t));
             
              float R = length(st0);
              float d = R * i;
              float angle = atan(st0.y, st0.x);
              float num_arms = 4.0 + 3.0 * sin(u_time * 0.1 + i);
              float angle_warped = angle * num_arms;
              float dist_warp_factor = 1.0 + 0.3 * sin(angle * 12.0 + u_time * 0.5 - i);
              float d_warped = d * dist_warp_factor;
             
              vec3 pal = palette_fire(-exp((length(d_warped) * -0.9)), abs(d_warped) * 0.4);
              float radial = exp(-R);
              radial *= smoothstep(1.2, 0.5, R);
              pal *= radial;
              float phase = -(d_warped + sgn * angle_warped) + u_time * 0.3;
             
              float v = sin(phase);
              v = max(abs(v), 0.01);
              float w = pow(0.02 / v, 0.8);
              color += pal * w;
          }
          
          // Background mixing based on theme
          vec3 bg = mix(vec3(0.97, 0.97, 0.99), vec3(0.0), u_is_dark);
          
          // Blend fire color onto background
          // In light mode, we might want to invert or adjust blending
          if (u_is_dark < 0.5) {
             // Light mode: Simple additive blending on white can blow out, so mix carefully
             // Or invert the fire color?
             // Let's keep it additive but darkened slightly for contrast
             color = bg - (color * 0.8); // Subtractive/Inverted effect for interesting look
             color = abs(color); // Ensure positive values
          } else {
             color = bg + color;
          }

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const isDarkLocation = gl.getUniformLocation(program, 'u_is_dark');

    let mouseX = -1.0;
    let mouseY = -1.0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        gl!.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    resize();

    const render = (time: number) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        gl!.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl!.uniform1f(timeLocation, time * 0.001);
        gl!.uniform2f(mouseLocation, mouseX * dpr, mouseY * dpr);
        // Pass theme uniform (1.0 for dark, 0.0 for light)
        gl!.uniform1f(isDarkLocation, isDark ? 1.0 : 0.0);
        
        gl!.clearColor(0, 0, 0, 1);
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        
        rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafId);
        gl!.deleteProgram(program);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ backgroundColor: isDark ? '#000' : '#fff' }} />;
};

export default ExtractHeroShader;