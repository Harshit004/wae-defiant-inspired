import { useEffect, useRef, useState } from 'react';

interface ScrollSnapOptions {
  thresholds?: number[];
  rootMarginValue?: string;
  snapDebounceTime?: number;
  snapDurationMs?: number;
  topSectionThreshold?: number;
  bottomSectionThreshold?: number;
}

export const useScrollSnap = (options: ScrollSnapOptions = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [userPreference, setUserPreference] = useState(() => {
    return typeof window !== 'undefined'
      ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setUserPreference(!e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer || !userPreference) {
      return;
    }

    const {
      thresholds = [0, 0.1, 0.5, 0.9, 1],
      rootMarginValue = '-10% 0px -10% 0px',
      snapDebounceTime = 150,
      snapDurationMs = 800,
      topSectionThreshold = 0.5,
      bottomSectionThreshold = 0.1,
    } = options;

    const smoothScrollTo = (position: number) => {
      if (isSnapping) return;
      try {
        setIsSnapping(true);
        const startPosition = window.scrollY;
        const distance = position - startPosition;
        const startTime = performance.now();

        const scrollStep = (timestamp: number) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / snapDurationMs, 1);
          const easeInOutCubic = (progress: number) =>
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          const currentProgress = easeInOutCubic(progress);
          window.scrollTo(0, startPosition + distance * currentProgress);
          if (progress < 1) {
            requestAnimationFrame(scrollStep);
          } else {
            setTimeout(() => setIsSnapping(false), 50);
          }
        };
        requestAnimationFrame(scrollStep);
      } catch (error) {
        console.error('Error during scroll animation:', error);
        setIsSnapping(false);
      }
    };

    const handleScrollSnap = (entries: IntersectionObserverEntry[]) => { // Debounce removed here
      if (isSnapping) return;
      entries.forEach((entry) => {
        try {
          if (entry.isIntersecting) {
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            if (scrollContainer) {
              const containerTop = scrollContainer.getBoundingClientRect().top + scrollPosition;
              const containerHeight = scrollContainer.offsetHeight;
              if (entry.intersectionRatio < bottomSectionThreshold) {
                smoothScrollTo(containerTop);
              }
            }
          } else {
            const scrollPosition = window.scrollY;
            if (scrollContainer) {
              const containerTop = scrollContainer.getBoundingClientRect().top + scrollPosition;
              const containerHeight = scrollContainer.offsetHeight;
              const viewportHeight = window.innerHeight;
              if (containerTop < scrollPosition &&
                  scrollPosition > containerTop + containerHeight - viewportHeight * bottomSectionThreshold) {
                smoothScrollTo(containerTop + containerHeight);
              }
              else if (scrollPosition < viewportHeight * topSectionThreshold) {
                smoothScrollTo(0);
              }
            }
          }
        } catch (error) {
          console.error('Error in intersection observer:', error);
        }
      });
    };

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(handleScrollSnap, {
        threshold: thresholds,
        rootMargin: rootMarginValue,
      });
      if (scrollContainer) {
        observer.observe(scrollContainer);
      }
    } catch (error) {
      console.error('Error creating intersection observer:', error);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      // handleScrollSnap.cancel(); // Cancel removed as debounce is gone
    };
  }, [options, isSnapping, userPreference]);

  return {
    scrollContainerRef,
    isSnapping,
    enableSnapping: () => setUserPreference(true),
    disableSnapping: () => setUserPreference(false),
    userPreference
  };
};