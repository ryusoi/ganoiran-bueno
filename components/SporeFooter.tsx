import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

const SporeFooter: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const isDarkRef = useRef(isDark);

  // Sync ref with prop
  useEffect(() => {
      isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    let resizeObserver: ResizeObserver;

    const startP5 = () => {
        if (!window.p5) {
            setTimeout(startP5, 100);
            return;
        }
        
        if (containerRef.current) {
            if (p5Ref.current) {
                p5Ref.current.remove();
            }

            const sketch = (p: any) => {
              // Dimensions from container
              let canvasWidth = containerRef.current?.clientWidth || window.innerWidth;
              let canvasHeight = containerRef.current?.clientHeight || 400;
              
              // Exact logic from code: ground is 1/10th from bottom
              let groundLevel = canvasHeight - canvasHeight / 10; 
              
              let fruits: any[] = [];
              let spores: any[] = [];

              // --- CLASS: Fruit (Mushroom) ---
              // Ported exactly from provided source
              class Fruit {
                fruit_height: number;
                fruit_bend: number;
                cap_color: any;
                stem_color: any;
                fruit_cap_width: number;
                fruit_cap_height: number;
                
                init_x: number;
                init_y: number;
                final_x: number;
                final_y: number;
                
                head_x: number;
                head_y: number;
                dist_x: number;
                dist_y: number;
                
                is_ready_to_spore: boolean;
                
                beizer_radius: number;
                beizer_angle: number = 0;
                beizer_radius_x: number = 0;
                beizer_radius_y: number = 0;
                
                start_radius: number;
                end_radius: number;
                radius: number;
                
                x_mid_point: number = 0;
                y_mid_point: number = 0;
                mid_point_plus_radius_x: number = 0;
                mid_point_plus_radius_y: number = 0;
                
                cap_size_x: number;
                cap_size_y: number;
                
                slope_x: number;
                slope_y: number;
                
                spore_position: any;
                
                step: number;
                pct: number;

                constructor(x: number) {
                  // DNA variables from source
                  this.fruit_height = p.random(50, 180); 
                  this.fruit_bend = p.random(-40, 40);
                  
                  // Exact Color Ranges from source
                  this.cap_color = p.color(p.random(50, 150), p.random(50, 150), p.random(0, 250)); 
                  
                  // Adjust stem color based on theme
                  if (isDarkRef.current) {
                      this.stem_color = p.color(255, p.random(100, 255), p.random(100, 220));
                  } else {
                      // Darker stems for light background
                      this.stem_color = p.color(100, p.random(80, 120), p.random(80, 100));
                  }
                  
                  this.fruit_cap_width = p.random(30, 100);
                  this.fruit_cap_height = p.random(20, 50);

                  // Position variables
                  this.init_x = x;
                  this.init_y = groundLevel;
                  this.final_x = this.init_x - this.fruit_bend;
                  this.final_y = this.init_y - this.fruit_height;
                  this.head_x = 0;
                  this.head_y = 0;

                  this.dist_x = this.final_x - this.init_x;
                  this.dist_y = this.final_y - this.init_y;

                  // State variables
                  this.is_ready_to_spore = false;

                  // Structure variables (Mushroom Stem)
                  this.beizer_radius = 20;
                  this.start_radius = 0;
                  this.end_radius = 10;
                  this.radius = this.start_radius;

                  // Structure variables (Mushroom Cap)
                  this.cap_size_x = 10;
                  this.cap_size_y = 10;
                  this.slope_x = 0;
                  this.slope_y = 0;

                  this.spore_position = p.createVector(0, 0);

                  // Animation variables
                  // Slowed down for High Definition smoothness
                  this.step = 0.0025; 
                  this.pct = 0.0;
                }

                update() {
                  this.pct += this.step;

                  if (this.pct < 1.0) {
                    // Exact Source Math
                    this.head_x = this.init_x + p.pow(this.pct, 4) * this.dist_x;
                    this.head_y = this.init_y + p.pow(this.pct, 0.50) * this.dist_y;

                    this.radius = this.pct * this.end_radius;

                    // Mushroom Stem Bezier Math
                    // Handle divide by zero safety for acos
                    let denom = (this.init_y - this.head_y);
                    if (Math.abs(denom) < 0.0001) denom = 0.0001;
                    
                    this.beizer_angle = p.acos((this.init_x - this.head_x) / denom);
                    this.beizer_radius_x = this.beizer_radius * p.sin(this.beizer_angle);
                    this.beizer_radius_y = this.beizer_radius * p.cos(this.beizer_angle);

                    this.x_mid_point = this.init_x + (this.head_x - this.init_x) / 2;
                    this.y_mid_point = this.init_y + (this.head_y - this.init_y) / 2;

                    if (this.head_x > this.init_x) {
                      this.mid_point_plus_radius_x = this.x_mid_point + (this.beizer_radius_x - this.beizer_radius);
                      this.mid_point_plus_radius_y = this.y_mid_point + this.beizer_radius_y;
                    } else {
                      this.mid_point_plus_radius_x = this.x_mid_point - (this.beizer_radius_x - this.beizer_radius);
                      this.mid_point_plus_radius_y = this.y_mid_point - this.beizer_radius_y;
                    }

                    // Mushroom Cap Math
                    this.cap_size_x = p.pow(this.pct, 4) * this.fruit_cap_width + 5;
                    this.cap_size_y = this.pct * this.fruit_cap_height + 5;

                    this.slope_x = (this.init_x + p.pow(this.pct, 1.5) * this.dist_x) - (this.init_x + p.pow(this.pct - this.step, 1.5) * this.dist_x);
                    this.slope_y = (this.init_y + p.pow(this.pct, 0.5) * this.dist_y) - (this.init_y + p.pow(this.pct - this.step, 0.5) * this.dist_y);
                  }

                  if (this.pct > 1.001 && this.pct < 1.015) {
                    this.is_ready_to_spore = true;
                  } else {
                    this.is_ready_to_spore = false;
                  }
                }

                display() {
                  p.noStroke();
                  
                  p.fill(this.stem_color);
                  p.beginShape();
                  p.curveVertex(this.init_x + this.radius / 2, this.init_y);
                  p.curveVertex(this.init_x + this.radius / 2, this.init_y);
                  p.curveVertex(this.mid_point_plus_radius_x + this.radius / 2, this.mid_point_plus_radius_y + this.radius / 2);
                  p.curveVertex(this.head_x + (this.radius * 0.5) / 2, this.head_y);
                  p.curveVertex(this.head_x + (this.radius * 0.5) / 2, this.head_y);
                  p.curveVertex(this.head_x - (this.radius * 0.5) / 2, this.head_y);
                  p.curveVertex(this.head_x - (this.radius * 0.5) / 2, this.head_y);
                  p.curveVertex(this.mid_point_plus_radius_x - this.radius / 2, this.mid_point_plus_radius_y + this.radius / 2);
                  p.curveVertex(this.init_x - this.radius / 2, this.init_y);
                  p.curveVertex(this.init_x - this.radius / 2, this.init_y);
                  p.endShape();

                  p.fill(this.cap_color);
                  p.push();
                  p.translate(this.head_x, this.head_y);
                  
                  let angle = 0;
                  if (Math.abs(this.slope_y) > 0.0001) {
                      angle = -p.atan(this.slope_x / this.slope_y);
                  }
                  p.rotate(angle);
                  p.arc(0, 0, this.cap_size_x, this.cap_size_y, -p.PI, 0);
                  p.pop();
                }

                spore() {
                  let rVal = p.random(-this.fruit_cap_width / 2, this.fruit_cap_width / 2);
                  this.spore_position.set(parseFloat(rVal), 0);
                  
                  let angle = 0;
                  if (Math.abs(this.slope_y) > 0.0001) {
                      angle = -p.atan(this.slope_x / this.slope_y);
                  }
                  this.spore_position.rotate(angle);
                  
                  return new Spore(
                    this.head_x + this.spore_position.x, 
                    this.head_y + this.spore_position.y
                  );
                }
              }

              // --- CLASS: Spore ---
              class Spore {
                x: number;
                y: number;
                tx: number;
                ty: number;
                step: number;
                health: number;
                death_rate: number;
                on_ground: boolean;
                is_dead: boolean;
                is_ready_to_fruit: boolean;

                constructor(x: number, y: number) {
                  this.x = x;
                  this.y = y;
                  // Animation variables
                  this.tx = 100 * p.random(0, 1);
                  this.ty = 300 * p.random(0, 1);
                  this.step = 0.005; // Slowed down from 0.01 for smoother drift
                  // State variables
                  this.health = 225; // Exact alpha from code
                  this.death_rate = 0.0;
                  this.on_ground = false;
                  this.is_dead = false;
                  this.is_ready_to_fruit = false;
                }

                update() {
                  if (this.y > groundLevel) {
                    this.on_ground = true;
                    this.is_dead = true;
                  } else {
                    if (this.x < 0) this.x = canvasWidth;
                    if (this.x > canvasWidth) this.x = 0;
                    
                    // Exact mapping from code
                    this.x += p.map(p.noise(this.tx), 0, 1, -5, 5);
                    this.y += p.map(p.noise(this.ty), 0, 1, -1, 1.8);
                  }

                  this.tx += this.step;
                  this.ty += this.step;

                  if (this.on_ground) {
                    this.death_rate = 1;
                  }

                  // Exact Spawn Condition from Code
                  // if (this.health == 50)
                  if (Math.floor(this.health) === 50) {
                    this.is_ready_to_fruit = true;
                  } else {
                    this.is_ready_to_fruit = false;
                  }

                  if (this.health < 0) {
                    this.is_dead = true;
                  }

                  this.health -= this.death_rate;
                }

                display() {
                  // Spore color: Yellowish in both modes for visibility
                  p.fill(p.color(255, 225, 0, this.health)); 
                  p.ellipse(this.x, this.y, 3, 3);
                }
              }

              // --- P5 SETUP & DRAW ---

              p.setup = () => {
                p.createCanvas(canvasWidth, canvasHeight);
                p.pixelDensity(window.devicePixelRatio || 1); // HD support
                
                // Initialize first mushroom
                // Code: first_fruit.initialize(100, 50, 30, 0);
                // We create a few to start the chain reaction visually on the footer
                let first_fruit = new Fruit(canvasWidth / 5);
                fruits.push(first_fruit);
                
                // Add one more to ensure coverage on wide screens
                fruits.push(new Fruit(canvasWidth * 0.7));
              };

              p.draw = () => {
                // Dynamic Background Switching
                if (isDarkRef.current) {
                    // Dark Background (RGB: 5, 2, 10)
                    p.background(5, 2, 10, 255); 
                } else {
                    // Light Background (RGB: 243, 244, 246) - Matches Tailwind bg-gray-100
                    p.background(243, 244, 246, 255);
                }

                // Fruit Scan
                for (let i = 0; i < fruits.length; i++) {
                  fruits[i].update();
                  if (fruits[i].is_ready_to_spore) {
                    // Generate spores: 70% chance per frame during the 'ready' window
                    if (p.random(1) < 0.7) {
                        spores.push(fruits[i].spore());
                    }
                  }
                  fruits[i].display();
                }

                // Spore Scan
                for (let i = spores.length - 1; i >= 0; i--) {
                  spores[i].display();
                  spores[i].update();

                  // Reproduction Logic exactly as in code
                  if (spores[i].is_ready_to_fruit) {
                    // Survival Rate: Only 30% of spores that land and mature will spawn
                    if (p.random(0, 1) < 0.3) { 
                       fruits.push(new Fruit(spores[i].x));
                    }
                  }

                  if (spores[i].is_dead && spores[i].health <= 0) {
                    spores.splice(i, 1);
                  }
                }
                
                // Safety cap to prevent browser crash if left open too long
                // Capped at 30 simultaneous mushrooms
                if (fruits.length > 30) {
                    fruits.splice(0, 1); 
                }
              };

              p.updateSize = (w: number, h: number) => {
                  canvasWidth = w;
                  canvasHeight = h;
                  groundLevel = h - h/10;
                  p.resizeCanvas(w, h);
              };
            };

            p5Ref.current = new window.p5(sketch, containerRef.current);
        }
    };

    startP5();

    if (containerRef.current) {
        resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (p5Ref.current && p5Ref.current.updateSize) {
                    p5Ref.current.updateSize(width, height);
                }
            }
        });
        resizeObserver.observe(containerRef.current);
    }

    return () => {
        if (resizeObserver) resizeObserver.disconnect();
        if (p5Ref.current) p5Ref.current.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none" />;
};

export default SporeFooter;