"use client";
import React, { useState } from "react";

const phoneticMap: Record<string, string> = {
  sh: "श",
  ch: "च",
  th: "थ",
  dh: "ध",
  ph: "फ",
  kh: "ख",
  gh: "घ",
  ai: "ऐ",
  au: "औ",
  aa: "आ",
  ee: "ई",
  oo: "ऊ",
  a: "अ",
  b: "ब",
  c: "क",
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
  q: "क",
  r: "र",
  s: "स",
  t: "त",
  u: "उ",
  v: "भ",
  w: "व",
  x: "क्स",
  y: "य",
  z: "ज",
  " ": " ",
};

function transliterateWord(word: string): string {
  let result = "";
  let i = 0;
  while (i < word.length) {
    const twoChar = word.slice(i, i + 2).toLowerCase();
    const oneChar = word[i].toLowerCase();

    if (phoneticMap[twoChar]) {
      result += phoneticMap[twoChar];
      i += 2;
    } else if (phoneticMap[oneChar]) {
      result += phoneticMap[oneChar];
      i += 1;
    } else {
      result += oneChar;
      i += 1;
    }
  }
  return result;
}

export function NepaliUnicodeInput({
  value,
  onChange,
  placeholder = "Type in English and press space…",
  className = "",
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      const words = inputValue.trim().split(" ");
      const lastWord = words.pop() || "";
      const converted = transliterateWord(lastWord);
      const newValue = [...words, converted].join(" ") + " ";
      setInputValue(newValue);
      onChange(newValue);
      e.preventDefault(); // prevent default space behavior
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
}
