export const convertADToBS = (adDate: Date): string => {
  // Logic to convert AD date to BS date
  // Placeholder for actual conversion logic
  return "BS Date"; // Replace with actual BS date
};

export const convertBSToAD = (bsDate: string): Date => {
  // Logic to convert BS date to AD date
  // Placeholder for actual conversion logic
  return new Date(); // Replace with actual AD date
};

export const calculateAge = (dob: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
};

// Nepali Unicode mapping for common characters
export const nepaliUnicodeMap = {
  a: "अ",
  aa: "आ",
  i: "इ",
  ii: "ई",
  u: "उ",
  uu: "ऊ",
  e: "ए",
  ai: "ऐ",
  o: "ओ",
  au: "औ",
  ka: "क",
  kha: "ख",
  ga: "ग",
  gha: "घ",
  nga: "ङ",
  cha: "च",
  chha: "छ",
  ja: "ज",
  jha: "झ",
  nya: "ञ",
  ta: "ट",
  tha: "ठ",
  da: "ड",
  dha: "ढ",
  na: "ण",
  pa: "प",
  pha: "फ",
  ba: "ब",
  bha: "भ",
  ma: "म",
  ya: "य",
  ra: "र",
  la: "ल",
  wa: "व",
  sha: "श",
  shha: "ष",
  sa: "स",
  ha: "ह",
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
};

// BS/AD Date conversion utilities (simplified)
export const BStoAD = (bsYear: number, bsMonth: number, bsDay: number) => {
  // Simplified conversion - in real app, use proper conversion library
  const adYear = bsYear - 57;
  return new Date(adYear, bsMonth - 1, bsDay);
};

export const ADtoBS = (adDate: Date) => {
  // Simplified conversion
  const bsYear = adDate.getFullYear() + 57;
  const bsMonth = adDate.getMonth() + 1;
  const bsDay = adDate.getDate();
  return { year: bsYear, month: bsMonth, day: bsDay };
};
