import { useEffect, useRef } from 'react';

const useDoughnutShadow = (chartRef) => {
  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
      }
    }
  }, [chartRef]);
};

export default useDoughnutShadow;
