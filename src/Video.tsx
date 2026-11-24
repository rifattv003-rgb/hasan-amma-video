import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {AUDIO2_START, FPS, SCENES, TOTAL} from './data';
import * as S from './Scenes';

const MAP: Record<string, React.FC> = {
  s1a: S.S1a, s1b: S.S1b, s1c: S.S1c, s2a: S.S2a, s2b: S.S2b, s2d: S.S2d, s2c: S.S2c,
  s3a: S.S3a, s3b: S.S3b, s4a: S.S4a, s4b: S.S4b, s5: S.S5, s6: S.S6,
  s7a: S.S7a, s7b: S.S7b, s7c: S.S7c, s8: S.S8, s9a: S.S9a, s9b: S.S9b, s9c: S.S9c,
  s10a: S.S10a, s10b: S.S10b, s11: S.S11, s12a: S.S12a, s12b: S.S12b,
  s13a: S.S13a, s13b: S.S13b, s14a: S.S14a, s14b: S.S14b,
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Audio src={staticFile('voice1.mp3')} />
    <Sequence from={AUDIO2_START}>
      <Audio src={staticFile('voice2.mp3')} />
    </Sequence>
    {SCENES.map((sc, i) => {
      const from = Math.round(sc.start * FPS);
      const to = i === SCENES.length - 1 ? TOTAL : Math.round(SCENES[i + 1].start * FPS);
      const C = MAP[sc.id];
      return (
        <Sequence key={sc.id} from={from} durationInFrames={to - from}>
          <C />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
