import React from "react";

const transliterationMap: Record<string, string> = {
  a: "अ",
  b: "ब",
  c: "च",
  d: "द",
  e: "ए",
  f: "फ",
  g: "ग",
  h: "ह",
  i: "इ",
  j: "ज",
  k: "क",
  l: "ल",
  m: "म",
  n: "न",
  o: "ओ",
  p: "प",
  q: "क्व",
  r: "र",
  s: "स",
  t: "त",
  u: "उ",
  v: "व",
  w: "व",
  x: "क्स",
  y: "य",
  z: "ज",
  // Add more mappings for better accuracy
};

function convertToNepali(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => transliterationMap[char] ?? char)
    .join("");
}

export function NepaliUnicodeInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const converted = convertToNepali(inputValue);
    onChange(converted);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}
