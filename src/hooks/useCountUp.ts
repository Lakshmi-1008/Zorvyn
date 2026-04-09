import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  delay?: number;
}

/**
 * Custom hook for animating numbers counting up
 * @param targetValue - The final value to count up to
 * @param options - Configuration options for the animation
 * @returns The current animated value
 */
export const useCountUp = (
  targetValue: number,
  options: UseCountUpOptions = {}
): number => {
  const { duration = 1000, delay = 0 } = options;

  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const startValue = prevValueRef.current;
    
    // If we're already at the target, nothing to do
    if (startValue === targetValue && targetValue !== 0) {
      setDisplayValue(targetValue);
      return;
    }

    const startAnimation = () => {
      startTimeRef.current = null;

      const animate = (currentTime: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple easeOut function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(targetValue);
          prevValueRef.current = targetValue;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, delay]);

  return displayValue;
};

export default useCountUp;
