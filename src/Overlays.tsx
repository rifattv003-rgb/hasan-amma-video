import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/HindSiliguri';

const loaded = loadFont('normal', {weights: ['500', '700'], subsets: ['bengali', 'latin']});
export const FF = loaded.fontFamily;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- পপ-আপ অ্যানিমেশন ----------
export const usePop = (at: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = Math.round(at * fps);
  if (f < start) return 0;
  return spring({frame: f - start, fps, config: {damping: 13, stiffness: 120}});
};

export const PopBox: React.FC<{
  at: number;
  until?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({at, until, style, children}) => {
  const k = usePop(at);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out =
    until !== undefined ? interpolate(f, [until * fps - 6, until * fps], [1, 0], clamp) : 1;
  if (k <= 0 || out <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        transform: `scale(${0.5 + 0.5 * k})`,
        opacity: Math.min(1, k * 1.6) * out,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ---------- আইকন (০,০ কেন্দ্র, আকার প্রায় ১০০) ----------
const S = {stroke: '#222', strokeWidth: 3, strokeLinejoin: 'round'} as const;
export const ICONS: Record<string, React.ReactElement> = {
  money: (
    <g>
      <circle r={44} fill="#f2c14e" {...S} />
      <circle r={34} fill="none" stroke="#c79a2b" strokeWidth={3} />
      <text y={18} textAnchor="middle" fontSize={50} fontWeight={700} fill="#7a5a10" fontFamily={FF}>৳</text>
    </g>
  ),
  clock: (
    <g>
      <circle r={46} fill="#fff" {...S} />
      <path d="M0,-28 L0,0 L20,12" fill="none" {...S} />
      <circle r={4} fill="#222" />
    </g>
  ),
  question: (
    <g>
      <circle r={46} fill="#ffd166" {...S} />
      <text y={22} textAnchor="middle" fontSize={64} fontWeight={700} fill="#222" fontFamily={FF}>?</text>
    </g>
  ),
  phone: (
    <g>
      <rect x={-28} y={-46} width={56} height={92} rx={10} fill="#2c2f36" {...S} />
      <rect x={-22} y={-36} width={44} height={68} fill="#9fd0ff" />
    </g>
  ),
  house: (
    <g>
      <path d="M-46,-4 L0,-46 L46,-4 L38,-4 L38,42 L-38,42 L-38,-4 Z" fill="#e6c9a0" {...S} />
      <rect x={-10} y={12} width={20} height={30} fill="#7a5a3a" {...S} />
    </g>
  ),
  pill: (
    <g transform="rotate(-12)">
      <rect x={-50} y={-34} width={100} height={68} rx={8} fill="#dcdcdc" {...S} />
      {[-30, 0, 30].map((x) =>
        [-14, 14].map((y) => (
          <circle key={x + '_' + y} cx={x} cy={y} r={9} fill="#f2b84b" stroke="#222" strokeWidth={2} />
        )),
      )}
    </g>
  ),
  calendar: (
    <g>
      <rect x={-46} y={-42} width={92} height={88} rx={8} fill="#fff" {...S} />
      <rect x={-46} y={-42} width={92} height={26} rx={8} fill="#d9534f" {...S} />
      <text y={30} textAnchor="middle" fontSize={34} fontWeight={700} fill="#222" fontFamily={FF}>মার্চ</text>
    </g>
  ),
  notebook: (
    <g>
      <rect x={-38} y={-48} width={76} height={96} rx={6} fill="#f6e7b4" {...S} />
      {[-26, -10, 6, 22].map((y) => (
        <line key={y} x1={-26} y1={y} x2={26} y2={y} stroke="#8a7a4a" strokeWidth={2.5} />
      ))}
      <rect x={-44} y={-48} width={10} height={96} fill="#c0392b" {...S} />
    </g>
  ),
  heart: (
    <path d="M0,40 C-60,-4 -34,-48 0,-16 C34,-48 60,-4 0,40 Z" fill="#e0525f" {...S} />
  ),
  check: (
    <g>
      <circle r={40} fill="#6cc070" {...S} />
      <path d="M-18,2 L-4,16 L20,-14" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  earring: (
    <g>
      <circle cx={0} cy={-18} r={22} fill="none" stroke="#d9a520" strokeWidth={7} />
      <path d="M0,10 Q-16,30 0,46 Q16,30 0,10 Z" fill="#f2c14e" {...S} />
    </g>
  ),
  comment: (
    <g>
      <path d="M-46,-34 H46 V22 H10 L-18,46 V22 H-46 Z" fill="#fff" {...S} />
      {[-22, 0, 22].map((x) => (
        <circle key={x} cx={x} cy={-6} r={5} fill="#222" />
      ))}
    </g>
  ),
  moon: (
    <path d="M14,-44 A46,46 0 1 0 44,22 A38,38 0 0 1 14,-44 Z" fill="#f4e19a" {...S} />
  ),
  warn: (
    <g>
      <path d="M0,-44 L46,38 H-46 Z" fill="#ffcf40" {...S} />
      <text y={26} textAnchor="middle" fontSize={50} fontWeight={700} fill="#222" fontFamily={FF}>!</text>
    </g>
  ),
};

export const Icon: React.FC<{n: string; size?: number}> = ({n, size = 100}) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" style={{overflow: 'visible'}}>
    {ICONS[n]}
  </svg>
);

// ---------- কলআউট, নোট কার্ড, ক্যাপশন ----------
export type BubbleDef = {
  t0: number;
  t1: number;
  x: number;
  y: number;
  w: number;
  who: string;
  color: string;
  text: string;
  tail?: number;
  fs?: number;
};
export type NoteDef = {
  t0: number;
  t1: number;
  x: number;
  y: number;
  text: string;
  kind: 'pin' | 'stamp' | 'pill' | 'sms';
  rot?: number;
  color?: string;
  fs?: number;
};
export type CapDef = {t0: number; t1: number; text: string};

const Bub: React.FC<{b: BubbleDef}> = ({b}) => {
  const tail = b.tail ?? 90;
  return (
    <PopBox
      at={b.t0}
      until={b.t1}
      style={{left: b.x, top: b.y, width: b.w, transformOrigin: `${tail}px 100%`}}
    >
      <div
        style={{
          background: '#fff',
          border: '5px solid #222',
          borderRadius: 30,
          padding: '16px 28px 20px',
          fontFamily: FF,
          boxShadow: '6px 8px 0 rgba(0,0,0,.25)',
          position: 'relative',
        }}
      >
        <div style={{fontSize: 30, fontWeight: 700, color: b.color, marginBottom: 4}}>{b.who}</div>
        <div style={{fontSize: b.fs ?? 46, fontWeight: 700, color: '#222', lineHeight: 1.35}}>
          {b.text}
        </div>
        <div
          style={{
            position: 'absolute',
            left: tail - 18,
            bottom: -19,
            width: 34,
            height: 34,
            background: '#fff',
            borderRight: '5px solid #222',
            borderBottom: '5px solid #222',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </PopBox>
  );
};

const NoteEl: React.FC<{n: NoteDef}> = ({n}) => {
  const rot = n.rot ?? 0;
  const fs = n.fs ?? 44;
  let inner: React.ReactNode;
  if (n.kind === 'pin') {
    inner = (
      <div
        style={{
          background: '#fff3a6',
          border: '4px solid #222',
          padding: '22px 30px',
          borderRadius: 8,
          fontSize: fs,
          fontWeight: 700,
          color: '#222',
          whiteSpace: 'pre-line',
          boxShadow: '6px 8px 0 rgba(0,0,0,.25)',
          transform: `rotate(${rot}deg)`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: -18,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: '#d9382f',
            border: '3px solid #222',
            marginLeft: -14,
          }}
        />
        {n.text}
      </div>
    );
  } else if (n.kind === 'stamp') {
    const c = n.color ?? '#c0392b';
    inner = (
      <div
        style={{
          border: `7px solid ${c}`,
          color: c,
          background: 'rgba(255,255,255,.88)',
          padding: '10px 30px',
          borderRadius: 14,
          fontSize: fs + 8,
          fontWeight: 700,
          whiteSpace: 'pre-line',
          textAlign: 'center',
          transform: `rotate(${rot || -6}deg)`,
        }}
      >
        {n.text}
      </div>
    );
  } else if (n.kind === 'pill') {
    inner = (
      <div
        style={{
          background: n.color ?? '#e07a3f',
          color: '#fff',
          fontSize: fs,
          fontWeight: 700,
          padding: '6px 32px',
          borderRadius: 999,
          border: '4px solid #222',
        }}
      >
        {n.text}
      </div>
    );
  } else {
    inner = (
      <div
        style={{
          background: '#e6f2ff',
          border: '4px solid #222',
          borderRadius: '28px 28px 28px 6px',
          padding: '14px 28px',
          fontSize: fs,
          fontWeight: 600,
          color: '#222',
          whiteSpace: 'pre-line',
          boxShadow: '5px 6px 0 rgba(0,0,0,.22)',
        }}
      >
        {n.text}
      </div>
    );
  }
  return (
    <PopBox at={n.t0} until={n.t1} style={{left: n.x, top: n.y, fontFamily: FF}}>
      {inner}
    </PopBox>
  );
};

const CapEl: React.FC<{c: CapDef}> = ({c}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const a = c.t0 * fps;
  const b = c.t1 * fps;
  const inn = interpolate(f, [a, a + 7], [0, 1], clamp);
  const out = interpolate(f, [b - 6, b], [1, 0], clamp);
  const parts = c.text.split('*');
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 64,
        textAlign: 'center',
        fontFamily: FF,
        fontWeight: 700,
        fontSize: 62,
        color: '#fff',
        opacity: inn * out,
        transform: `translateY(${(1 - inn) * 24}px)`,
        WebkitTextStroke: '1.5px rgba(0,0,0,.55)',
        textShadow: '0 4px 12px rgba(0,0,0,.85)',
        paintOrder: 'stroke fill',
      }}
    >
      {parts.map((p, i) =>
        i % 2 ? (
          <span key={i} style={{color: '#ffd23f'}}>{p}</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </div>
  );
};

// ---------- সিন র‍্যাপার ----------
// নিয়ম: কলআউট বাবল বা নোট কার্ড/স্ট্যাম্প থাকলে নিচের ক্যাপশন নিজে থেকেই বন্ধ থাকে।
export const Scene: React.FC<{
  svg?: React.ReactNode;
  html?: React.ReactNode;
  bubbles?: BubbleDef[];
  notes?: NoteDef[];
  caps?: CapDef[];
  tag?: string;
  shake?: number;
  zoom?: number;
  origin?: string;
}> = ({svg, html, bubbles = [], notes = [], caps = [], tag, shake = 0, zoom = 0.00008, origin = '50% 60%'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const fade = interpolate(f, [0, 8], [0, 1], clamp);
  const sx = shake ? Math.sin(f * 2.1) * shake : 0;
  const sy = shake ? Math.cos(f * 2.7) * shake * 0.8 : 0;
  const sc = (shake ? 1.03 : 1) + f * zoom;
  const busy =
    bubbles.some((b) => t >= b.t0 && t < b.t1) ||
    notes.some((n) => n.kind !== 'pill' && t >= n.t0 && t < n.t1);
  const cap = busy ? null : caps.find((c) => t >= c.t0 && t < c.t1);
  return (
    <AbsoluteFill style={{background: '#000', opacity: fade, fontFamily: FF}}>
      {svg ? (
        <AbsoluteFill
          style={{transform: `translate(${sx}px,${sy}px) scale(${sc})`, transformOrigin: origin}}
        >
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{display: 'block'}}>
            {svg}
          </svg>
        </AbsoluteFill>
      ) : null}
      {html}
      {tag ? (
        <PopBox at={0.2} until={3.8} style={{left: 56, top: 44, fontFamily: FF}}>
          <div
            style={{
              background: 'rgba(34,34,34,.82)',
              color: '#fff',
              fontSize: 38,
              fontWeight: 700,
              padding: '6px 28px',
              borderRadius: 999,
            }}
          >
            {tag}
          </div>
        </PopBox>
      ) : null}
      {bubbles.map((b, i) => (
        <Bub key={'b' + i} b={b} />
      ))}
      {notes.map((n, i) => (
        <NoteEl key={'n' + i} n={n} />
      ))}
      {cap ? <CapEl key={cap.t0} c={cap} /> : null}
    </AbsoluteFill>
  );
};
