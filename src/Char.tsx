import React from 'react';
import {useCurrentFrame} from 'remotion';

const OUT = '#222222';
const SW = 1.7;

export type Who = 'hasan' | 'amma' | 'boro' | 'jabbar' | 'doctor' | 'bhabi' | 'bou';
export type Emo = 'neutral' | 'sad' | 'happy' | 'angry' | 'surprised' | 'worry';

type Cfg = {
  skin: string;
  hair: string;
  style: 'short' | 'parted' | 'balding' | 'topi' | 'hood' | 'bun';
  top: string;
  sleeve: 'long' | 'rolled' | 'short';
  bottom: 'lungi' | 'pants' | 'saree';
  bc: string; // নিচের পোশাকের রং ('check' = চেক লুঙ্গি)
  border?: string; // শাড়ির পাড়
  tw: number; // ধড়ের অর্ধেক প্রস্থ
  tunic?: number; // পাঞ্জাবি/কামিজের দৈর্ঘ্য
  belly?: boolean;
  glasses?: boolean;
  beard?: 'stubble' | 'white';
  wrinkles?: boolean;
  apron?: boolean;
  bags?: boolean;
  gamcha?: string;
  shoe: string;
  sc: number;
  brow: string;
};

export const CH: Record<Who, Cfg> = {
  hasan: {skin: '#b9794a', hair: '#1d1d1d', style: 'short', top: '#9fcf9d', sleeve: 'rolled', bottom: 'lungi', bc: 'check', tw: 33, beard: 'stubble', gamcha: '#c8433b', shoe: '#b9794a', sc: 1, brow: '#1d1d1d'},
  amma: {skin: '#cc9567', hair: '#c9c9c9', style: 'hood', top: '#f4f1ea', sleeve: 'short', bottom: 'saree', bc: '#f4f1ea', border: '#1a1a1a', tw: 30, wrinkles: true, shoe: '#cc9567', sc: 0.9, brow: '#9a9a9a'},
  boro: {skin: '#d39c6e', hair: '#8b8b8b', style: 'balding', top: '#a9c9ea', sleeve: 'long', bottom: 'pants', bc: '#2b2b2b', tw: 41, belly: true, glasses: true, shoe: '#2d2d2d', sc: 1, brow: '#6f6f6f'},
  jabbar: {skin: '#c58b5b', hair: '#f2f2f2', style: 'topi', top: '#8d9399', sleeve: 'long', bottom: 'lungi', bc: '#f4f4f4', tw: 30, tunic: 64, beard: 'white', wrinkles: true, gamcha: '#e6e6e6', shoe: '#c58b5b', sc: 1, brow: '#bdbdbd'},
  doctor: {skin: '#dba577', hair: '#161616', style: 'parted', top: '#5f93cc', sleeve: 'long', bottom: 'pants', bc: '#3b4150', tw: 37, apron: true, bags: true, shoe: '#2d2d2d', sc: 1, brow: '#161616'},
  bhabi: {skin: '#d6a074', hair: '#1b1b1b', style: 'bun', top: '#8a4d8f', sleeve: 'short', bottom: 'pants', bc: '#d9c3a0', tw: 33, tunic: 62, shoe: '#6b4a2f', sc: 0.97, brow: '#1b1b1b'},
  bou: {skin: '#c18656', hair: '#1b1b1b', style: 'bun', top: '#c34b5a', sleeve: 'short', bottom: 'saree', bc: '#c34b5a', border: '#f0c75e', tw: 28, shoe: '#c18656', sc: 0.95, brow: '#1b1b1b'},
};

const SHORT =
  'M -47 -316 C -53 -352 -30 -370 0 -368 C 32 -370 52 -350 47 -322 C 42 -336 34 -343 20 -343 C 6 -337 -12 -340 -26 -334 C -36 -330 -42 -324 -47 -316 Z';
const BALD =
  'M -47 -316 C -53 -350 -30 -370 0 -368 C 12 -368 20 -364 18 -357 C 6 -354 -8 -350 -22 -340 C -32 -334 -40 -326 -47 -316 Z';
const TOPI =
  'M -46 -326 C -46 -352 -26 -368 0 -368 C 26 -368 46 -352 46 -326 C 30 -334 -30 -334 -46 -326 Z';
const HOOD =
  'M -56 -296 C -62 -352 -30 -376 2 -374 C 36 -376 60 -350 54 -296 C 54 -272 46 -258 40 -250 L -44 -250 C -52 -264 -56 -282 -56 -296 Z';
const BAND =
  'M -49 -318 C -56 -356 -28 -374 2 -372 C 36 -374 58 -352 49 -318 C 46 -334 38 -346 22 -350 C 6 -354 -12 -354 -26 -350 C -40 -344 -46 -332 -49 -318 Z';

export const Char: React.FC<{
  who: Who;
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  walk?: boolean;
  spd?: number;
  talk?: boolean;
  emo?: Emo;
  arms?: [number, number]; // [দূরের হাত, কাছের হাত] সামনের দিকে ডিগ্রি
  sit?: boolean;
  pedal?: number;
  lying?: boolean;
  shake?: number;
  cry?: boolean;
  sweat?: boolean;
  prop?: React.ReactNode;
  tilt?: number;
}> = (p) => {
  const f = useCurrentFrame();
  const c = CH[p.who];
  const s = (p.s ?? 1.5) * c.sc;
  const emo = p.emo ?? 'neutral';
  const spd = p.spd ?? 1;
  const k = Math.min(spd, 1);
  const ph = (f * 2 * Math.PI) / (30 / spd);
  const w = p.walk ? Math.sin(ph) : 0;
  const bob = p.walk ? -Math.abs(Math.sin(ph)) * 5 * k : Math.sin(f / 20) * 2.5;
  const tr = p.shake ? Math.sin(f * 2.3) * p.shake : 0;

  // হাত: উল্টো পা এগোলে উল্টো হাত সামনে
  let aFar = 3 + Math.sin(f / 26) * 3;
  let aNear = -3 + Math.sin(f / 26 + 1) * 3;
  if (p.arms) {
    aFar = p.arms[0] + Math.sin(f / 24) * 2;
    aNear = p.arms[1] + Math.sin(f / 24 + 1) * 2;
  } else if (p.walk) {
    aFar = 25 * w * k;
    aNear = -25 * w * k;
  }
  const legN = p.walk ? 20 * w * k : 0;
  const legF = -legN;
  const liftN = p.walk ? Math.max(0, Math.sin(ph + Math.PI / 2)) * 8 : 0;
  const liftF = p.walk ? Math.max(0, -Math.sin(ph + Math.PI / 2)) * 8 : 0;
  const osc = (p.pedal ?? 0) * Math.sin(f / 3);
  const sway = p.walk ? w * 7 : 0;
  const tw = c.tw;
  const tilt = p.tilt ?? (emo === 'sad' || emo === 'worry' ? 6 : 0);

  const legCol = c.bottom === 'pants' ? c.bc : c.skin;
  const leg = (hx: number, ang: number, lift: number, key: string) => {
    if (p.sit) {
      const A = ((90 + ang) * Math.PI) / 180;
      const kx = 78 * Math.sin(A);
      const ky = 78 * Math.cos(A);
      return (
        <g key={key} transform={`translate(${hx},-150)`}>
          <g transform={`rotate(${-(90 + ang)})`}>
            <rect x={-13} y={-8} width={26} height={86} rx={13} fill={legCol} stroke={OUT} strokeWidth={SW} />
          </g>
          <g transform={`translate(${kx},${ky}) rotate(${ang * -0.4})`}>
            <rect x={-12} y={-6} width={24} height={152} rx={12} fill={legCol} stroke={OUT} strokeWidth={SW} />
            <ellipse cx={8} cy={148} rx={22} ry={10} fill={c.shoe} stroke={OUT} strokeWidth={SW} />
          </g>
        </g>
      );
    }
    return (
      <g key={key} transform={`translate(${hx},${-150 - lift}) rotate(${-ang})`}>
        <rect x={-13} y={-10} width={26} height={146} rx={13} fill={legCol} stroke={OUT} strokeWidth={SW} />
        <ellipse cx={8} cy={142} rx={22} ry={10} fill={c.shoe} stroke={OUT} strokeWidth={SW} />
      </g>
    );
  };

  const arm = (ang: number, near: boolean) => {
    const sl = c.sleeve === 'long' ? 98 : c.sleeve === 'rolled' ? 50 : 42;
    return (
      <g transform={`translate(${near ? 9 : -9},-250) rotate(${-ang})`}>
        <rect x={-11} y={-6} width={22} height={116} rx={11} fill={c.skin} stroke={OUT} strokeWidth={SW} />
        <rect x={-12.5} y={-8} width={25} height={sl} rx={12} fill={c.top} stroke={OUT} strokeWidth={SW} />
        <circle cx={0} cy={112} r={13} fill={c.skin} stroke={OUT} strokeWidth={SW} />
        {near && p.prop ? <g transform="translate(0,114)">{p.prop}</g> : null}
      </g>
    );
  };

  // ---- মুখ ----
  const blink = f % 120 < 4;
  const eye = (cx: number, cy: number) =>
    emo === 'happy' ? (
      <path d={`M ${cx - 8} ${cy + 3} Q ${cx} ${cy - 9} ${cx + 8} ${cy + 3}`} fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" />
    ) : (
      <g transform={`translate(${cx},${cy}) scale(1,${blink ? 0.12 : 1})`}>
        <ellipse rx={8.5} ry={10} fill="#fff" stroke={OUT} strokeWidth={1.3} />
        <circle cx={2.5} cy={1} r={4.8} fill="#1a1a1a" />
        <circle cx={4} cy={-1} r={1.5} fill="#fff" />
      </g>
    );
  const browAng = (inner: 1 | -1) =>
    emo === 'angry' ? 16 * inner : emo === 'sad' || emo === 'worry' ? -14 * inner : 0;
  const browY = emo === 'surprised' ? -35 : emo === 'happy' ? -31 : -28;
  const brow = (cx: number, inner: 1 | -1) => (
    <line
      x1={cx - 9}
      x2={cx + 9}
      y1={-318 + browY + 10}
      y2={-318 + browY + 10}
      stroke={c.brow}
      strokeWidth={3.4}
      strokeLinecap="round"
      transform={`rotate(${browAng(inner)} ${cx} ${-318 + browY + 10})`}
    />
  );
  const mouth = () => {
    if (p.talk) {
      const m = [0, 1, 2, 1, 2, 1, 0, 2][Math.floor(f / 3.5) % 8];
      if (m === 1) return <ellipse cx={16} cy={-287} rx={7} ry={4} fill="#7a2a2a" stroke={OUT} strokeWidth={1.2} />;
      if (m === 2) return <ellipse cx={16} cy={-286} rx={9} ry={8.5} fill="#7a2a2a" stroke={OUT} strokeWidth={1.2} />;
    }
    switch (emo) {
      case 'sad':
      case 'worry':
        return <path d="M 6 -283 Q 16 -293 26 -283" fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" />;
      case 'happy':
        return <path d="M 6 -290 Q 16 -276 26 -290" fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" />;
      case 'angry':
        return <path d="M 6 -284 L 26 -290" fill="none" stroke={OUT} strokeWidth={3} strokeLinecap="round" />;
      case 'surprised':
        return <ellipse cx={16} cy={-285} rx={6} ry={8} fill="#7a2a2a" stroke={OUT} strokeWidth={1.2} />;
      default:
        return <path d="M 7 -287 L 25 -287" fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" />;
    }
  };
  const tearPh = (f % 28) / 28;
  const tearPh2 = ((f + 14) % 28) / 28;
  const sweatPh = (f % 36) / 36;

  const hairBack = () => {
    if (c.style === 'hood') return <path d={HOOD} fill="#f4f1ea" stroke={OUT} strokeWidth={SW} />;
    if (c.style === 'bun') return <circle cx={-44} cy={-338} r={16} fill={c.hair} stroke={OUT} strokeWidth={SW} />;
    return null;
  };
  const hairFront = () => {
    switch (c.style) {
      case 'short':
      case 'parted':
      case 'bun':
        return (
          <g>
            <path d={SHORT} fill={c.hair} stroke={OUT} strokeWidth={SW} />
            {c.style === 'parted' ? <path d="M -6 -366 Q -4 -352 -16 -338" fill="none" stroke="#555" strokeWidth={2} /> : null}
          </g>
        );
      case 'balding':
        return <path d={BALD} fill={c.hair} stroke={OUT} strokeWidth={SW} />;
      case 'topi':
        return (
          <g>
            <path d="M -46 -322 Q -50 -306 -42 -296 L -36 -302 Q -40 -312 -38 -322 Z" fill="#f2f2f2" stroke={OUT} strokeWidth={SW} />
            <path d={TOPI} fill="#fbfbfb" stroke={OUT} strokeWidth={SW} />
            <path d="M -30 -344 Q 0 -352 30 -344 M -34 -354 Q 0 -362 34 -354" fill="none" stroke="#c9c9c9" strokeWidth={2} />
          </g>
        );
      case 'hood':
        return (
          <g>
            <path d="M -38 -336 C -16 -350 18 -350 40 -336 C 20 -342 -16 -342 -38 -336 Z" fill="#c9c9c9" stroke="none" />
            <path d={BAND} fill="#f4f1ea" stroke={OUT} strokeWidth={SW} />
            <path d="M -49 -318 C -46 -332 -40 -344 -26 -350 C -12 -354 6 -354 22 -350 C 38 -346 46 -334 49 -318" fill="none" stroke="#111" strokeWidth={4} />
          </g>
        );
      default:
        return null;
    }
  };

  const head = (
    <g transform={`rotate(${tilt} 0 -268)`}>
      {hairBack()}
      <ellipse cx={44} cy={-306} rx={7} ry={9} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      <ellipse cx={0} cy={-312} rx={46} ry={50} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      <ellipse cx={-30} cy={-308} rx={7} ry={11} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      {c.beard === 'stubble' ? (
        <path d="M -34 -296 Q 0 -250 36 -296 Q 22 -276 0 -274 Q -22 -276 -34 -296 Z" fill="#2a2a2a" opacity={0.38} />
      ) : null}
      {c.beard === 'white' ? (
        <path d="M -36 -296 Q -32 -244 8 -242 Q 38 -250 40 -296 Q 22 -278 2 -278 Q -18 -278 -36 -296 Z" fill="#f4f4f4" stroke={OUT} strokeWidth={SW} />
      ) : null}
      {c.bags ? (
        <g opacity={0.35}>
          <ellipse cx={2} cy={-303} rx={9} ry={3.5} fill="#6a4a7a" />
          <ellipse cx={26} cy={-303} rx={9} ry={3.5} fill="#6a4a7a" />
        </g>
      ) : null}
      {c.wrinkles ? (
        <g fill="none" stroke="#6b4a30" strokeWidth={1.4} opacity={0.55}>
          <path d="M -8 -304 q 6 4 12 0" />
          <path d="M 18 -304 q 6 4 12 0" />
          <path d="M -6 -334 q 14 -4 28 0" />
          <path d="M 34 -292 q 4 6 0 12" />
        </g>
      ) : null}
      {eye(2, -318)}
      {eye(26, -318)}
      {brow(2, 1)}
      {brow(26, -1)}
      {mouth()}
      {p.cry || emo === 'sad' ? (
        <g fill="#7fc4ff" stroke="#3b86c6" strokeWidth={0.8}>
          {p.cry ? (
            <>
              <circle cx={30} cy={-304 + tearPh * 36} r={4.5} opacity={1 - tearPh} />
              <circle cx={6} cy={-304 + tearPh2 * 36} r={4} opacity={1 - tearPh2} />
            </>
          ) : null}
        </g>
      ) : null}
      {p.sweat ? (
        <path
          d={`M -22 ${-346 + sweatPh * 30} q -7 11 0 16 q 7 -5 0 -16 Z`}
          fill="#8fd0ff"
          stroke="#3b86c6"
          strokeWidth={1}
          opacity={1 - sweatPh * 0.6}
        />
      ) : null}
      {c.glasses ? (
        <g fill="none" stroke={OUT} strokeWidth={2.4}>
          <circle cx={2} cy={-318} r={14} />
          <circle cx={26} cy={-318} r={14} />
          <path d="M 16 -318 L 12 -318 M -12 -318 L -40 -324" />
        </g>
      ) : null}
      {hairFront()}
    </g>
  );

  // ---- ধড় ও নিচের পোশাক ----
  const garment = () => {
    if (c.bottom === 'lungi') {
      return (
        <path
          d={`M ${-tw} -158 L ${tw} -158 L ${tw + 12 + sway} -56 L ${-tw - 12 + sway} -56 Z`}
          fill={c.bc === 'check' ? 'url(#lungiChk)' : c.bc}
          stroke={OUT}
          strokeWidth={SW}
        />
      );
    }
    if (c.bottom === 'saree') {
      return (
        <g>
          <path
            d={`M ${-tw - 2} -170 L ${tw + 2} -170 L ${tw + 14 + sway} -26 L ${-tw - 14 + sway} -26 Z`}
            fill={c.bc}
            stroke={OUT}
            strokeWidth={SW}
          />
          <path
            d={`M ${-tw - 13 + sway} -42 L ${tw + 13 + sway} -42 L ${tw + 14 + sway} -26 L ${-tw - 14 + sway} -26 Z`}
            fill={c.border}
            stroke={OUT}
            strokeWidth={SW}
          />
        </g>
      );
    }
    return <rect x={-tw} y={-160} width={tw * 2} height={14} fill="#1d1d1d" opacity={0.7} />;
  };

  const torso = (
    <g>
      {c.belly ? <ellipse cx={tw - 6} cy={-192} rx={16} ry={28} fill={c.top} stroke={OUT} strokeWidth={SW} /> : null}
      {c.tunic ? (
        <path
          d={`M ${-tw} -150 L ${-tw - 6} ${-150 + c.tunic} L ${tw + 6} ${-150 + c.tunic} L ${tw} -150 Z`}
          fill={c.top}
          stroke={OUT}
          strokeWidth={SW}
        />
      ) : null}
      <path
        d={`M ${-tw} -150 L ${-tw} -240 Q ${-tw} -262 ${-tw + 22} -262 L ${tw - 22} -262 Q ${tw} -262 ${tw} -240 L ${tw} -150 Z`}
        fill={c.top}
        stroke={OUT}
        strokeWidth={SW}
      />
      {c.bottom === 'saree' ? (
        <path d={`M ${-tw} -262 L ${-tw + 16} -262 L ${tw} -172 L ${tw - 18} -172 Z`} fill={c.border} opacity={0.9} />
      ) : null}
      {c.apron ? (
        <g>
          <path
            d={`M ${-tw - 3} -262 L -10 -262 L 0 -226 L 10 -262 L ${tw + 3} -262 L ${tw + 3} -92 L ${-tw - 3} -92 Z`}
            fill="#fdfdfd"
            stroke={OUT}
            strokeWidth={SW}
          />
          <path d="M -12 -268 Q -24 -222 -4 -212 Q 16 -222 12 -268" fill="none" stroke="#222" strokeWidth={3} />
          <circle cx={-4} cy={-208} r={7} fill="#9aa0a6" stroke={OUT} strokeWidth={SW} />
        </g>
      ) : null}
      {c.gamcha ? (
        <path
          d={`M ${-tw - 6} -262 Q ${-tw - 14} -226 ${-tw - 9} -186 L ${-tw + 14} -186 Q ${-tw + 8} -226 ${-tw + 14} -262 Z`}
          fill={c.gamcha}
          stroke={OUT}
          strokeWidth={SW}
        />
      ) : null}
    </g>
  );

  const upper = (
    <g transform={`translate(0,${bob})`}>
      {arm(aFar, false)}
      {garment()}
      {torso}
      <rect x={-9} y={-274} width={18} height={26} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      {head}
      {arm(aNear, true)}
    </g>
  );

  return (
    <g transform={`translate(${p.x + tr},${p.y}) scale(${p.flip ? -s : s},${s})`}>
      <defs>
        <pattern id="lungiChk" width={28} height={28} patternUnits="userSpaceOnUse">
          <rect width={28} height={28} fill="#e9e3d2" />
          <rect width={14} height={28} fill="#3b6ea5" opacity={0.55} />
          <rect width={28} height={14} fill="#b04a3a" opacity={0.45} />
        </pattern>
      </defs>
      <g transform={p.lying ? 'translate(0,110) rotate(-90 0 -150)' : undefined}>
        {leg(-14, legF + (p.sit ? -osc : 0), liftF, 'lf')}
        {leg(14, legN + (p.sit ? osc : 0), liftN, 'ln')}
        {upper}
      </g>
    </g>
  );
};
