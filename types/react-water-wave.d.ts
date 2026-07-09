declare module 'react-water-wave' {
  import * as React from 'react';

  export interface WaterWaveProps {
    imageUrl: string;
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    interactive?: boolean;
    crossOrigin?: string;
    style?: React.CSSProperties;
    className?: string;
    children: (methods: any) => React.ReactNode;
  }

  const WaterWave: React.ComponentType<WaterWaveProps>;
  export default WaterWave;
}
