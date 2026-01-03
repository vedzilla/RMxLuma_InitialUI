'use client';

import { useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import React, { MouseEvent as ReactMouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightProps {
  className?: string;
  size?: number;
  fill?: string;
  children?: React.ReactNode;
}

// Helper to add alpha to various color formats
function addAlpha(color: string, alpha: number): string {
  // If already rgba/hsla, return as-is or modify alpha
  if (color.startsWith('rgba') || color.startsWith('hsla')) {
    return color;
  }
  // For hex colors
  if (color.startsWith('#')) {
    return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
  }
  // For rgb/hsl, convert to rgba/hsla
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  if (color.startsWith('hsl(')) {
    return color.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`);
  }
  // For named colors or other formats, wrap in rgba with parser
  return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
}

export function Spotlight({ className, size = 200, fill = 'white', children }: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn('group relative', className)}
      onMouseMove={handleMouseMove}
    >
      {/* Children rendered with relative positioning to stay above overlay */}
      <div className="relative z-10">
        {children}
      </div>
      {/* Spotlight overlay - pointer-events-none ensures children remain interactive */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${size}px circle at ${mouseX}px ${mouseY}px,
              ${fill === 'white' ? 'rgba(255, 255, 255, 0.15)' : addAlpha(fill, 0.125)},
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
}

// Full-page spotlight that follows cursor globally
export function GlobalSpotlight({ 
  size = 400, 
  color = 'rgba(99, 102, 241, 0.15)' 
}: { 
  size?: number; 
  color?: string 
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${size}px circle at ${mouseX}px ${mouseY}px,
            ${color},
            transparent 80%
          )
        `,
      }}
    />
  );
}
