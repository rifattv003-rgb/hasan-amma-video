// সিনের শুরুর সময় (সেকেন্ডে)। ভয়েসওভারের সাথে মিলিয়ে এখানে সহজেই বদলানো যাবে।
// একটি সিন শেষ হয় পরের সিন শুরু হওয়ার মুহূর্তে।
export const FPS = 30;
export const AUDIO2_START = 7190; // দ্বিতীয় অডিও (voice2.mp3) শুরুর ফ্রেম (≈ ২৩৯.৬৫ সেকেন্ড)
export const TOTAL = 10849; // মোট ফ্রেম (≈ ৩৬১.৬১ সেকেন্ড)

export const SCENES: {id: string; start: number}[] = [
  {id: 's1a', start: 0},
  {id: 's1b', start: 17},
  {id: 's1c', start: 36},
  {id: 's2a', start: 52},
  {id: 's2b', start: 70},
  {id: 's2d', start: 88},
  {id: 's2c', start: 98},
  {id: 's3a', start: 112},
  {id: 's3b', start: 125},
  {id: 's4a', start: 137},
  {id: 's4b', start: 155},
  {id: 's5', start: 172},
  {id: 's6', start: 194},
  {id: 's7a', start: 212},
  {id: 's7b', start: 226},
  {id: 's7c', start: 235},
  {id: 's8', start: 239.65},
  {id: 's9a', start: 253.65},
  {id: 's9b', start: 261.65},
  {id: 's9c', start: 271.65},
  {id: 's10a', start: 280.65},
  {id: 's10b', start: 290.65},
  {id: 's11', start: 302.65},
  {id: 's12a', start: 317.65},
  {id: 's12b', start: 323.65},
  {id: 's13a', start: 331.65},
  {id: 's13b', start: 337.65},
  {id: 's14a', start: 346.65},
  {id: 's14b', start: 356.15},
];
