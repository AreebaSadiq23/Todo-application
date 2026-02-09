"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from '../../app/home.module.css'; // Adjust path if necessary

interface AnimationWrapperProps {
  children: React.ReactNode;
  animationClass?: string;
  delay?: number; // Delay in seconds
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children, animationClass = styles.fadeInUp, delay = 0 }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Only observe if the element is not yet visible
      if (entries[0].isIntersecting && !isVisible) {
        // Apply delay before setting visible
        setTimeout(() => {
          setVisible(true);
        }, delay * 1000);
      }
    }, {
      threshold: 0.1, // Trigger when 10% of the item is visible
    });

    const currentRef = domRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, delay]);

  return (
    <div
      ref={domRef}
      className={`${styles.animatedElement} ${isVisible ? animationClass : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimationWrapper;
