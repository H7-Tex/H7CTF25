"use client";

import { useState, useEffect } from "react";

export default function ChamberOfSecretsPage() {
  const [revealed, setRevealed] = useState("");

  const processData = () => {
    const data = "FLAG_HERE";
    try {
      const firstDecode = atob(data);
      const secondDecode = atob(firstDecode);
      return secondDecode;
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    setRevealed(processData());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-gray-900 to-black flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-amber-300 text-2xl font-mono whitespace-pre-wrap">
          {revealed}
        </div>
      </div>
    </div>
  );
}
