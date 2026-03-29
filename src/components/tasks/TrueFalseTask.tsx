import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Star, Check, X } from 'lucide-react';

const statements = [
  { text: 'На собрании школьного совета дети решают, какой праздник устроить.', correct: true },
  { text: 'Школьное самоуправление делает только то, что хочет учитель.', correct: false },
  { text: 'Можно вместе придумывать конкурсы, игры и экскурсии.', correct: true },
  { text: 'На собраниях все молчат и никто ничего не обсуждает.', correct: false },
  { text: 'Школьное самоуправление помогает младшим друзьям и младшим классам.', correct: true },
  { text: 'На выборах в школьный совет побеждает только тот, кто громче всех кричит.', correct: false },
  { text: 'Можно придумать классный плакат или стенгазету вместе с друзьями.', correct: true },
  { text: 'Школьное самоуправление запрещает веселиться на переменах.', correct: false },
];

export const TrueFalseTask: React.FC = () => {
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(statements.length).fill(null));
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const handleAnswer = (idx: number, choice: boolean) => {
    if (answers[idx] !== null) return;

    const newAnswers = [...answers];
    newAnswers[idx] = choice;
    setAnswers(newAnswers);
    setAnsweredCount(prev => prev + 1);

    if (choice === statements[idx].correct) {
      setScore(prev => prev + 10);
    }

    if (answeredCount + 1 === statements.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetAll = () => {
    setAnswers(new Array(statements.length).fill(null));
    setScore(0);
    setAnsweredCount(0);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#0f1623] rounded-2xl shadow-2xl border border-green-500/20 p-3 sm:p-5 text-white">
      <div className="bg-gradient-to-br from-[#1e2840] to-[#0f1623] border border-green-500/30 p-3 rounded-xl shadow-lg mb-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -ml-16 -mt-16"></div>
        <h2 className="font-['Baloo_2'] text-base sm:text-lg text-white font-bold relative z-10">✅ Урок 6 — Задание 3</h2>
        <p className="text-gray-400 text-[10px] relative z-10">Прочитай утверждение и выбери ответ</p>
      </div>

      <div className="flex items-center gap-3 mb-3 bg-[#1a2235] p-2 rounded-xl border border-white/5">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-gray-500 uppercase">Очки</span>
          <span className="font-['Baloo_2'] text-xl text-yellow-400 font-extrabold leading-none">{score}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-[8px] font-bold text-gray-500 mb-1 uppercase">
            <span>Прогресс</span>
            <span>{answeredCount}/{statements.length}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-500" 
              style={{ width: `${(answeredCount / statements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {statements.map((stmt, i) => (
          <div 
            key={i}
            className={`flex items-center gap-2 p-2 rounded-xl border transition-all duration-300
              ${answers[i] === null ? 'bg-[#1e2840] border-white/5 shadow-md' : 
                answers[i] === stmt.correct ? 'bg-green-500/10 border-green-500/40' : 'bg-red-500/10 border-red-500/40'}`}
          >
            <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[8px] flex-shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 text-[10px] sm:text-xs font-semibold text-gray-200 leading-tight">
              {stmt.text}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => handleAnswer(i, true)}
                disabled={answers[i] !== null}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all
                  ${answers[i] === true ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg' : 
                    answers[i] === null ? 'border-green-500 text-green-500 hover:bg-green-500/10' : 
                    stmt.correct === true ? 'bg-green-500/20 border-green-500 text-green-500 opacity-50' : 'border-gray-700 text-gray-700 opacity-30'}`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAnswer(i, false)}
                disabled={answers[i] !== null}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all
                  ${answers[i] === false ? 'bg-red-500 border-red-500 text-white scale-110 shadow-lg' : 
                    answers[i] === null ? 'border-red-500 text-red-500 hover:bg-red-500/10' : 
                    stmt.correct === false ? 'bg-red-500/20 border-red-500 text-red-500 opacity-50' : 'border-gray-700 text-gray-700 opacity-30'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {answeredCount === statements.length && (
        <div className="bg-green-500 text-white p-3 rounded-xl text-center font-['Baloo_2'] text-base shadow-lg mb-4 animate-bounce">
          🎉 Отлично! Все задания выполнены!
        </div>
      )}

      <button 
        onClick={resetAll}
        className="mt-auto flex items-center justify-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-all active:scale-95 text-sm"
      >
        <RefreshCw className="w-4 h-4" /> Сбросить
      </button>
    </div>
  );
};
