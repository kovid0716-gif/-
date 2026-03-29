import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Trash2, Plus, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialWords = [
  'Школьный совет', 'Школьные комитеты', 'Школьный спорт',
  'Комитет культуры', 'Школьный совет классов',
  'Комитет знаний', 'Классные коллективы школы'
];

const initialGroups = [
  { title: 'Органы управления', words: [] },
  { title: 'Подразделения', words: [] }
];

export const ClusterTask: React.FC = () => {
  const [bankWords, setBankWords] = useState<string[]>([]);
  const [groups, setGroups] = useState<{ title: string, words: string[] }[]>([]);
  const [newWord, setNewWord] = useState('');
  const [draggedWord, setDraggedWord] = useState<{ word: string, from: string | number } | null>(null);
  
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bankRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    resetAll();
  }, []);

  const resetAll = () => {
    setBankWords([...initialWords]);
    setGroups(initialGroups.map(g => ({ ...g, words: [] })));
  };

  const handleDragEnd = (event: any, info: any, word: string, from: string | number) => {
    const { x, y } = info.point;
    
    // Check if dropped over a group
    let targetIdx: number | 'bank' | null = null;
    
    groupRefs.current.forEach((ref, idx) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          targetIdx = idx;
        }
      }
    });

    // Check if dropped over bank
    if (bankRef.current) {
      const rect = bankRef.current.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        targetIdx = 'bank';
      }
    }

    if (targetIdx !== null && targetIdx !== from) {
      moveWord(word, from, targetIdx);
    }
    
    setDraggedWord(null);
  };

  const moveWord = (word: string, from: string | number, to: number | 'bank') => {
    // Remove from source
    if (from === 'bank') {
      setBankWords(prev => prev.filter(w => w !== word));
    } else {
      setGroups(prev => prev.map((g, i) => i === from ? { ...g, words: g.words.filter(w => w !== word) } : g));
    }

    // Add to destination
    if (to === 'bank') {
      setBankWords(prev => [...prev, word]);
    } else {
      setGroups(prev => prev.map((g, i) => i === to ? { ...g, words: [...g.words, word] } : g));
    }
  };

  const addWord = () => {
    if (!newWord.trim()) return;
    setBankWords(prev => [...prev, newWord.trim()]);
    setNewWord('');
  };

  const addGroup = () => {
    const title = prompt('Название новой группы:');
    if (title) {
      setGroups(prev => [...prev, { title, words: [] }]);
    }
  };

  const deleteGroup = (idx: number) => {
    const group = groups[idx];
    setBankWords(prev => [...prev, ...group.words]);
    setGroups(prev => prev.filter((_, i) => i !== idx));
  };

  const renameGroup = (idx: number) => {
    const newTitle = prompt('Новое название:', groups[idx].title);
    if (newTitle) {
      setGroups(prev => prev.map((g, i) => i === idx ? { ...g, title: newTitle } : g));
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#1a1f35] rounded-2xl shadow-2xl border-2 border-blue-900/30 p-3 sm:p-5 text-white">
      <div className="bg-gradient-to-br from-[#2d3561] to-[#1a1f35] border border-blue-400/30 p-4 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <h2 className="font-['Baloo_2'] text-lg sm:text-xl text-white font-bold relative z-10">📚 Урок 6 — Задание 1</h2>
        <p className="text-blue-200/70 text-xs relative z-10">Восстанови кластер, перетаскивая слова в группы</p>
      </div>

      <div className="mb-2 text-[10px] font-bold text-blue-300 uppercase tracking-wider">🗂️ Банк слов:</div>
      <div 
        ref={bankRef}
        className="flex flex-wrap gap-1.5 p-3 bg-[#252b45] rounded-2xl border-2 border-dashed border-blue-500/40 min-h-[80px] mb-4 relative"
      >
        {bankWords.length === 0 && <div className="text-blue-300/50 text-xs italic w-full text-center py-2">Все распределено!</div>}
        <AnimatePresence>
          {bankWords.map(word => (
            <motion.div
              key={word}
              layout
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              onDragStart={() => setDraggedWord({ word, from: 'bank' })}
              onDragEnd={(e, info) => handleDragEnd(e, info, word, 'bank')}
              whileDrag={{ scale: 1.1, zIndex: 50 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-1.5 rounded-full font-bold text-xs cursor-grab active:cursor-grabbing shadow-md border border-white/10 flex items-center gap-1.5 touch-none"
            >
              <GripVertical className="w-3 h-3 opacity-50" />
              {word}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newWord}
          onChange={e => setNewWord(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addWord()}
          placeholder="✏️ Добавить..."
          className="flex-1 bg-[#252b45] border border-blue-400/30 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
        />
        <button onClick={addWord} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors">+ Слово</button>
        <button onClick={addGroup} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors">+ Группа</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {groups.map((group, idx) => (
          <div 
            key={idx}
            ref={el => groupRefs.current[idx] = el}
            className="bg-[#252b45] rounded-2xl p-3 border border-white/5 shadow-xl min-h-[120px] flex flex-col transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <button 
                onClick={() => renameGroup(idx)}
                className={`px-3 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm hover:brightness-110 transition-all
                  ${idx % 4 === 0 ? 'bg-blue-500' : idx % 4 === 1 ? 'bg-green-500' : idx % 4 === 2 ? 'bg-orange-500' : 'bg-red-500'}`}
              >
                {group.title}
              </button>
              <button onClick={() => deleteGroup(idx)} className="p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {group.words.length === 0 && <div className="text-blue-300/30 text-[10px] italic w-full text-center py-2">📥 Сюда</div>}
              <AnimatePresence>
                {group.words.map(word => (
                  <motion.div
                    key={word}
                    layout
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={1}
                    onDragStart={() => setDraggedWord({ word, from: idx })}
                    onDragEnd={(e, info) => handleDragEnd(e, info, word, idx)}
                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold border border-white/10 shadow-sm cursor-grab active:cursor-grabbing touch-none
                      ${idx % 4 === 0 ? 'bg-blue-500/20 text-blue-200' : idx % 4 === 1 ? 'bg-green-500/20 text-green-200' : idx % 4 === 2 ? 'bg-orange-500/20 text-orange-200' : 'bg-red-500/20 text-red-200'}`}
                  >
                    {word}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={resetAll}
        className="mt-4 flex items-center justify-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all active:scale-95 text-sm"
      >
        <RefreshCw className="w-4 h-4" /> Сбросить
      </button>
    </div>
  );
};
