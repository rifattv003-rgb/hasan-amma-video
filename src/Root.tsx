import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, TOTAL} from './data';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HasanAmma"
    component={Video}
    durationInFrames={TOTAL}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
