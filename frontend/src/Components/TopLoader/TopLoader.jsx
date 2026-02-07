import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const TopLoader = () => {
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.fetchReducer);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const locationRef = useRef(location.pathname);

  const startProgress = () => {
    clearInterval(timerRef.current);
    setProgress(0);
    setVisible(true);

    let current = 0;
    timerRef.current = setInterval(() => {
      current += (90 - current) * 0.1;
      if (current >= 89.5) {
        current = 90;
        clearInterval(timerRef.current);
      }
      setProgress(current);
    }, 100);
  };

  const completeProgress = () => {
    clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  };

  // Start on route change
  useEffect(() => {
    if (location.pathname !== locationRef.current) {
      locationRef.current = location.pathname;
      startProgress();
    }
  }, [location.pathname]);

  // Respond to Redux isLoading
  useEffect(() => {
    if (isLoading) {
      startProgress();
    } else if (visible) {
      completeProgress();
    }
  }, [isLoading]);

  // Auto-complete for instant navigations (no data fetch)
  useEffect(() => {
    if (visible && !isLoading && progress > 0 && progress < 100) {
      const timeout = setTimeout(completeProgress, 150);
      return () => clearTimeout(timeout);
    }
  }, [visible, isLoading, progress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      <div
        className="h-full bg-brand-primary shadow-[0_0_10px_var(--color-brand-primary),0_0_5px_var(--color-brand-primary)]"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          transition:
            progress >= 100
              ? "width 200ms ease-out, opacity 300ms ease-in 100ms"
              : "width 200ms ease-out",
        }}
      />
    </div>
  );
};

export default TopLoader;
