import React from 'react';
import {useCurrentFrame} from 'remotion';
import {FF} from './Overlays';

export type Tod = 'morning' | 'noon' | 'dusk' | 'night' | 'overcast';

const SKY: Record<Tod, [string, string]> = {
  morning: ['#f3cf8f', '#fbefd2'],
  noon: ['#a9cfe3', '#e9f2e6'],
  dusk: ['#e59a62', '#f8d9a6'],
  night: ['#17233a', '#2d3c58'],
  overcast: ['#aeb4b8', '#d4d6d3'],
};
const TINT: Record<Tod, [string, number]> = {
  morning: ['#ffcf70', 0.1],
  noon: ['#ffffff', 0],
  dusk: ['#ff8f3d', 0.13],
  night: ['#050c20', 0.28],
  overcast: ['#6f7a80', 0.14],
};
const LO = '#3a2e28';
const GR = '#86a866';
const GR2 = '#5f8a4e';
const SOIL = '#b08f66';
const ROAD = '#c9ae82';
const TIN = '#9aa1a5';
const WALL = '#d2b184';
const WOOD = '#a47a48';

type P = {tod: Tod; f: number; kids: React.ReactNode; tx?: number; v?: number; plat?: boolean};

// ---------- সাধারণ উপাদান ----------
const Sky: React.FC<{tod: Tod; f: number}> = ({tod, f}) => {
  const [a, b] = SKY[tod];
  return (
    <g>
      <defs>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#skyg)" />
      {tod === 'night'
        ? [...Array(28)].map((_, i) => (
            <circle key={i} cx={(i * 397) % 1900 + 20} cy={(i * 173) % 420 + 20} r={i % 3 === 0 ? 3 : 2} fill="#fff" opacity={0.5 + 0.4 * Math.sin(f / 20 + i)} />
          ))
        : null}
      {tod === 'morning' ? <circle cx={1450} cy={330} r={80} fill="#ffe7a8" opacity={0.9} /> : null}
      {tod === 'noon' ? <circle cx={1500} cy={170} r={70} fill="#fff6c8" opacity={0.95} /> : null}
      {tod === 'dusk' ? <circle cx={420} cy={470} r={110} fill="#ffb45e" opacity={0.85} /> : null}
      {tod === 'night' ? <path d="M1500,126 A64,64 0 0 0 1500,254 Z" fill="#f4efd6" /> : null}
      {tod !== 'night'
        ? [0, 1, 2].map((i) => {
            const x = ((i * 700 + f * 0.3) % 2400) - 250;
            return (
              <g key={i} opacity={tod === 'overcast' ? 0.95 : 0.7}>
                <ellipse cx={x} cy={150 + i * 70} rx={150} ry={34} fill={tod === 'overcast' ? '#e4e4e4' : '#fff'} />
                <ellipse cx={x + 60} cy={128 + i * 70} rx={90} ry={30} fill={tod === 'overcast' ? '#e4e4e4' : '#fff'} />
              </g>
            );
          })
        : null}
    </g>
  );
};

const Banana: React.FC<{x: number; y: number; s?: number; f: number}> = ({x, y, s = 1, f}) => {
  const sway = Math.sin(f / 30 + x) * 3;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-12,0 L-9,-210 L9,-210 L12,0 Z" fill="#9bb26a" stroke={LO} strokeWidth={2} />
      {[-165, -130, -95, -60, -25, 10, 175].map((a, i) => (
        <path key={i} transform={`translate(0,-210) rotate(${a + sway})`} d="M0,0 Q40,-30 120,-8 Q50,10 0,0 Z" fill="#5e9a48" stroke={LO} strokeWidth={2} />
      ))}
    </g>
  );
};

const Hut: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 420}) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={0} y={-190} width={w} height={190} fill={WALL} stroke={LO} strokeWidth={2.5} />
    <path d={`M-30,-190 L${w / 2},-300 L${w + 30},-190 Z`} fill={TIN} stroke={LO} strokeWidth={2.5} />
    {[0.2, 0.4, 0.6, 0.8].map((k) => (
      <line key={k} x1={w / 2} y1={-300} x2={-30 + k * (w + 60)} y2={-190} stroke={LO} strokeWidth={1.2} opacity={0.5} />
    ))}
    <rect x={w * 0.4} y={-130} width={w * 0.2} height={130} fill="#6b4f36" stroke={LO} strokeWidth={2} />
    <rect x={w * 0.1} y={-140} width={w * 0.14} height={64} fill="#6b4f36" stroke={LO} strokeWidth={2} />
  </g>
);

const Fence: React.FC<{x1: number; x2: number; y: number}> = ({x1, x2, y}) => {
  const n = Math.floor((x2 - x1) / 36);
  return (
    <g>
      {[...Array(n)].map((_, i) => (
        <rect key={i} x={x1 + i * 36} y={y - 110} width={14} height={110} rx={5} fill="#b99a5e" stroke={LO} strokeWidth={1.8} />
      ))}
      <rect x={x1 - 6} y={y - 80} width={x2 - x1 + 12} height={10} fill="#a58649" stroke={LO} strokeWidth={1.8} />
      <rect x={x1 - 6} y={y - 40} width={x2 - x1 + 12} height={10} fill="#a58649" stroke={LO} strokeWidth={1.8} />
    </g>
  );
};

const Grass: React.FC = () => (
  <g>
    <rect x={0} y={1030} width={1920} height={50} fill={GR2} opacity={0.9} />
    {[...Array(48)].map((_, i) => (
      <path key={i} d={`M${i * 40},1040 Q${i * 40 + 8},${995 - (i % 3) * 12} ${i * 40 + 16},1040 Z`} fill="#4a7a3f" stroke={LO} strokeWidth={1.2} />
    ))}
  </g>
);

const Jack: React.FC<{x: number; y: number; f: number}> = ({x, y, f}) => {
  const sw = Math.sin(f / 40) * 3;
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-34,0 C-30,-200 -40,-300 -24,-380 L24,-380 C40,-300 30,-200 34,0 Z" fill="#6b4a2f" stroke={LO} strokeWidth={3} />
      <g transform={`translate(${sw},0)`}>
        {[
          [0, -440, 150],
          [-130, -380, 108],
          [130, -380, 108],
          [0, -560, 100],
          [-80, -500, 90],
          [90, -500, 90],
        ].map((c, i) => (
          <circle key={i} cx={c[0]} cy={c[1]} r={c[2]} fill={i % 2 ? '#4f8a43' : '#5b9a4c'} stroke={LO} strokeWidth={3} />
        ))}
      </g>
      {[
        [-22, -250],
        [34, -200],
      ].map((c, i) => (
        <g key={i}>
          <ellipse cx={c[0]} cy={c[1]} rx={22} ry={32} fill="#a9b04c" stroke={LO} strokeWidth={2.5} />
          <circle cx={c[0] - 6} cy={c[1] - 6} r={2.5} fill="#7d8433" />
          <circle cx={c[0] + 6} cy={c[1] + 8} r={2.5} fill="#7d8433" />
        </g>
      ))}
    </g>
  );
};

const Birds: React.FC<{f: number}> = ({f}) => (
  <g fill="none" stroke="#333" strokeWidth={3} strokeLinecap="round">
    {[0, 1, 2].map((i) => {
      const x = ((f * 1.6 + i * 260) % 2200) - 150;
      const y = 200 + i * 46 + Math.sin(f / 12 + i) * 12;
      const fl = Math.sin(f / 4 + i) * 8;
      return <path key={i} d={`M${x - 18},${y + fl} Q${x},${y - 12} ${x + 18},${y + fl}`} />;
    })}
  </g>
);

// ---------- লোকেশন ----------
const Road: React.FC<P> = ({tod, f, kids}) => (
  <g>
    <Sky tod={tod} f={f} />
    <path d="M0,690 Q320,600 650,680 T1300,660 T1920,690 L1920,880 L0,880 Z" fill="#9ab77a" stroke={LO} strokeWidth={2} />
    <Banana x={1560} y={880} s={0.9} f={f} />
    <Hut x={150} y={880} w={430} />
    <rect x={0} y={860} width={1920} height={220} fill={SOIL} />
    <path d="M0,930 Q900,900 1920,935 L1920,1010 Q900,985 0,1010 Z" fill={ROAD} />
    <Fence x1={800} x2={1240} y={890} />
    <Birds f={f} />
    {kids}
    <Grass />
  </g>
);

const Stall: React.FC<P> = ({tod, f, kids, v = 0}) => {
  const sx = v ? 1180 : 120;
  const wx = v ? 160 : 1180;
  return (
    <g>
      <rect width={1920} height={1080} fill="#9c7448" />
      {[...Array(16)].map((_, i) => (
        <line key={i} x1={i * 128} y1={0} x2={i * 128} y2={880} stroke={LO} strokeWidth={2} opacity={0.35} />
      ))}
      <rect x={wx} y={150} width={540} height={330} fill={SKY[tod][0]} stroke={LO} strokeWidth={6} />
      <path d={`M${wx},400 Q${wx + 200},340 ${wx + 540},390 L${wx + 540},480 L${wx},480 Z`} fill="#7f9f62" />
      <rect x={wx} y={150} width={540} height={330} fill="none" stroke="#6b4a2f" strokeWidth={14} />
      <line x1={wx + 270} y1={150} x2={wx + 270} y2={480} stroke="#6b4a2f" strokeWidth={10} />
      <rect x={sx} y={250} width={420} height={14} fill="#6b4a2f" stroke={LO} strokeWidth={2} />
      <rect x={sx} y={410} width={420} height={14} fill="#6b4a2f" stroke={LO} strokeWidth={2} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={'a' + i} x={sx + 20 + i * 100} y={190} width={64} height={60} rx={10} fill={['#d98c5f', '#e8d9a0', '#b7d1c8', '#d8b66a'][i]} stroke={LO} strokeWidth={2.5} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={'b' + i} x={sx + 20 + i * 100} y={350} width={64} height={60} rx={10} fill={['#b7d1c8', '#d98c5f', '#d8b66a', '#e8d9a0'][i]} stroke={LO} strokeWidth={2.5} />
      ))}
      <g>
        <rect x={760} y={44} width={400} height={84} rx={10} fill="#2f6f4f" stroke={LO} strokeWidth={4} />
        <text x={960} y={102} textAnchor="middle" fontSize={54} fontWeight={700} fill="#fff" fontFamily={FF}>চা • নাস্তা</text>
      </g>
      <rect x={0} y={860} width={1920} height={220} fill="#a98558" />
      <g transform={`translate(${v ? 260 : 1560},880)`}>
        <path d="M-90,0 Q-80,-120 0,-130 Q80,-120 90,0 Z" fill="#a46a43" stroke={LO} strokeWidth={3} />
        <rect x={-34} y={-190} width={68} height={60} rx={12} fill="#9aa1a5" stroke={LO} strokeWidth={3} />
        <path d="M34,-170 Q70,-170 60,-146" fill="none" stroke={LO} strokeWidth={5} />
        {[0, 1, 2].map((i) => {
          const ph = ((f + i * 20) % 60) / 60;
          return <circle key={i} cx={Math.sin(f / 9 + i) * 10} cy={-200 - ph * 120} r={10 + ph * 10} fill="#fff" opacity={0.6 * (1 - ph)} />;
        })}
      </g>
      {kids}
      <rect x={0} y={0} width={1920} height={30} fill="#c9a85a" stroke={LO} strokeWidth={3} />
      <rect x={v ? 1850 : 30} y={0} width={34} height={1080} fill="#8c6a3a" stroke={LO} strokeWidth={3} />
    </g>
  );
};

const Yard: React.FC<P> = ({tod, f, kids, tx = 1550, plat}) => {
  const hx = plat ? 1150 : tx > 1000 ? 120 : 1040;
  const hy = plat ? 735 : 880;
  return (
    <g>
      <Sky tod={tod} f={f} />
      <path d="M0,690 Q420,620 900,690 T1920,680 L1920,880 L0,880 Z" fill="#8fae70" stroke={LO} strokeWidth={2} />
      {[260, 700, 1300, 1700].map((x, i) => (
        <circle key={i} cx={x} cy={680} r={70 + (i % 2) * 20} fill="#6f9a5a" stroke={LO} strokeWidth={2} />
      ))}
      <rect x={0} y={860} width={1920} height={220} fill={SOIL} />
      <path d="M0,940 Q960,905 1920,945 L1920,1030 L0,1030 Z" fill="#c3a074" />
      {plat ? (
        <g>
          <rect x={1150} y={735} width={770} height={145} fill="#b99a6a" stroke={LO} strokeWidth={3} />
          <rect x={1150} y={735} width={770} height={18} fill="#d4b784" stroke={LO} strokeWidth={3} />
        </g>
      ) : null}
      <Hut x={hx} y={hy} w={plat ? 770 : 600} />
      <Jack x={tx} y={900} f={f} />
      <line x1={hx > 500 ? 200 : 900} y1={560} x2={hx > 500 ? 700 : 1300} y2={580} stroke={LO} strokeWidth={3} />
      <path d={`M${hx > 500 ? 340 : 1040},566 l90,3 l-4,90 l-90,-3 Z`} fill="#f2efe8" stroke={LO} strokeWidth={2} opacity={0.95} transform={`skewX(${Math.sin(f / 30) * 3})`} />
      <g transform={`translate(${hx > 500 ? 520 : 1500},${905})`}>
        <ellipse cx={0} cy={-20} rx={26} ry={20} fill="#a0522d" stroke={LO} strokeWidth={2} />
        <circle cx={22} cy={-38} r={9} fill="#a0522d" stroke={LO} strokeWidth={2} />
        <path d="M30,-38 l9,3 l-9,3 Z" fill="#e8a33d" />
      </g>
      {kids}
      <Grass />
    </g>
  );
};

const Balcony: React.FC<P> = ({tod, f, kids}) => (
  <g>
    <Sky tod={tod} f={f} />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={i * 400 - 40} y={150 + (i % 2) * 70} width={360} height={720} fill={['#2b3550', '#334060', '#283149'][i % 3]} stroke="#10172a" strokeWidth={3} />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={r + '_' + c} x={i * 400 + c * 100} y={200 + (i % 2) * 70 + r * 130} width={56} height={76} fill={(r + c + i) % 3 === 0 ? '#ffd780' : '#4a5878'} />
          )),
        )}
      </g>
    ))}
    <rect x={0} y={780} width={1920} height={300} fill="#8d8f93" stroke={LO} strokeWidth={3} />
    <rect x={0} y={860} width={1920} height={220} fill="#a9aaad" />
    <rect x={0} y={560} width={1920} height={16} fill="#6f7276" stroke={LO} strokeWidth={3} />
    {[...Array(32)].map((_, i) => (
      <rect key={i} x={i * 62 + 10} y={576} width={12} height={204} fill="#7b7e82" stroke={LO} strokeWidth={1.5} />
    ))}
    {kids}
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={((i * 800 + f * 0.8) % 2400) - 200} cy={820 + i * 40} rx={420} ry={50} fill="#fff" opacity={0.16} />
    ))}
    <rect x={0} y={0} width={70} height={1080} fill="#202638" opacity={0.8} />
  </g>
);

const Kitchen: React.FC<P> = ({kids, f}) => (
  <g>
    <rect width={1920} height={1080} fill="#d9e5de" />
    {[...Array(25)].map((_, i) => (
      <line key={'v' + i} x1={i * 80} y1={0} x2={i * 80} y2={860} stroke="#b7c6bd" strokeWidth={2} />
    ))}
    {[...Array(11)].map((_, i) => (
      <line key={'h' + i} x1={0} y1={i * 80} x2={1920} y2={i * 80} stroke="#b7c6bd" strokeWidth={2} />
    ))}
    <rect x={120} y={170} width={620} height={16} fill="#7a7f84" stroke={LO} strokeWidth={2} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={150 + i * 118} y={104} width={80} height={66} rx={10} fill={['#d98c5f', '#e8d9a0', '#b7d1c8', '#d8b66a', '#c98f6b'][i]} stroke={LO} strokeWidth={2.5} />
    ))}
    <rect x={150} y={640} width={780} height={230} fill="#8d9298" stroke={LO} strokeWidth={3} />
    <rect x={150} y={620} width={780} height={26} fill="#b4b9be" stroke={LO} strokeWidth={3} />
    <ellipse cx={420} cy={610} rx={70} ry={12} fill="#444" />
    <path d="M360,610 L360,540 L480,540 L480,610 Z" fill="#9aa1a5" stroke={LO} strokeWidth={3} />
    {[0, 1].map((i) => {
      const ph = ((f + i * 25) % 50) / 50;
      return <circle key={i} cx={420 + Math.sin(f / 8 + i) * 8} cy={520 - ph * 90} r={10 + ph * 12} fill="#fff" opacity={0.6 * (1 - ph)} />;
    })}
    <rect x={1330} y={190} width={330} height={670} fill="#f2e3c0" stroke={LO} strokeWidth={5} />
    <rect x={1350} y={210} width={290} height={650} fill="#e6c98e" opacity={0.55} />
    <rect x={0} y={860} width={1920} height={220} fill="#b8a98f" />
    {kids}
  </g>
);

const Room: React.FC<P> = ({tod, f, kids, v = 0}) => {
  const ctg = v === 0;
  return (
    <g>
      <rect width={1920} height={1080} fill={ctg ? '#e6dcc6' : '#e2e8d4'} />
      <rect x={ctg ? 1080 : 1180} y={150} width={ctg ? 640 : 480} height={ctg ? 470 : 380} fill={SKY[tod][0]} stroke={LO} strokeWidth={6} />
      {ctg ? (
        <g>
          <rect x={1080} y={430} width={640} height={190} fill="#7d8791" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={1100 + i * 160} y={360 + (i % 2) * 40} width={110} height={260 - (i % 2) * 40} fill="#6a747e" stroke={LO} strokeWidth={2} />
          ))}
          <path d="M1080,300 Q1400,360 1720,290" fill="none" stroke="#222" strokeWidth={3} />
          <g transform={`translate(${((f * 1.5) % 900) + 1100},590)`}>
            <circle cx={0} cy={0} r={18} fill="none" stroke="#222" strokeWidth={4} />
            <circle cx={60} cy={0} r={18} fill="none" stroke="#222" strokeWidth={4} />
            <rect x={6} y={-44} width={44} height={30} fill="#d9534f" stroke="#222" strokeWidth={2} />
          </g>
        </g>
      ) : (
        <g>
          <path d="M1180,400 Q1330,330 1420,380 T1660,350 L1660,530 L1180,530 Z" fill="#7fae6a" />
          <rect x={1180} y={470} width={480} height={60} fill="#5f8a4e" />
        </g>
      )}
      <rect x={ctg ? 1080 : 1180} y={150} width={ctg ? 640 : 480} height={ctg ? 470 : 380} fill="none" stroke="#6b4a2f" strokeWidth={16} />
      <line x1={ctg ? 1400 : 1420} y1={150} x2={ctg ? 1400 : 1420} y2={ctg ? 620 : 530} stroke="#6b4a2f" strokeWidth={10} />
      <rect x={0} y={860} width={1920} height={220} fill="#b9a98a" />
      {ctg ? (
        <g>
          <rect x={120} y={620} width={560} height={30} rx={6} fill="#8a6238" stroke={LO} strokeWidth={3} />
          <rect x={130} y={650} width={20} height={240} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
          <rect x={650} y={650} width={20} height={240} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
          <rect x={150} y={590} width={420} height={34} rx={14} fill="#eae6da" stroke={LO} strokeWidth={3} />
          <ellipse cx={200} cy={576} rx={52} ry={20} fill="#fff" stroke={LO} strokeWidth={3} />
        </g>
      ) : (
        <g>
          <rect x={150} y={600} width={520} height={20} fill="#8a6238" stroke={LO} strokeWidth={3} />
          <rect x={170} y={620} width={20} height={270} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
          <rect x={630} y={620} width={20} height={270} fill="#6e4d2c" stroke={LO} strokeWidth={3} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={190 + i * 60} y={520 - i * 8} width={50} height={80 + i * 8} fill={['#4f7fb5', '#d9a441', '#6aa56e'][i]} stroke={LO} strokeWidth={2.5} />
          ))}
          <rect x={800} y={170} width={180} height={220} fill="#fff" stroke={LO} strokeWidth={3} />
          <rect x={800} y={170} width={180} height={50} fill="#d9534f" stroke={LO} strokeWidth={3} />
        </g>
      )}
      {kids}
      <rect x={0} y={0} width={60} height={1080} fill="#8a6a50" opacity={0.7} />
    </g>
  );
};

const NightRoad: React.FC<P> = ({f, kids}) => (
  <g>
    <Sky tod="night" f={f} />
    <path d="M0,720 Q300,640 640,710 T1300,690 T1920,720 L1920,880 L0,880 Z" fill="#26382f" />
    {[220, 640, 1100, 1560].map((x, i) => (
      <circle key={i} cx={x} cy={690} r={80 + (i % 2) * 20} fill="#1d2d27" />
    ))}
    <rect x={0} y={860} width={1920} height={220} fill="#4a4338" />
    <path d="M0,905 L1920,905 L1920,1020 L0,1020 Z" fill="#6a6254" />
    {kids}
    <rect x={0} y={1030} width={1920} height={50} fill="#1d2d27" />
  </g>
);

const Ward: React.FC<P> = ({kids, f}) => (
  <g>
    <rect width={1920} height={1080} fill="#d6e4dc" />
    <rect x={0} y={640} width={1920} height={240} fill="#c3d3ca" />
    <rect x={160} y={150} width={420} height={320} fill="#17233a" stroke={LO} strokeWidth={6} />
    <path d="M180,170 L560,170" stroke="#fff" opacity={0.3} />
    <circle cx={470} cy={240} r={30} fill="#f4efd6" />
    <line x1={370} y1={150} x2={370} y2={470} stroke="#6b4a2f" strokeWidth={8} />
    <circle cx={1450} cy={230} r={60} fill="#fff" stroke={LO} strokeWidth={5} />
    <path d="M1450,230 L1450,190 M1450,230 L1480,246" stroke="#222" strokeWidth={5} />
    <rect x={0} y={880} width={1920} height={200} fill="#b4c0b8" />
    <rect x={700} y={560} width={24} height={324} fill="#9aa1a5" stroke={LO} strokeWidth={3} />
    <rect x={1470} y={640} width={24} height={244} fill="#9aa1a5" stroke={LO} strokeWidth={3} />
    <rect x={700} y={640} width={794} height={34} rx={6} fill="#f4f4f1" stroke={LO} strokeWidth={3} />
    <rect x={680} y={560} width={26} height={118} fill="#9aa1a5" stroke={LO} strokeWidth={3} />
    <ellipse cx={810} cy={626} rx={70} ry={24} fill="#fff" stroke={LO} strokeWidth={3} />
    <g transform={`translate(1580,0)`}>
      <line x1={0} y1={420} x2={0} y2={880} stroke="#7c8389" strokeWidth={8} />
      <rect x={-34} y={430} width={68} height={100} rx={14} fill="#dff0f7" stroke={LO} strokeWidth={3} />
      <line x1={0} y1={530} x2={0} y2={600 + Math.sin(f / 20) * 2} stroke="#8fb0c0" strokeWidth={3} />
    </g>
    {kids}
  </g>
);

const Corridor: React.FC<P> = ({tod, kids}) => (
  <g>
    <rect width={1920} height={1080} fill={tod === 'night' ? '#aab8b2' : '#d8e2da'} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={120 + i * 620} y={150} width={420} height={400} fill={tod === 'night' ? '#16213a' : SKY[tod][0]} stroke={LO} strokeWidth={6} />
        <line x1={330 + i * 620} y1={150} x2={330 + i * 620} y2={550} stroke="#6b6f75" strokeWidth={8} />
        <line x1={120 + i * 620} y1={350} x2={540 + i * 620} y2={350} stroke="#6b6f75" strokeWidth={8} />
      </g>
    ))}
    <rect x={800} y={40} width={320} height={64} rx={8} fill="#2f6f4f" stroke={LO} strokeWidth={4} />
    <text x={960} y={90} textAnchor="middle" fontSize={44} fontWeight={700} fill="#fff" fontFamily={FF}>ওয়ার্ড</text>
    <rect x={0} y={860} width={1920} height={220} fill="#bcc6bf" />
    {[...Array(12)].map((_, i) => (
      <line key={i} x1={i * 180} y1={860} x2={i * 180 - 60} y2={1080} stroke="#a3aea7" strokeWidth={3} />
    ))}
    {kids}
  </g>
);

const HutInt: React.FC<P> = ({f, kids}) => (
  <g>
    <rect width={1920} height={1080} fill="#6a5238" />
    {[...Array(20)].map((_, i) => (
      <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={880} stroke="#3d2e1e" strokeWidth={3} opacity={0.5} />
    ))}
    <rect x={1380} y={180} width={340} height={300} fill="#17233a" stroke={LO} strokeWidth={6} />
    <line x1={1550} y1={180} x2={1550} y2={480} stroke="#3d2e1e" strokeWidth={8} />
    <circle cx={1450} cy={270} r={26} fill="#f4efd6" opacity={0.8} />
    <rect x={0} y={860} width={1920} height={220} fill="#7a6246" />
    <g transform="translate(380,520)">
      <line x1={0} y1={-80} x2={0} y2={-20} stroke="#333" strokeWidth={4} />
      <path d="M-22,-20 L22,-20 L28,40 L-28,40 Z" fill="#cfe3ea" stroke={LO} strokeWidth={3} opacity={0.9} />
      <rect x={-28} y={40} width={56} height={16} fill="#3b3b3b" />
      <circle cx={0} cy={10} r={9} fill="#ffcf5a" />
    </g>
    {kids}
    <defs>
      <radialGradient id="lampg" cx="380" cy="520" r="1000" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffd37a" stopOpacity={0.35 + Math.sin(f / 7) * 0.03} />
        <stop offset="0.35" stopColor="#c9863a" stopOpacity={0.1} />
        <stop offset="1" stopColor="#0a0500" stopOpacity={0.6} />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#lampg)" />
  </g>
);

export const MgBg: React.FC<{c1?: string; c2?: string}> = ({c1 = '#f6edd9', c2 = '#e6d3ab'}) => (
  <g>
    <defs>
      <linearGradient id="mgg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={c1} />
        <stop offset="1" stopColor={c2} />
      </linearGradient>
      <radialGradient id="mgv" cx="0.5" cy="0.5" r="0.75">
        <stop offset="0.55" stopColor="#000" stopOpacity={0} />
        <stop offset="1" stopColor="#000" stopOpacity={0.3} />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#mgg)" />
    <rect width={1920} height={1080} fill="url(#mgv)" />
  </g>
);

export const Bg: React.FC<{
  kind: 'road' | 'stall' | 'yard' | 'balcony' | 'kitchen' | 'room' | 'nightroad' | 'ward' | 'corridor' | 'hutint';
  tod?: Tod;
  tx?: number;
  v?: number;
  plat?: boolean;
  children?: React.ReactNode;
}> = ({kind, tod = 'noon', tx, v = 0, plat, children}) => {
  const f = useCurrentFrame();
  const [tc, to] = TINT[tod];
  const p: P = {tod, f, kids: children, tx, v, plat};
  let body: React.ReactNode = null;
  switch (kind) {
    case 'road': body = <Road {...p} />; break;
    case 'stall': body = <Stall {...p} />; break;
    case 'yard': body = <Yard {...p} />; break;
    case 'balcony': body = <Balcony {...p} />; break;
    case 'kitchen': body = <Kitchen {...p} />; break;
    case 'room': body = <Room {...p} />; break;
    case 'nightroad': body = <NightRoad {...p} />; break;
    case 'ward': body = <Ward {...p} />; break;
    case 'corridor': body = <Corridor {...p} />; break;
    default: body = <HutInt {...p} />;
  }
  return (
    <g>
      {body}
      {kind !== 'hutint' ? <rect width={1920} height={1080} fill={tc} opacity={to} /> : null}
      <defs>
        <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.26} />
        </radialGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#vig)" />
    </g>
  );
};
