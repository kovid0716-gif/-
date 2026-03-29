import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Star, Lightbulb } from 'lucide-react';

const words = [
  { id: 'области', text: 'области' },
  { id: 'нефть', text: 'нефть' },
  { id: 'горами', text: 'горами' },
  { id: 'уголь', text: 'уголь' },
  { id: 'область', text: 'область' },
];

export const FillBlanksTask: React.FC = () => {
  const [score, setScore] = useState(0);
  const [filledCount, setFilledCount] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [blanks, setBlanks] = useState<Record<number, string | null>>({
    1: null, 2: null, 3: null, 4: null, 5: null
  });
  const [wrongBlank, setWrongBlank] = useState<number | null>(null);

  const updateScore = (val: number) => {
    setScore(val);
  };

  const handleWordClick = (wordId: string) => {
    const isUsed = Object.values(blanks).includes(wordId);
    if (isUsed) return;

    if (selectedWord === wordId) {
      setSelectedWord(null);
    } else {
      setSelectedWord(wordId);
    }
  };

  const handleBlankClick = (blankId: number, answer: string) => {
    if (blanks[blankId] || !selectedWord) return;

    if (selectedWord === answer) {
      setBlanks(prev => ({ ...prev, [blankId]: selectedWord }));
      const newFilledCount = filledCount + 1;
      setFilledCount(newFilledCount);
      updateScore(score + 10);
      
      if (newFilledCount === 5) {
        updateScore(score + 30);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setWrongBlank(blankId);
      setTimeout(() => setWrongBlank(null), 600);
    }
    setSelectedWord(null);
  };

  const resetTask = () => {
    setScore(0);
    setFilledCount(0);
    setSelectedWord(null);
    setBlanks({ 1: null, 2: null, 3: null, 4: null, 5: null });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#0f172a] rounded-2xl shadow-2xl border-2 border-blue-900/30 p-3 sm:p-5 text-white">
      <div className="bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-400/30 p-3 rounded-xl shadow-lg mb-3">
        <h2 className="font-['Baloo_2'] text-base sm:text-lg text-white font-bold">📝 Урок 6 — Задание 4</h2>
        <p className="text-blue-200/70 text-[10px]">Заполни пробелы в тексте</p>
      </div>

      <div className="flex items-center gap-2 mb-3 bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
        <span className="font-bold text-blue-300 text-[10px] flex items-center gap-1 uppercase tracking-wider">Очки:</span>
        <span className="font-['Baloo_2'] text-xl text-blue-400 font-extrabold leading-none">{score}</span>
      </div>

      <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-2 flex flex-wrap gap-1.5 mb-3 min-h-[40px]">
        {words.map(word => {
          const isUsed = Object.values(blanks).includes(word.id);
          return (
            <button
              key={word.id}
              onClick={() => handleWordClick(word.id)}
              className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all duration-200 shadow-sm
                ${isUsed ? 'hidden' : 
                  selectedWord === word.id ? 'bg-blue-500 text-white ring-2 ring-blue-200 scale-105' : 
                  'bg-yellow-500 text-black hover:bg-yellow-400 hover:-translate-y-0.5'}`}
            >
              {word.text}
            </button>
          );
        })}
      </div>

      <div className="bg-yellow-50/10 border border-yellow-400/30 rounded-xl p-2 text-[10px] text-yellow-200 flex items-center gap-2 mb-3">
        <Lightbulb className="w-3 h-3 flex-shrink-0" />
        <span>Нажми на слово, потом на поле в тексте</span>
      </div>

      <div className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium p-3 bg-slate-800/50 rounded-xl border border-white/5">
        Казахстан — это большая страна в Центральной Азии. Наша страна делится на{' '}
        <span 
          onClick={() => handleBlankClick(1, 'области')}
          className={`inline-flex items-center justify-center min-w-[70px] h-6 border-b-2 mx-1 px-1 rounded transition-all cursor-pointer font-bold
            ${blanks[1] ? 'bg-green-500 border-green-700 text-white' : 
              wrongBlank === 1 ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-blue-500/20 border-blue-400 text-blue-300'}`}
        >
          {blanks[1] || '___'}
        </span>
        . Каждая область имеет свои особенности. Например, Атырауская область известна{' '}
        <span 
          onClick={() => handleBlankClick(2, 'нефть')}
          className={`inline-flex items-center justify-center min-w-[70px] h-6 border-b-2 mx-1 px-1 rounded transition-all cursor-pointer font-bold
            ${blanks[2] ? 'bg-green-500 border-green-700 text-white' : 
              wrongBlank === 2 ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-blue-500/20 border-blue-400 text-blue-300'}`}
        >
          {blanks[2] || '___'}
        </span>
        , Алматинская область — красивыми{' '}
        <span 
          onClick={() => handleBlankClick(3, 'горами')}
          className={`inline-flex items-center justify-center min-w-[70px] h-6 border-b-2 mx-1 px-1 rounded transition-all cursor-pointer font-bold
            ${blanks[3] ? 'bg-green-500 border-green-700 text-white' : 
              wrongBlank === 3 ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-blue-500/20 border-blue-400 text-blue-300'}`}
        >
          {blanks[3] || '___'}
        </span>
        , а Карагандинская —{' '}
        <span 
          onClick={() => handleBlankClick(4, 'уголь')}
          className={`inline-flex items-center justify-center min-w-[70px] h-6 border-b-2 mx-1 px-1 rounded transition-all cursor-pointer font-bold
            ${blanks[4] ? 'bg-green-500 border-green-700 text-white' : 
              wrongBlank === 4 ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-blue-500/20 border-blue-400 text-blue-300'}`}
        >
          {blanks[4] || '___'}
        </span>
        . Карта Казахстана помогает увидеть, где находится каждая{' '}
        <span 
          onClick={() => handleBlankClick(5, 'область')}
          className={`inline-flex items-center justify-center min-w-[70px] h-6 border-b-2 mx-1 px-1 rounded transition-all cursor-pointer font-bold
            ${blanks[5] ? 'bg-green-500 border-green-700 text-white' : 
              wrongBlank === 5 ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-blue-500/20 border-blue-400 text-blue-300'}`}
        >
          {blanks[5] || '___'}
        </span>
        .
      </div>

      {filledCount === 5 && (
        <div className="mt-4 bg-green-500 text-white p-3 rounded-xl text-center font-['Baloo_2'] text-base animate-bounce shadow-lg">
          🎊 Замечательно! Все пробелы заполнены!
        </div>
      )}

      <button 
        onClick={resetTask}
        className="mt-auto flex items-center justify-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-all active:scale-95 text-sm"
      >
        <RefreshCw className="w-4 h-4" /> Сбросить
      </button>
    </div>
  );
};
