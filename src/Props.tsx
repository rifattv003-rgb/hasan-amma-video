import React from 'react';
import {useCurrentFrame} from 'remotion';

const O = '#222';
const sw = 1.6;
const LO = '#3a2e28';
export const GROUND = 930;

// ---------- হাতের জিনিস (হাতের বিন্দু ০,০) ----------
export const Cup: React.FC = () => (
  <g>
    <path d="M-9,-14 L9,-14 L7,10 L-7,10 Z" fill="#e3f1f7" stroke={O} strokeWidth={sw} />
    <rect x={-8} y={-5} width={16} height={9} fill="#b0702f" opacity={0.9} />
  </g>
);
export const Phone: React.FC = () => (
  <g transform="rotate(-8)">
    <rect x={-9} y={-28} width={18} height={32} rx={3} fill="#2c2f36" stroke={O} strokeWidth={sw} />
    <rect x={-7} y={-25} width={14} height={24} fill="#9fd0ff" />
  </g>
);
export const Strip: React.FC = () => (
  <g transform="rotate(-12)">
    <rect x={-18} y={-14} width={36} height={28} rx={3} fill="#dcdcdc" stroke={O} strokeWidth={sw} />
    {[-9, 0, 9].map((x) =>
      [-5, 5].map((y) => (
        <circle key={x + '_' + y} cx={x} cy={y} r={3.4} fill="#f2b84b" stroke={O} strokeWidth={0.8} />
      )),
    )}
  </g>
);
export const Spoon: React.FC = () => (
  <g transform="rotate(10)">
    <line x1={0} y1={-34} x2={0} y2={6} stroke="#6b4a2f" strokeWidth={5} strokeLinecap="round" />
    <ellipse cx={0} cy={10} rx={11} ry={13} fill="#8a6038" stroke={O} strokeWidth={sw} />
  </g>
);
export const GrapeBag: React.FC = () => (
  <g>
    <path d="M-16,-6 L16,-6 L12,28 L-12,28 Z" fill="#c9a36a" stroke={O} strokeWidth={sw} />
    {[-9, 0, 9, -4, 5].map((x, i) => (
      <circle key={i} cx={x} cy={-12 - (i % 2) * 6} r={6} fill="#7a3f8f" stroke={O} strokeWidth={1} />
    ))}
  </g>
);
export const SchoolBag: React.FC = () => (
  <g>
    <rect x={-22} y={-4} width={44} height={50} rx={8} fill="#d9534f" stroke={O} strokeWidth={sw} />
    <rect x={-16} y={14} width={32} height={20} rx={4} fill="#b8403c" stroke={O} strokeWidth={sw} />
  </g>
);
export const PaanBox: React.FC = () => (
  <g>
    <ellipse cx={0} cy={4} rx={20} ry={12} fill="#c79a3b" stroke={O} strokeWidth={sw} />
    <ellipse cx={0} cy={-2} rx={20} ry={9} fill="#e0b84f" stroke={O} strokeWidth={sw} />
  </g>
);
export const Plate: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={42} ry={9} fill="#d9dde0" stroke={O} strokeWidth={sw} />
    <path d="M-24,-2 Q0,-34 24,-2 Z" fill="#fff" stroke={O} strokeWidth={sw} />
  </g>
);
export const Kula: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={48} ry={14} fill="#d8b66a" stroke={O} strokeWidth={sw} />
    <ellipse cx={0} cy={-3} rx={36} ry={8} fill="#f4ecd0" />
  </g>
);
export const Ghoti: React.FC<{f: number}> = ({f}) => (
  <g transform="rotate(35)">
    <path d="M-14,-18 L14,-18 L18,14 L-18,14 Z" fill="#c79a3b" stroke={O} strokeWidth={sw} />
    <rect x={-8} y={-26} width={16} height={9} fill="#c79a3b" stroke={O} strokeWidth={sw} />
    {[0, 1, 2].map((i) => {
      const ph = ((f + i * 8) % 24) / 24;
      return <circle key={i} cx={22 + ph * 6} cy={10 + ph * 70} r={3.5} fill="#7fc4ff" opacity={1 - ph} />;
    })}
  </g>
);
export const Gluco: React.FC = () => (
  <g>
    <rect x={-12} y={-20} width={24} height={36} rx={5} fill="#e9eef2" stroke={O} strokeWidth={sw} />
    <rect x={-8} y={-16} width={16} height={12} fill="#9ad0a0" />
  </g>
);

// ---------- স্থির জিনিস (পৃথিবীর স্থানাঙ্কে) ----------
export const Bench: React.FC<{x: number; w: number; y: number}> = ({x, w, y}) => (
  <g>
    <rect x={x + 30} y={y + 24} width={22} height={GROUND - y - 24} fill="#7a5530" stroke={LO} strokeWidth={3} />
    <rect x={x + w - 52} y={y + 24} width={22} height={GROUND - y - 24} fill="#7a5530" stroke={LO} strokeWidth={3} />
    <rect x={x} y={y} width={w} height={26} rx={6} fill="#97703f" stroke={LO} strokeWidth={3} />
  </g>
);
export const Chowki: React.FC<{x: number; w: number; y: number}> = ({x, w, y}) => (
  <g>
    <rect x={x + 14} y={y + 28} width={20} height={GROUND - y - 18} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
    <rect x={x + w - 34} y={y + 28} width={20} height={GROUND - y - 18} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
    <rect x={x} y={y} width={w} height={30} rx={5} fill="#8a6238" stroke={LO} strokeWidth={3} />
  </g>
);
export const Chair: React.FC<{x: number; y: number; flip?: boolean}> = ({x, y, flip}) => (
  <g transform={`translate(${x},0) scale(${flip ? -1 : 1},1)`}>
    <rect x={-60} y={y} width={120} height={22} rx={5} fill="#8a6238" stroke={LO} strokeWidth={3} />
    <rect x={-54} y={y + 22} width={16} height={GROUND - y - 22} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
    <rect x={38} y={y + 22} width={16} height={GROUND - y - 22} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
    <rect x={-66} y={y - 150} width={14} height={172} rx={5} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
  </g>
);
export const Trunk: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-70} y={-90} width={140} height={90} rx={8} fill="#7d8b95" stroke={O} strokeWidth={3} />
    <path d="M-70,-90 Q0,-125 70,-90 Z" fill="#6b7882" stroke={O} strokeWidth={3} />
    <rect x={-8} y={-62} width={16} height={18} fill="#c9a23c" stroke={O} strokeWidth={2} />
    <line x1={-70} y1={-60} x2={70} y2={-60} stroke="#55616a" strokeWidth={3} />
  </g>
);
export const Kantha: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill="#c98f6b" stroke={O} strokeWidth={3} />
    {[0.2, 0.4, 0.6, 0.8].map((k) => (
      <line key={k} x1={x + w * k} y1={y + 6} x2={x + w * k} y2={y + h - 6} stroke="#8a5a3b" strokeWidth={3} strokeDasharray="10 8" />
    ))}
    <rect x={x} y={y} width={w} height={14} rx={7} fill="#e7c9a6" stroke={O} strokeWidth={2} />
  </g>
);

// ---------- ভ্যান (মাটি y=০, ডানে চলে) ----------
export const Van: React.FC<{moving?: boolean}> = ({moving = true}) => {
  const f = useCurrentFrame();
  const wr = moving ? f * 9 : 0;
  const cr = moving ? f * 19 : 0;
  const wheel = (cx: number) => (
    <g transform={`translate(${cx},-70) rotate(${wr})`}>
      <circle r={70} fill="none" stroke="#2a2a2a" strokeWidth={9} />
      <circle r={62} fill="none" stroke="#999" strokeWidth={1.5} />
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1={0} y1={-62} x2={0} y2={62} stroke="#bbb" strokeWidth={1.5} transform={`rotate(${a})`} />
      ))}
      <circle r={7} fill="#444" />
    </g>
  );
  const pa = (cr * Math.PI) / 180;
  return (
    <g>
      {/* পেছনের চাকা ও তক্তা */}
      {wheel(-250)}
      <rect x={-362} y={-124} width={332} height={22} rx={4} fill="#b98b52" stroke={LO} strokeWidth={3} />
      <rect x={-362} y={-102} width={332} height={10} fill="#8a6238" stroke={LO} strokeWidth={2} />
      {/* সামনের সাইকেল অংশ */}
      {wheel(200)}
      <line x1={30} y1={-190} x2={100} y2={-60} stroke="#3b3b3b" strokeWidth={9} strokeLinecap="round" />
      <line x1={100} y1={-60} x2={200} y2={-70} stroke="#3b3b3b" strokeWidth={9} strokeLinecap="round" />
      <line x1={200} y1={-70} x2={150} y2={-236} stroke="#3b3b3b" strokeWidth={9} strokeLinecap="round" />
      <line x1={30} y1={-190} x2={150} y2={-236} stroke="#3b3b3b" strokeWidth={7} strokeLinecap="round" />
      <line x1={-30} y1={-110} x2={100} y2={-60} stroke="#3b3b3b" strokeWidth={7} strokeLinecap="round" />
      <rect x={10} y={-204} width={50} height={14} rx={6} fill="#222" />
      <line x1={135} y1={-238} x2={170} y2={-232} stroke="#222" strokeWidth={9} strokeLinecap="round" />
      <circle cx={100} cy={-60} r={9} fill="#555" />
      <rect x={100 + 26 * Math.cos(pa) - 14} y={-60 + 26 * Math.sin(pa) - 5} width={28} height={10} fill="#222" />
      <rect x={100 - 26 * Math.cos(pa) - 14} y={-60 - 26 * Math.sin(pa) - 5} width={28} height={10} fill="#222" />
    </g>
  );
};
