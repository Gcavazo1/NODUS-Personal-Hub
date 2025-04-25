"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Export the type
export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  /**
   * Content to be revealed
   */
  children: ReactNode;
  
  /**
   * Direction from which the element will enter
   */
  direction?: RevealDirection;
  
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number;
  
  /**
   * Delay before animation starts in milliseconds
   */
  delay?: number;
  
  /**
   * Distance of the animation in pixels
   */
  distance?: number;
  
  /**
   * Threshold for when the animation should start (0-1)
   * 0 = animation starts when element's top enters viewport
   * 1 = animation starts when entire element is in viewport
   */
  threshold?: number;
  
  /**
   * Additional classes to add to the wrapper
   */
  className?: string;
  
  /**
   * Whether to only play the animation once
   */
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  duration = 800,
  delay = 0,
  distance = 50,
  threshold = 0.1,
  className,
  once = true,
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsRevealed(true);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold]);
  
  // Calculate initial transform based on direction
  let initialTransform = 'translateY(0)';
  if (direction === 'up') initialTransform = `translateY(${distance}px)`;
  if (direction === 'down') initialTransform = `translateY(-${distance}px)`;
  if (direction === 'left') initialTransform = `translateX(${distance}px)`;
  if (direction === 'right') initialTransform = `translateX(-${distance}px)`;
  
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translate(0)' : initialTransform,
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Component to stagger the reveal of child elements
 */
interface StaggeredRevealProps {
  /**
   * Content to be revealed
   */
  children: ReactNode[];
  
  /**
   * Direction from which elements will enter
   */
  direction?: RevealDirection;
  
  /**
   * Base duration of the animation in milliseconds
   */
  duration?: number;
  
  /**
   * Base delay before animation starts in milliseconds
   */
  delay?: number;
  
  /**
   * Stagger time between each child's animation in milliseconds
   */
  staggerDelay?: number;
  
  /**
   * Distance of the animation in pixels
   */
  distance?: number;
  
  /**
   * Threshold for when the animation should start (0-1)
   */
  threshold?: number;
  
  /**
   * Additional classes to add to the wrapper
   */
  className?: string;
  
  /**
   * Whether to only play the animation once
   */
  once?: boolean;
}

export function StaggeredReveal({
  children,
  direction = 'up',
  duration = 800,
  delay = 0,
  staggerDelay = 100,
  distance = 50,
  threshold = 0.1,
  className,
  once = true,
}: StaggeredRevealProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          duration={duration}
          delay={delay + index * staggerDelay}
          distance={distance}
          threshold={threshold}
          once={once}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
} 