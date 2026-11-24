import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Bg, MgBg} from './Backgrounds';
import {Char} from './Char';
import {FF, Icon, PopBox, Scene, usePop} from './Overlays';
import {
  Bench, Chair, Chowki, Cup, GrapeBag, Ghoti, GROUND as G, Gluco, Kantha, Kula, PaanBox, Phone,
  Plate, SchoolBag, Spoon, Strip, Trunk, Van,
} from './Props';

const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const useT = () => useCurrentFrame() / 30;
const inR = (t: number, a: number, b: number) => t >= a && t < b;

// ---------- মোশন গ্রাফিক্সের ছোট উপাদান ----------
const card: React.CSSProperties = {
  background: '#fff',
  border: '6px solid #222',
  borderRadius: 36,
  boxShadow: '10px 12px 0 rgba(0,0,0,.2)',
  fontFamily: FF,
  color: '#222',
};

// ================= দৃশ্য ১ =================
export const S1a: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const vx = interpolate(t, [0, 9], [100, 1000], cl);
  const moving = t < 9;
  return (
    <Scene
      tag="গ্রাম • সকাল"
      svg={
        <Bg kind="road" tod="morning">
          <g transform={`translate(${vx},${G}) scale(1.5)`}>
            <Van moving={moving} />
            <Char who="hasan" x={30} y={-40} s={1} sit pedal={moving ? 14 : 0} arms={[55, 62]} emo={t > 6 ? 'neutral' : 'happy'} />
          </g>
        </Bg>
      }
      notes={[
        {t0: 2.5, t1: 5.5, kind: 'pill', x: 470, y: 250, text: 'হাসান', color: '#4f8a43'},
        {t0: 7.5, t1: 13, kind: 'pin', x: 1180, y: 230, text: 'দিনে ৪–৫০০ টাকা\nকামাই', rot: 3},
      ]}
      caps={[
        {t0: 5.6, t1: 7.4, text: 'গ্রামে *ভ্যান* চালাই'},
        {t0: 13.2, t1: 16.8, text: 'চায়ের দোকানে *বইসা* আছিলাম'},
      ]}
    />
  );
};

export const S1b: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="জব্বার কাকার চায়ের দোকান • দুপুর"
      svg={
        <Bg kind="stall" tod="noon">
          <Bench x={420} w={520} y={722} />
          <Char who="hasan" x={640} y={G} s={1.55} sit arms={[40, 70]} prop={<Cup />} emo="neutral" />
          <Char who="jabbar" x={1320} y={G} s={1.55} flip talk={inR(t, 5, 11.5)} arms={[15, inR(t, 3, 5) ? 100 : 85]} prop={<Cup />} emo="worry" />
        </Bg>
      }
      bubbles={[
        {t0: 4.5, t1: 12.5, x: 820, y: 70, w: 900, who: 'জব্বার কাকা', color: '#6b6f75', text: 'হাসান, তোমার আম্মারে এইবার কার ঘরে পাঠাইলা? বুড়িটা এখন কার ঘাড়ে?', tail: 500},
      ]}
      notes={[{t0: 0.6, t1: 3.2, kind: 'pill', x: 540, y: 330, text: 'জব্বার কাকা', color: '#6b6f75'}]}
      caps={[
        {t0: 3.4, t1: 4.4, text: 'কাকা *চা* আগাইয়া দিলেন'},
        {t0: 13, t1: 16, text: 'প্রশ্নটা *নতুন* না'},
        {t0: 16.2, t1: 18.8, text: 'সবাই এই *এক* কথাই জিগায়'},
      ]}
    />
  );
};

export const S1c: React.FC = () => (
  <Scene
    svg={<MgBg />}
    html={
      <>
        <PopBox at={0.3} style={{left: 140, top: 100}}><Icon n="question" size={190} /></PopBox>
        <PopBox at={1} style={{left: 360, top: 150, width: 1200, ...card, padding: '40px 50px', textAlign: 'center'}}>
          <div style={{fontSize: 112, fontWeight: 700}}>আম্মা এখন কার ঘাড়ে?</div>
        </PopBox>
        {[
          {at: 5, x: 150, n: 'house', c: '#e8a45a', txt: 'চায়ের দোকানে'},
          {at: 8.2, x: 700, n: 'moon', c: '#7fb2d6', txt: 'মসজিদের সামনে'},
          {at: 11, x: 1250, n: 'money', c: '#9bcf8a', txt: 'হাটের পথে'},
        ].map((c) => (
          <PopBox key={c.txt} at={c.at} style={{left: c.x, top: 560, width: 500, ...card, background: c.c, padding: '24px 20px', textAlign: 'center'}}>
            <Icon n={c.n} size={110} />
            <div style={{fontSize: 56, fontWeight: 700, marginTop: 8}}>{c.txt}</div>
          </PopBox>
        ))}
        <PopBox at={13.6} style={{left: 360, top: 880, width: 1200, ...card, padding: '12px 30px', textAlign: 'center', background: '#fff7d6'}}>
          <div style={{fontSize: 50, fontWeight: 700}}>“আম্মা কারও ঘাড়ে না, কাকা।”</div>
        </PopBox>
      </>
    }
  />
);

// ================= দৃশ্য ২ =================
export const S2a: React.FC = () => {
  const cards = [
    {at: 3.5, who: 'বড় ভাই', place: 'ঢাকা', role: 'ব্যবসা', n: 'money', c: '#fff'},
    {at: 6.5, who: 'মেজো ভাই', place: 'চট্টগ্রাম', role: 'চাকরি', n: 'notebook', c: '#fff'},
    {at: 9, who: 'সেজো ভাই', place: 'সিলেট', role: '', n: 'phone', c: '#fff'},
    {at: 12, who: 'হাসান', place: 'গ্রাম', role: 'ভ্যানচালক', n: 'house', c: '#dff2d8'},
  ];
  return (
    <Scene
      svg={<MgBg />}
      html={
        <>
          <PopBox at={0.5} style={{left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: FF, fontSize: 90, fontWeight: 700, color: '#222'}}>
            চার ভাই • চার জায়গা
          </PopBox>
          {cards.map((c, i) => (
            <PopBox key={c.who} at={c.at} style={{left: 90 + i * 450, top: 290, width: 400, ...card, background: c.c, textAlign: 'center', padding: '30px 14px'}}>
              <Icon n={c.n} size={130} />
              <div style={{fontSize: 56, fontWeight: 700, marginTop: 8}}>{c.who}</div>
              <div style={{fontSize: 50, fontWeight: 500, color: '#555'}}>{c.place}</div>
              <div style={{fontSize: 44, fontWeight: 500, color: '#888', minHeight: 56}}>{c.role}</div>
            </PopBox>
          ))}
          <PopBox at={14.5} style={{left: 360, top: 800, width: 1200, ...card, padding: '18px 30px', textAlign: 'center', background: '#fff7d6'}}>
            <div style={{fontSize: 52, fontWeight: 700}}>আব্বার ভিটা • কাঁঠাল গাছের ছায়া</div>
          </PopBox>
        </>
      }
    />
  );
};

export const S2b: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="উঠান • সকাল"
      svg={
        <Bg kind="yard" tod="morning" tx={560} plat>
          <Char who="boro" x={820} y={G} s={1.55} talk={inR(t, 5, 15)} arms={[10, inR(t, 7, 9) ? 60 : 20]} emo="neutral" />
          <Char who="amma" x={1290} y={G} s={1.55} flip sit arms={[60, 62]} prop={<Kula />} emo="sad" />
        </Bg>
      }
      bubbles={[
        {t0: 4.5, t1: 15.5, x: 300, y: 60, w: 880, who: 'বড় ভাই', color: '#3b6ea5', text: 'আম্মা একা থাকবে না। তিন মাস কইরা এক এক ভাইয়ের বাসায় থাকবে। বছরে চাইর ঘর, চাইর ভাগ। সবাই সমান।', tail: 520, fs: 44},
      ]}
      caps={[
        {t0: 0.5, t1: 3.6, text: 'চল্লিশার *পরদিন* উঠানে'},
        {t0: 15.8, t1: 17.8, text: 'কেউ *আপত্তি* করল না'},
      ]}
    />
  );
};

export const S2d: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene
      tag="বারান্দা • মেঘলা দিন"
      zoom={0.00022}
      svg={
        <Bg kind="yard" tod="overcast" tx={560} plat>
          <Char who="amma" x={1250} y={1010} s={2.2} flip sit arms={[58, 60 + Math.sin(f / 5) * 6]} prop={<Kula />} emo="sad" />
        </Bg>
      }
      caps={[
        {t0: 0.6, t1: 3.5, text: 'আম্মা *কিছু* কইলেন না'},
        {t0: 3.8, t1: 6.8, text: 'আঙুল দিয়া কুলার *কিনারা* ঘষতে থাকলেন'},
        {t0: 7.2, t1: 9.6, text: 'আমার ভাগে *অক্টোবর*'},
      ]}
    />
  );
};

const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1} Z`;
};

const Quarter: React.FC<{i: number; at: number; label: string}> = ({i, at, label}) => {
  const k = usePop(at);
  const cx = 480;
  const cy = 540;
  const a0 = -90 + i * 90;
  const mid = ((a0 + 45) * Math.PI) / 180;
  const col = ['#e8a45a', '#7fb2d6', '#9bcf8a', '#e07a5f'][i];
  return (
    <g transform={`translate(${cx},${cy}) scale(${0.4 + 0.6 * k}) translate(${-cx},${-cy})`} opacity={Math.min(1, k * 1.6)}>
      <path d={arcPath(cx, cy, 300, a0, a0 + 90)} fill={col} stroke="#222" strokeWidth={6} />
      <text x={cx + 190 * Math.cos(mid)} y={cy + 190 * Math.sin(mid) + 14} textAnchor="middle" fontSize={44} fontWeight={700} fill="#222" fontFamily={FF}>
        {label}
      </text>
    </g>
  );
};

export const S2c: React.FC = () => {
  const rows = [
    {at: 1, txt: 'জানু–মার্চ  →  বড় ভাই (ঢাকা)'},
    {at: 3, txt: 'এপ্রিল–জুন  →  মেজো ভাই (চট্টগ্রাম)'},
    {at: 5, txt: 'জুলাই–সেপ্টেম্বর  →  সেজো ভাই (সিলেট)'},
    {at: 7, txt: 'অক্টোবর–ডিসেম্বর  →  হাসান (গ্রাম)'},
  ];
  return (
    <Scene
      svg={
        <g>
          <MgBg />
          <Quarter i={0} at={1} label="ঢাকা" />
          <Quarter i={1} at={3} label="চট্টগ্রাম" />
          <Quarter i={2} at={5} label="সিলেট" />
          <Quarter i={3} at={7} label="গ্রাম" />
          <circle cx={480} cy={540} r={86} fill="#fff" stroke="#222" strokeWidth={6} />
          <text x={480} y={556} textAnchor="middle" fontSize={44} fontWeight={700} fill="#222" fontFamily={FF}>১ বছর</text>
        </g>
      }
      html={
        <>
          {rows.map((r, i) => (
            <PopBox key={i} at={r.at} style={{left: 900, top: 150 + i * 130, width: 940, ...card, padding: '18px 28px', background: i === 3 ? '#dff2d8' : '#fff'}}>
              <div style={{fontSize: 46, fontWeight: 700}}>{r.txt}</div>
            </PopBox>
          ))}
          <PopBox at={9.5} style={{left: 900, top: 720, width: 940, ...card, padding: '20px 30px', background: '#fff7d6'}}>
            <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.35}}>সমান ভাগ — শুধু একজনকে কেউ জিজ্ঞেস করেনি, সে কোথায় থাকতে চায়।</div>
          </PopBox>
        </>
      }
    />
  );
};

// ================= দৃশ্য ৩ =================
export const S3a: React.FC = () => (
  <Scene
    tag="আব্বার ভিটা • জানুয়ারির ভোর"
    svg={
      <Bg kind="yard" tod="morning" tx={1550}>
        <Trunk x={960} y={G + 4} s={1.3} />
        <Char who="hasan" x={650} y={G} s={1.55} arms={[25, 55]} emo="sad" />
        <Char who="amma" x={1250} y={G} s={1.55} flip arms={[20, 50]} prop={<PaanBox />} emo="neutral" />
      </Bg>
    }
    notes={[{t0: 7.5, t1: 12, kind: 'pin', x: 700, y: 120, text: 'আব্বার পুরোনো গামছাও\nট্রাঙ্কে ঢুকাইলেন', rot: -3}]}
    caps={[
      {t0: 0.6, t1: 4.2, text: 'টিনের *ট্রাঙ্ক*, কাঁথা, *পানের বাটা*'},
      {t0: 4.6, t1: 7.2, text: 'কেউ দেখে নাই, *আমি* দেখছি'},
    ]}
  />
);

export const S3b: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  if (t < 7.8) {
    return (
      <Scene
        tag="কাঁঠাল গাছের গোড়া"
        svg={
          <Bg kind="yard" tod="overcast" tx={1300}>
            <Char who="hasan" x={620} y={G} s={1.55} emo="sad" tilt={10} arms={[5, 5]} />
            <Char who="amma" x={1130} y={G} s={1.55} talk={inR(t, 1, 4.5)} arms={[10, 78]} emo="sad" />
          </Bg>
        }
        bubbles={[{t0: 1, t1: 5, x: 760, y: 140, w: 700, who: 'আম্মা', color: '#8a5a3b', text: 'খোকা, গাছটায় পানি দিস।', tail: 330}]}
        caps={[{t0: 5.4, t1: 7.6, text: 'আমি *মাথা* নাড়লাম'}]}
      />
    );
  }
  return (
    <Scene
      svg={
        <Bg kind="road" tod="morning">
          <g transform={`translate(${interpolate(t, [7.8, 12], [700, 2100], cl)},${G}) scale(1.5)`}>
            <Van />
            <Char who="amma" x={-190} y={30} s={1} sit arms={[10, 20]} emo="sad" />
            <Char who="hasan" x={30} y={-40} s={1} sit pedal={14} arms={[55, 62]} emo="sad" />
          </g>
        </Bg>
      }
      caps={[{t0: 8.2, t1: 11.8, text: 'আম্মা একবারও *পিছনে* তাকাইলেন না'}]}
    />
  );
};

// ================= দৃশ্য ৪ =================
export const S4a: React.FC = () => (
  <Scene
    tag="ঢাকা • জানুয়ারি–মার্চ"
    svg={
      <Bg kind="balcony" tod="night">
        <Chowki x={560} w={820} y={740} />
        <Char who="amma" x={900} y={716 + 22} s={1.5} lying emo="sad" arms={[3, 3]} />
        <Kantha x={850} y={632} w={500} h={108} />
        <Icon_Fog />
      </Bg>
    }
    notes={[{t0: 3.5, t1: 8.5, kind: 'pin', x: 1180, y: 190, text: 'ঘরে আম্মার জন্য\nআলাদা ঘর ছিল না', rot: 3}]}
    caps={[
      {t0: 0.6, t1: 3.3, text: 'প্রথম তিন মাস *ঢাকায়*'},
      {t0: 9, t1: 12.5, text: 'বারান্দায় একটা *চৌকি* পাতা'},
      {t0: 13, t1: 17.5, text: 'শীতের রাইতে *কুয়াশা* জমত'},
    ]}
  />
);
const Icon_Fog: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {[0, 1].map((i) => (
        <ellipse key={i} cx={((i * 1000 + f * 1.2) % 2600) - 300} cy={700 + i * 60} rx={380} ry={40} fill="#fff" opacity={0.18} />
      ))}
    </g>
  );
};

export const S4b: React.FC = () => {
  const t = useT();
  const spoonArm = t < 12 ? 70 : 15;
  return (
    <Scene
      tag="ফ্ল্যাটের রান্নাঘর"
      svg={
        <Bg kind="kitchen" tod="noon">
          <Char who="amma" x={620} y={G} s={1.55} arms={[10, spoonArm]} prop={<Spoon />} emo="sad" tilt={t > 12 ? 10 : 0} />
          <Char who="bhabi" x={1480} y={G} s={1.55} flip talk={inR(t, 6.5, 12)} arms={[10, 25]} emo="neutral" />
        </Bg>
      }
      bubbles={[
        {t0: 6, t1: 12.3, x: 880, y: 70, w: 840, who: 'ভাবি', color: '#8a4d8f', text: 'আম্মা, আপনি বসেন। আপনার হাতের মশলায় আমার ছেলেমেয়ে অভ্যস্ত না।', tail: 560, fs: 44},
      ]}
      notes={[{t0: 14.2, t1: 17, kind: 'sms', x: 1120, y: 280, text: 'ফোনে আম্মা: “ভালো আছি রে খোকা।”'}]}
      caps={[
        {t0: 0.6, t1: 3.8, text: 'আম্মা *ডাল* চড়াইতে গেছিলেন'},
        {t0: 12.6, t1: 14, text: 'আম্মা *চামচ* নামাইলেন'},
      ]}
    />
  );
};

// ================= দৃশ্য ৫ =================
export const S5: React.FC = () => {
  const t = useT();
  const stripPop = usePop(14.5);
  const tod = t < 11 ? 'noon' : 'dusk';
  return (
    <Scene
      tag="চট্টগ্রাম • এপ্রিল–জুন"
      svg={
        <Bg kind="room" tod={tod} v={0}>
          <Chair x={1000} y={705} />
          <Char who="amma" x={1000} y={G} s={1.5} sit emo="sad" arms={[15, 20]} />
          {t > 14.5 ? (
            <g transform="translate(290,590) scale(1.1)">
              <g transform={`scale(${stripPop})`}>
                <Strip />
              </g>
            </g>
          ) : null}
        </Bg>
      }
      notes={[
        {t0: 9, t1: 13, kind: 'sms', x: 160, y: 190, text: 'নাতি-নাতনি: “দাদু, পরে।”', fs: 42},
        {t0: 15, t1: 21, kind: 'stamp', x: 120, y: 260, text: 'ওষুধ কবে শেষ —\nকেউ মনে করাইত না', rot: -5, fs: 40},
      ]}
      caps={[
        {t0: 0.6, t1: 4, text: 'এখানে *ঘর* ছিল, কিন্তু ফাঁকা'},
        {t0: 4.4, t1: 8.6, text: 'জানালার পাশে *বইসা* থাকতেন'},
        {t0: 13.4, t1: 14.8, text: '*পরে* আর আসত না'},
      ]}
    />
  );
};

// ================= দৃশ্য ৬ =================
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene
      tag="সিলেট • জুলাই–সেপ্টেম্বর"
      svg={
        <Bg kind="room" tod="noon" v={1}>
          <g transform="translate(560,560)">
            <g transform="scale(1.3)"><SchoolBag /></g>
          </g>
          <Char who="amma" x={900} y={G} s={1.5} flip arms={[40 + Math.sin(f / 6) * 10, 70 + Math.sin(f / 8) * 12]} emo="neutral" />
        </Bg>
      }
      notes={[{t0: 11.5, t1: 17.5, kind: 'stamp', x: 1040, y: 640, text: 'ওষুধের কথা\nকেউ তোলেনি', rot: -5, fs: 42}]}
      caps={[
        {t0: 0.6, t1: 4.6, text: 'সকালে *নাতিরে* খাওয়াইতেন'},
        {t0: 5, t1: 8.6, text: 'ওই বাড়িতে আম্মা *কামের মানুষ*'},
        {t0: 9, t1: 11.3, text: 'স্কুলব্যাগ *নিজের হাতে* গুছাইতেন'},
      ]}
    />
  );
};

// ================= দৃশ্য ৭ =================
export const S7a: React.FC = () => {
  const t = useT();
  const walking = t < 7;
  const ax = interpolate(t, [0.5, 7], [250, 1290], cl);
  const hx = interpolate(t, [0.5, 7], [-100, 800], cl);
  return (
    <Scene
      tag="অক্টোবর • বিকাল"
      svg={
        <Bg kind="yard" tod="dusk" tx={1480}>
          <Char who="hasan" x={hx} y={G} s={1.55} walk={walking} spd={0.6} arms={walking ? undefined : [5, 5]} prop={<Phone />} emo="neutral" />
          <Char who="amma" x={ax} y={G} s={1.55} walk={walking} spd={0.55} arms={walking ? undefined : [10, 80]} emo={walking ? 'neutral' : 'happy'} />
        </Bg>
      }
      caps={[
        {t0: 0.6, t1: 3.6, text: 'ট্রাঙ্কটা আগের চাইতে *হালকা*'},
        {t0: 3.8, t1: 6.8, text: 'আগে গেলেন *কাঁঠাল গাছের* কাছে'},
        {t0: 7.2, t1: 10.5, text: 'পাতাগুলা *সবুজ*, মাটি *ভেজা*'},
        {t0: 10.8, t1: 13.5, text: 'আঙুল দিয়া একটা পাতা *ছুঁইলেন*'},
      ]}
    />
  );
};

export const S7b: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="ঘরের ভেতর • রাত"
      svg={
        <Bg kind="hutint">
          <Chowki x={780} w={720} y={735} />
          <Char who="amma" x={1100} y={G} s={1.5} sit talk={t > 5.5} arms={[40, 70]} prop={t < 4.5 ? <Plate /> : undefined} emo="happy" />
          {t < 4.5 ? (
            <Char who="bou" x={560} y={G} s={1.5} arms={[15, 60]} emo="neutral" />
          ) : (
            <Char who="hasan" x={1380} y={G} s={1.5} flip sit emo="happy" arms={[5, 10]} />
          )}
        </Bg>
      }
      caps={[
        {t0: 0.4, t1: 2.2, text: 'আম্মার জন্য *ভাত* বাড়ল'},
        {t0: 2.4, t1: 4.4, text: 'অনেকদিন পর *পুরা থালা*'},
        {t0: 4.8, t1: 8.8, text: 'রাইতে *আব্বার গল্প* কইতেন'},
      ]}
    />
  );
};

export const S7c: React.FC = () => (
  <Scene
    shake={2}
    svg={
      <Bg kind="hutint">
        <Chowki x={780} w={700} y={735} />
        <Char who="amma" x={1090} y={742} s={1.4} lying emo="sad" sweat shake={1.5} arms={[3, 3]} />
        <Char who="hasan" x={1660} y={G} s={1.55} flip emo="worry" arms={[20, 60]} />
      </Bg>
    }
    caps={[{t0: 0.4, t1: 4.4, text: 'কপাল *ঘামে ভিজা*, কথা *জড়াইয়া* যাইতেছে'}]}
  />
);

// ================= দৃশ্য ৮ =================
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const bump = Math.abs(Math.sin(f * 0.45)) * 7;
  return (
    <Scene
      tag="উপজেলা হাসপাতালের পথ • রাত"
      shake={3}
      svg={
        <Bg kind="nightroad">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx={((i * 480 - f * 16) % 2900 + 2900) % 2900 - 300} cy={960} rx={80} ry={14} fill="#2e2a22" />
          ))}
          <g transform={`translate(760,${G - bump}) scale(1.5)`}>
            <Van />
            <Char who="amma" x={-170} y={-115} s={0.95} lying emo="sad" arms={[3, 3]} />
            <Kantha x={-250} y={-166} w={170} h={46} />
            <Char who="hasan" x={30} y={-40} s={1} sit pedal={20} arms={[55, 62]} emo="angry" sweat shake={1} />
          </g>
        </Bg>
      }
      notes={[
        {t0: 0.8, t1: 5.5, kind: 'pin', x: 1250, y: 150, text: 'উপজেলা হাসপাতাল\n৭ কিলোমিটার', rot: 3},
        {t0: 9.6, t1: 13.5, kind: 'stamp', x: 160, y: 190, text: 'জীবনে এত জোরে\nভ্যান চালাই নাই', rot: -4, fs: 40},
      ]}
      caps={[
        {t0: 5.8, t1: 9.2, text: 'প্রত্যেক *গর্তে* ভ্যান লাফাইত'},
      ]}
    />
  );
};

// ================= দৃশ্য ৯ =================
export const S9a: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="উপজেলা হাসপাতাল • রাত"
      zoom={0.00025}
      svg={
        <Bg kind="ward" tod="night">
          <Char who="amma" x={1190} y={656} s={1.4} lying emo="sad" arms={[3, 3]} />
          <Char who="doctor" x={1700} y={G} s={1.55} flip arms={[15, 55]} prop={<Gluco />} emo={t > 3 ? 'worry' : 'neutral'} />
        </Bg>
      }
      notes={[{t0: 4, t1: 7.6, kind: 'stamp', x: 200, y: 700, text: 'সংখ্যাটা\nভালো না', rot: -5, fs: 44}]}
      caps={[{t0: 0.4, t1: 3.8, text: 'ডাক্তার *সুগার* মাপলেন'}]}
    />
  );
};

export const S9b: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="হাসপাতালের বারান্দা"
      svg={
        <Bg kind="corridor" tod="night">
          <Char who="hasan" x={620} y={G} s={1.55} arms={[10, 85]} prop={<Strip />} emo="worry" />
          <Char who="doctor" x={1300} y={G} s={1.55} flip talk={inR(t, 3, 9)} arms={[10, 25]} emo="neutral" />
        </Bg>
      }
      bubbles={[
        {t0: 2.6, t1: 9.6, x: 820, y: 130, w: 900, who: 'ডাক্তার', color: '#5f93cc', text: 'ছয় মাস ধইরা এই ওষুধ প্রায় খাওয়ান নাই, তাই না? এইবার বাঁচছেন, ভাগ্যে।', tail: 480, fs: 44},
      ]}
      caps={[{t0: 0.4, t1: 2.4, text: 'ওষুধের *পাতা* আইনা দিলাম'}]}
    />
  );
};

export const S9c: React.FC = () => (
  <Scene
    svg={<MgBg c1="#e5eef2" c2="#c9dbe3" />}
    html={
      <>
        <PopBox at={0.3} style={{left: 360, top: 80}}><Icon n="pill" size={220} /></PopBox>
        <PopBox at={1.2} style={{left: 640, top: 70}}><Icon n="calendar" size={240} /></PopBox>
        <PopBox at={1.6} style={{left: 940, top: 130, ...card, padding: '14px 30px', background: '#fff7d6'}}>
          <div style={{fontSize: 50, fontWeight: 700}}>পাতার কোণে তারিখ: মার্চ</div>
        </PopBox>
        {[
          {at: 2.6, x: 160, t: 'ঢাকা'},
          {at: 3.4, x: 620, t: 'চট্টগ্রাম'},
          {at: 4.2, x: 1080, t: 'সিলেট'},
          {at: 5, x: 1540, t: 'গ্রাম'},
        ].map((h) => (
          <PopBox key={h.t} at={h.at} style={{left: h.x, top: 460, width: 230, textAlign: 'center', fontFamily: FF}}>
            <Icon n="question" size={90} />
            <Icon n="house" size={170} />
            <div style={{fontSize: 48, fontWeight: 700, color: '#222'}}>{h.t}</div>
          </PopBox>
        ))}
        <PopBox at={6.2} style={{left: 360, top: 860, width: 1200, textAlign: 'center'}}>
          <div style={{display: 'inline-block', border: '8px solid #c0392b', color: '#c0392b', background: 'rgba(255,255,255,.9)', padding: '10px 36px', borderRadius: 16, fontFamily: FF, fontSize: 56, fontWeight: 700, transform: 'rotate(-3deg)'}}>
            সবাই ভাবল — আরেকজন দেখবে
          </div>
        </PopBox>
      </>
    }
  />
);

// ================= দৃশ্য ১০ =================
export const S10a: React.FC = () => {
  const t = useT();
  const clockPop = usePop(0.6);
  return (
    <Scene
      tag="হাসপাতালের করিডোর"
      svg={
        <Bg kind="corridor" tod="night">
          <Char who="hasan" x={560} y={G} s={1.55} arms={[10, 140]} prop={<Phone />} talk={inR(t, 1, 3.5)} emo="worry" />
          {inR(t, 0.4, 9.8) ? (
            <g transform="translate(900,420)">
              <g transform={`scale(${clockPop})`}><Icon_Clock /></g>
            </g>
          ) : null}
        </Bg>
      }
      notes={[
        {t0: 3.6, t1: 9.8, kind: 'sms', x: 1060, y: 520, text: 'বড় ভাই: “সকালে দেখি।”', fs: 42},
        {t0: 5.4, t1: 9.8, kind: 'sms', x: 1060, y: 650, text: 'মেজো ভাই: বিকাশে টাকা পাঠালেন', fs: 42},
        {t0: 7.2, t1: 9.8, kind: 'sms', x: 1060, y: 780, text: 'সেজো ভাই: ফোন বন্ধ', fs: 42},
      ]}
      caps={[{t0: 0.4, t1: 3.4, text: 'রাত *তিনটায়* ভাইগো ফোন দিলাম'}]}
    />
  );
};
const Icon_Clock: React.FC = () => (
  <g>
    <circle r={80} fill="#fff" stroke="#222" strokeWidth={5} />
    <path d="M0,-50 L0,0 L-32,18" fill="none" stroke="#222" strokeWidth={6} strokeLinecap="round" />
    <text y={125} textAnchor="middle" fontSize={44} fontWeight={700} fill="#fff" fontFamily={FF}>রাত ৩:০০</text>
  </g>
);

export const S10b: React.FC = () => (
  <Scene
    svg={<MgBg c1="#2a3340" c2="#171d26" />}
    html={
      <>
        {[
          {at: 0.8, x: 100, t1: 'বিল', t2: '১২,৫০০ টাকা', c: '#fff'},
          {at: 3, x: 700, t1: 'জমানো', t2: '২,০০০ টাকা', c: '#fff'},
          {at: 5.5, x: 1300, t1: 'বাকি', t2: '১০,৫০০ টাকা', c: '#ffd6d0'},
        ].map((b) => (
          <PopBox key={b.t1} at={b.at} style={{left: b.x, top: 160, width: 520, ...card, background: b.c, textAlign: 'center', padding: '30px 10px'}}>
            <div style={{fontSize: 48, fontWeight: 500, color: '#666'}}>{b.t1}</div>
            <div style={{fontSize: 66, fontWeight: 700}}>{b.t2}</div>
          </PopBox>
        ))}
        <PopBox at={3} style={{left: 622, top: 200, fontFamily: FF, fontSize: 110, fontWeight: 700, color: '#fff'}}>−</PopBox>
        <PopBox at={5.5} style={{left: 1222, top: 200, fontFamily: FF, fontSize: 110, fontWeight: 700, color: '#fff'}}>=</PopBox>
        <PopBox at={8} style={{left: 360, top: 560, width: 1200, ...card, padding: '30px 40px', background: '#fff7d6', textAlign: 'center'}}>
          <Icon n="earring" size={150} />
          <div style={{fontSize: 58, fontWeight: 700, marginTop: 6}}>বাকিটা বউয়ের কানের দুল বন্ধক</div>
          <div style={{fontSize: 44, fontWeight: 500, color: '#666'}}>তার মুখে একটা কথাও ছিল না</div>
        </PopBox>
      </>
    }
  />
);

// ================= দৃশ্য ১১ =================
export const S11: React.FC = () => {
  const t = useT();
  const calc = t >= 5.5 && t < 11.5;
  return (
    <Scene
      tag="তৃতীয় দিন • বিকাল"
      svg={
        <Bg kind="corridor" tod="dusk">
          <Char who="boro" x={560} y={G} s={1.55} talk={inR(t, 1.2, 3.8)} arms={calc ? [20, 100] : [20, 70]} prop={calc ? <Phone /> : <GrapeBag />} emo="neutral" />
          <Char who="hasan" x={1330} y={G} s={1.55} flip emo="sad" tilt={8} arms={[5, 5]} />
        </Bg>
      }
      bubbles={[{t0: 1, t1: 4, x: 360, y: 150, w: 520, who: 'বড় ভাই', color: '#3b6ea5', text: 'খরচ কত গেছে?', tail: 200, fs: 54}]}
      notes={[{t0: 6.5, t1: 12, kind: 'stamp', x: 1200, y: 220, text: 'খরচ ÷ ৪', rot: -5, fs: 70}]}
      caps={[
        {t0: 4.2, t1: 5.8, text: 'আমি *সংখ্যাটা* কইলাম'},
        {t0: 12.4, t1: 14.8, text: 'পেছন থেইকা *আম্মার গলা* আসল'},
      ]}
    />
  );
};

// ================= দৃশ্য ১২ =================
export const S12a: React.FC = () => {
  const t = useT();
  return (
    <Scene
      tag="ওয়ার্ডের ভেতর"
      zoom={0.0003}
      svg={
        <Bg kind="ward" tod="dusk">
          <Char who="amma" x={1150} y={640} s={1.5} lying talk={inR(t, 0.6, 5.4)} emo="sad" arms={[3, 3]} />
        </Bg>
      }
      bubbles={[{t0: 0.5, t1: 5.8, x: 700, y: 330, w: 760, who: 'আম্মা', color: '#8a5a3b', text: 'আমারে আর পালা কইরা রাখিস না। আমার ঘরে নিয়া যা।', tail: 300}]}
    />
  );
};

export const S12b: React.FC = () => (
  <Scene
    tag="ওয়ার্ড • সন্ধ্যা"
    svg={
      <Bg kind="ward" tod="dusk">
        <Chair x={560} y={705} />
        <Char who="boro" x={560} y={G} s={1.55} sit emo="sad" tilt={8} arms={[20, 80]} />
        <Char who="amma" x={1150} y={640} s={1.4} lying emo="sad" arms={[3, 3]} />
      </Bg>
    }
    caps={[
      {t0: 0.4, t1: 3, text: 'বড় ভাই *ফোনটা* পকেটে রাখলেন'},
      {t0: 3.4, t1: 5.6, text: 'আম্মার *হাতটা* ধইরা বইসা রইলেন'},
      {t0: 5.8, t1: 7.8, text: 'ওষুধের পাতার মতোই *পাতলা*'},
    ]}
  />
);

// ================= দৃশ্য ১৩ =================
export const S13a: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene
      tag="আব্বার ভিটা • সকাল"
      svg={
        <Bg kind="yard" tod="morning" tx={1050}>
          <Char who="amma" x={760} y={G} s={1.55} arms={[10, 75]} prop={<Ghoti f={f} />} emo="happy" />
        </Bg>
      }
      caps={[
        {t0: 0.4, t1: 3, text: 'এখন আম্মা *ভিটাতেই* থাকেন'},
        {t0: 3.2, t1: 5.8, text: 'আম্মা আর *কোথাও* যান না'},
      ]}
    />
  );
};

export const S13b: React.FC = () => {
  const f = useCurrentFrame();
  const pct = interpolate(f / 30, [6, 8.5], [0, 88], cl);
  const rows = [
    {at: 0.8, t: 'মাসে একবার একজন ভাই আসে'},
    {at: 2.6, t: 'এক সপ্তাহ আম্মার কাছে থাকে'},
    {at: 4.4, t: 'খাতায় তারিখ ও ওষুধ লেখে'},
  ];
  return (
    <Scene
      svg={<MgBg />}
      html={
        <>
          {rows.map((r) => (
            <PopBox key={r.t} at={r.at} style={{left: 100, top: 130 + rows.indexOf(r) * 190, width: 980, ...card, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 24}}>
              <Icon n="check" size={90} />
              <div style={{fontSize: 54, fontWeight: 700}}>{r.t}</div>
            </PopBox>
          ))}
          <PopBox at={1} style={{left: 1230, top: 110}}><Icon n="notebook" size={430} /></PopBox>
          <PopBox at={6} style={{left: 100, top: 760, width: 1720, ...card, padding: '22px 36px'}}>
            <div style={{fontSize: 48, fontWeight: 700, marginBottom: 12}}>খাতার পাতা প্রায় ভরে এসেছে</div>
            <div style={{height: 46, background: '#e6dfcf', borderRadius: 23, border: '4px solid #222', overflow: 'hidden'}}>
              <div style={{width: `${pct}%`, height: '100%', background: '#6cc070'}} />
            </div>
          </PopBox>
        </>
      }
    />
  );
};

// ================= দৃশ্য ১৪ =================
export const S14a: React.FC = () => {
  const t = useT();
  const sip = inR(t, 3.3, 4.6);
  return (
    <Scene
      tag="চায়ের দোকান • আরেক দিন"
      svg={
        <Bg kind="stall" tod="dusk" v={1}>
          <Bench x={1000} w={520} y={722} />
          <Char who="jabbar" x={560} y={G} s={1.55} talk={inR(t, 0.5, 3)} arms={[10, 25]} emo="neutral" />
          <Char who="hasan" x={1220} y={G} s={1.55} flip sit talk={inR(t, 4.6, 9)} arms={[40, sip ? 110 : 70]} prop={<Cup />} emo="happy" />
        </Bg>
      }
      bubbles={[
        {t0: 0.4, t1: 3.2, x: 260, y: 130, w: 640, who: 'জব্বার কাকা', color: '#6b6f75', text: 'হাসান, বুড়িটা এখন কার ঘাড়ে?', tail: 300, fs: 46},
        {t0: 4.4, t1: 9.4, x: 640, y: 60, w: 1100, who: 'হাসান', color: '#4f8a43', text: 'আম্মা কারও ভাগে ছিলেন না, কাকা। বরং বছরে চাইরবার আমরা চার ভাই আম্মার ভাগে পড়ি।', tail: 820, fs: 44},
      ]}
      caps={[{t0: 3.2, t1: 4.4, text: 'আমি চায়ে *চুমুক* দিলাম'}]}
    />
  );
};

export const S14b: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene
      svg={<MgBg c1="#2a3340" c2="#171d26" />}
      html={
        <>
          <PopBox at={0.3} style={{left: 260, top: 130, width: 1400, ...card, padding: '40px 50px', textAlign: 'center'}}>
            <div style={{fontSize: 74, fontWeight: 700, lineHeight: 1.35}}>আপনার পরিবারেও কি এমন মা বা বাবা আছেন, যাকে সবাই ভাগ করে দেখে?</div>
          </PopBox>
          <PopBox at={3} style={{left: 560, top: 700, width: 800, ...card, padding: '20px 30px', textAlign: 'center', background: '#ffd23f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, transform: `translateY(${Math.sin(f / 6) * 6}px)`}}>
            <Icon n="comment" size={110} />
            <div style={{fontSize: 70, fontWeight: 700}}>কমেন্টে লেখেন</div>
          </PopBox>
        </>
      }
    />
  );
};
