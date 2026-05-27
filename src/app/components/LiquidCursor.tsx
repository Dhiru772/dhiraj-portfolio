'use client';

import { useEffect, useRef } from 'react';

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });

  // Store trail particles
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    maxSize: number;
    age: number;
    maxAge: number;
    vx: number;
    vy: number;
  }>>([]);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable custom cursor class on body to hide default pointer
    document.body.classList.add('custom-cursor-active');

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Add particles when mouse is moving
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 1) {
        // Create 1-2 particles per move event for liquid flow
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 15,
          maxSize: 15 + Math.min(speed * 0.4, 25), // Grow bigger on faster speed
          age: 0,
          maxAge: 45, // Lifespan of trail
          vx: dx * 0.05 + (Math.random() - 0.5) * 0.5,
          vy: dy * 0.05 + (Math.random() - 0.5) * 0.5,
        });
      }

      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Track interactive elements hover
    let isHovering = false;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') ||
        target.classList.contains('cursor-pointer')
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    // Track click feedback
    let isMouseDown = false;
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      // Spawn a burst/splash of particles on click!
      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = 3 + Math.random() * 5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 6,
          maxSize: 10 + Math.random() * 10, // Fluid droplet sizes
          age: 0,
          maxAge: 30 + Math.floor(Math.random() * 20),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw the main cursor circle
      if (mouse.active) {
        // Draw a central core particle that stays with mouse
        ctx.beginPath();
        // Shrink the core during mousedown for visual click feedback
        const coreSize = isMouseDown ? (isHovering ? 20 : 6) : (isHovering ? 32 : 12);
        ctx.arc(mouse.x, mouse.y, coreSize, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8'; // Accent color cyan
        ctx.fill();
      }

      // Update and draw trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;

        // Physics flow: move slightly with velocity and decay
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Size calculation: grow quickly then shrink down
        const progress = p.age / p.maxAge;
        let currentSize = 0;
        if (progress < 0.2) {
          currentSize = p.size + (p.maxSize - p.size) * (progress / 0.2);
        } else {
          currentSize = p.maxSize * (1 - (progress - 0.2) / 0.8);
        }

        if (currentSize <= 0.1 || p.age >= p.maxAge) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        // Gradient color: transition from cyan to green
        ctx.fillStyle = progress > 0.4 ? '#10B981' : '#38BDF8';
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Liquid gooey SVG filter applied via CSS */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none mix-blend-screen opacity-50"
        style={{
          filter: 'url(#liquid-gooey-filter)',
        }}
      />
      {/* Hidden SVG with filter details */}
      <svg className="absolute w-0 h-0 hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
