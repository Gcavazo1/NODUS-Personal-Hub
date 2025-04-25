"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Make 'text' optional if 'textArray' is provided
interface BaseProps {
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  loop?: boolean;
  pauseBetween?: number;
  deleteSpeed?: number;
  className?: string;
  autoStart?: boolean;
  onComplete?: () => void;
}

type TypewriterTextProps = BaseProps & (
  | { text: string; textArray?: never } // Require text if no textArray
  | { text?: never; textArray: string[] } // Require textArray if no text
  | { text: string; textArray: string[] } // Allow both, but textArray takes precedence
);

export function TypewriterText({
  text,
  speed = 70,
  startDelay = 0,
  showCursor = true,
  cursorChar = '|',
  loop = false,
  textArray,
  pauseBetween = 1500,
  deleteSpeed = 40,
  className,
  autoStart = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [arrayIndex, setArrayIndex] = useState(0);
  
  // Determine which text source to use, prioritizing textArray
  // const effectiveText = textArray && textArray.length > 0 ? textArray[0] : text || ''; // Removed unused variable
  const textsToUse = textArray && textArray.length > 0 ? textArray : [text || ''];

  // Use refs for values that shouldn't trigger re-renders
  const textsRef = useRef<string[]>(textsToUse);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Log for debugging
  useEffect(() => {
    console.log('TypewriterText initialized with:', { 
      text: text || null, 
      textArray: textArray || null,
      textsInRef: textsRef.current
    });
  }, [text, textArray]);
  
  // Reset when props change
  useEffect(() => {
    // Reset state when props change
    setDisplayText('');
    setIsTyping(true);
    setIsDeleting(false);
    setArrayIndex(0);
    
    // Update the texts in the ref based on priority
    const newTextsToUse = textArray && textArray.length > 0 ? textArray : [text || ''];
    textsRef.current = newTextsToUse;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, textArray]);
  
  // Main typing effect
  useEffect(() => {
    if (!autoStart) return;
    
    // Get the current text to type
    const currentText = textsRef.current[arrayIndex];
    
    if (!currentText) {
      console.error('No text to type at index', arrayIndex);
      return;
    }
    
    const handleTyping = () => {
      if (!isTyping) return;
      
      if (!isDeleting) {
        // Typing mode
        if (displayText.length < currentText.length) {
          // Continue typing
          timeoutRef.current = setTimeout(() => {
            setDisplayText(currentText.substring(0, displayText.length + 1));
          }, speed);
        } else {
          // Typing complete
          if (!loop && arrayIndex === textsRef.current.length - 1) {
            // If not looping and last element in array, stop here
            setIsTyping(false);
            if (onComplete) onComplete();
            return;
          }
          
          // Pause before deleting or moving to next
          timeoutRef.current = setTimeout(() => {
            if (loop) {
              setIsDeleting(true);
            } else if (arrayIndex < textsRef.current.length - 1) {
              setArrayIndex(prevIndex => prevIndex + 1);
              setDisplayText('');
            }
          }, pauseBetween);
        }
      } else {
        // Deleting mode
        if (displayText.length > 0) {
          // Continue deleting
          timeoutRef.current = setTimeout(() => {
            setDisplayText(currentText.substring(0, displayText.length - 1));
          }, deleteSpeed);
        } else {
          // Deleting complete, move to next text or loop back
          setIsDeleting(false);
          if (arrayIndex < textsRef.current.length - 1) {
            setArrayIndex(prevIndex => prevIndex + 1);
          } else {
            setArrayIndex(0);
          }
        }
      }
    };
    
    // Initial delay or continue typing
    if (displayText === '' && !isDeleting && startDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        handleTyping();
      }, startDelay);
    } else {
      handleTyping();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    arrayIndex,
    autoStart,
    deleteSpeed,
    displayText,
    isDeleting,
    isTyping,
    loop,
    onComplete,
    pauseBetween,
    speed,
    startDelay
  ]);
  
  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayText}
      {showCursor && isTyping && (
        <span className="animate-type-cursor">{cursorChar}</span>
      )}
    </span>
  );
} 