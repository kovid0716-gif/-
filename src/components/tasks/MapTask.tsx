import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Star } from 'lucide-react';

const matchData = [
  { region: 'Атырауская область', rEmoji: '🏭', symbol: 'Нефть', sEmoji: '🛢️', desc: 'Главный нефтяной регион' },
  { region: 'Алматинская область', rEmoji: '🌆', symbol: 'Горы и яблоки', sEmoji: '⛰️', desc: 'Красивые горы и яблоневые сады' },
  { region: 'Мангистауская область', rEmoji: '🌊', symbol: 'Каспийское море', sEmoji: '🌊', desc: 'Выход к Каспийскому морю' },
  { region: 'Карагандинская область', rEmoji: '⚫', symbol: 'Уголь', sEmoji: '⛏️', desc: 'Крупнейший угольный бассейн' },
  { region: 'С-Казахстанская область', rEmoji: '🌾', symbol: 'Пшеница', sEmoji: '🌾', desc: 'Хлебная корзина Казахстана' },
  { region: 'В-Казахстанская область', rEmoji: '🌲', symbol: 'Леса и горы', sEmoji: '🌲', desc: 'Алтайские леса и горы' },
];

const hotspots = [
  { id: 0, left: '15%', top: '53%', emoji: '🏭', name: 'Атырауская' },
  { id: 1, left: '78%', top: '75%', emoji: '🌆', name: 'Алматинская' },
  { id: 2, left: '15%', top: '75%', emoji: '🌊', name: 'Мангистауская' },
  { id: 3, left: '62%', top: '48%', emoji: '⚫', name: 'Карагандинская' },
  { id: 4, left: '55%', top: '15%', emoji: '🌾', name: 'С-Казахстанская' },
  { id: 5, left: '85%', top: '48%', emoji: '🌲', name: 'В-Казахстанская' },
];

export const MapTask: React.FC = () => {
  const [selectedHS, setSelectedHS] = useState<number | null>(null);
  const [selectedSym, setSelectedSym] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState<number[]>([]);
  const [shuffledSymbols, setShuffledSymbols] = useState<any[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ hs: number | null, sym: number | null }>({ hs: null, sym: null });

  useEffect(() => {
    resetTask();
  }, []);

  const shuffle = (arr: any[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const resetTask = () => {
    setScore(0);
    setMatched([]);
    setSelectedHS(null);
    setSelectedSym(null);
    setShuffledSymbols(shuffle(matchData.map((d, i) => ({ ...d, origIdx: i }))));
  };

  const handleHSClick = (idx: number) => {
    if (matched.includes(idx)) return;
    if (selectedHS === idx) {
        setSelectedHS(null);
        return;
    }
    setSelectedHS(idx);
    if (selectedSym !== null) {
        checkMatch(idx, selectedSym);
    }
  };

  const handleSymClick = (idx: number) => {
    if (matched.includes(idx)) return;
    if (selectedSym === idx) {
        setSelectedSym(null);
        return;
    }
    setSelectedSym(idx);
    if (selectedHS !== null) {
        checkMatch(selectedHS, idx);
    }
  };

  const checkMatch = (hsIdx: number, symIdx: number) => {
    if (hsIdx === symIdx) {
      const newMatched = [...matched, hsIdx];
      setMatched(newMatched);
      setScore(prev => prev + 10);
      setSelectedHS(null);
      setSelectedSym(null);
      if (newMatched.length === matchData.length) {
        setScore(prev => prev + 10);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setWrongMatch({ hs: hsIdx, sym: symIdx });
      setTimeout(() => {
        setWrongMatch({ hs: null, sym: null });
        setSelectedHS(null);
        setSelectedSym(null);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#0f172a] rounded-2xl shadow-2xl border-2 border-blue-900/30 p-3 sm:p-5 text-white">
      <div className="bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-400/30 p-3 rounded-xl shadow-lg mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-['Baloo_2'] text-base sm:text-lg text-white font-bold">🗺️ Урок 6 — Задание 2</h2>
          <p className="text-blue-200/70 text-[10px]">Сопоставь регионы с их символами</p>
        </div>
        <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
          <span className="text-blue-300 font-bold text-xs">Счет: {score}</span>
        </div>
      </div>

      <div className="bg-yellow-50/10 border border-yellow-400/30 rounded-xl p-2 text-[10px] text-yellow-200 text-center mb-3 font-semibold">
        👆 Нажми на область, затем на символ внизу
      </div>

      <div className="relative w-full rounded-xl overflow-hidden shadow-xl border-2 border-blue-900/50 bg-slate-800 mb-4 group min-h-[250px] flex items-center justify-center">
        <img 
          src="https://assets.epuzzle.info/puzzle/153/655/original.webp" 
          alt="Карта Казахстана" 
          className="w-full h-auto block opacity-95 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            const img = e.currentTarget;
            console.log("Map loaded:", img.naturalWidth, img.naturalHeight);
          }}
          onError={(e) => {
            console.error("Map failed to load from provided URL");
          }}
        />
        
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => handleHSClick(hs.id)}
            style={{ left: hs.left, top: hs.top }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full border font-bold text-[8px] sm:text-[9px] transition-all duration-300 z-10 whitespace-nowrap shadow-md
              ${matched.includes(hs.id) ? 'bg-green-500 border-green-700 text-white cursor-default' : 
                selectedHS === hs.id ? 'bg-blue-500 border-blue-700 text-white scale-110 shadow-blue-400' : 
                wrongMatch.hs === hs.id ? 'bg-red-500 border-red-700 text-white animate-shake' : 'bg-white/90 border-blue-600 text-blue-900 hover:scale-110'}`}
          >
            <span className="block text-center text-xs">{hs.emoji}</span>
            {hs.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {shuffledSymbols.map((item) => (
          <button
            key={item.origIdx}
            onClick={() => handleSymClick(item.origIdx)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 shadow-sm relative
              ${matched.includes(item.origIdx) ? 'bg-green-500/20 border-green-500 cursor-default opacity-60' : 
                selectedSym === item.origIdx ? 'bg-yellow-400 border-yellow-600 scale-105 shadow-md text-black' : 
                wrongMatch.sym === item.origIdx ? 'bg-red-500/20 border-red-500 animate-shake' : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:-translate-y-1'}`}
          >
            <span className="text-xl mb-1">{item.sEmoji}</span>
            <span className="font-bold text-[9px] sm:text-[10px] text-blue-100">{item.symbol}</span>
            <span className="text-[8px] text-blue-300/50 font-semibold mt-1 text-center leading-tight truncate w-full">{item.desc}</span>
            {matched.includes(item.origIdx) && <span className="absolute top-1 right-1 text-green-400 text-xs">✅</span>}
          </button>
        ))}
      </div>

      {matched.length === matchData.length && (
        <div className="bg-green-500 text-white p-3 rounded-xl text-center font-['Baloo_2'] text-base animate-bounce shadow-lg mb-4">
          🎉 Отлично! Все области сопоставлены!
        </div>
      )}

      <button 
        onClick={resetTask}
        className="flex items-center justify-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all active:scale-95 text-sm"
      >
        <RefreshCw className="w-4 h-4" /> Сбросить
      </button>
    </div>
  );
};
