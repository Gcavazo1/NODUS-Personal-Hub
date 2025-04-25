"use client";

import { useEffect, useCallback } from 'react';

/**
 * ScrollObserver Component
 * 
 * This component initializes IntersectionObserver to detect when elements
 * with the 'reveal-on-scroll' class come into the viewport, then adds
 * the 'is-visible' class to trigger animations.
 */
export function ScrollObserver() {
  const setupObserver = useCallback(() => {
    console.log("[ScrollObserver] Setting up intersection observer");
    
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.15, // 15% of the element needs to be visible
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("[ScrollObserver] Element intersecting:", entry.target);
          entry.target.classList.add('is-visible');
          
          // Optional: stop observing the element after it becomes visible
          // Only if the element has data-observe-once attribute
          if (entry.target.hasAttribute('data-observe-once')) {
            observer.unobserve(entry.target);
          }
        } else {
          // Optional: remove the class if the element is no longer in view
          // Only if the element has data-observe-continuous attribute
          if (entry.target.hasAttribute('data-observe-continuous')) {
            entry.target.classList.remove('is-visible');
          }
        }
      });
    };
    
    // Create observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Get all elements with the reveal-on-scroll class
    const elements = document.querySelectorAll('.reveal-on-scroll');
    console.log(`[ScrollObserver] Found ${elements.length} elements with reveal-on-scroll class`);
    
    // Start observing each element
    elements.forEach(element => {
      observer.observe(element);
    });
    
    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    // Initial setup on mount
    const cleanup = setupObserver();
    
    // Also setup an observer for dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldResetupObserver = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              // If the added node has the reveal-on-scroll class or contains elements with that class
              if (node.classList?.contains('reveal-on-scroll') || 
                  node.querySelectorAll?.('.reveal-on-scroll').length > 0) {
                shouldResetupObserver = true;
              }
            }
          });
        }
      });
      
      // Only re-setup if relevant elements were added
      if (shouldResetupObserver) {
        console.log("[ScrollObserver] DOM changed, re-setting up observer");
        cleanup();
        setupObserver();
      }
    });
    
    // Observe the entire body for changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      cleanup();
      mutationObserver.disconnect();
    };
  }, [setupObserver]);
  
  // This component doesn't render anything visible
  return null;
} 