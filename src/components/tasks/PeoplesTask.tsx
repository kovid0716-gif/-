import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const peoples = [
  {
    num: 1,
    name: 'Саки',
    emoji: '🏹',
    era: 'VII–III вв. до н.э.',
    where: 'Жили на территории современного Казахстана, Средней Азии и Причерноморья. Кочевали по степям, горам и долинам.',
    facts: [
      'Опытные воины и всадники — одни из лучших конных лучников древнего мира',
      'Кочевой образ жизни: жили в юртах и переезжали вслед за пастбищами',
      'Создавали прекрасные украшения в «зверином стиле» из золота',
      'Известны персам как «заострённые шапки» — носили особые остроконечные головные уборы'
    ],
    culture: 'Саки почитали природу, огонь и предков. Хоронили вождей в больших курганах с оружием, конями и золотом. Знаменитый «Золотой человек» из Иссыкского кургана — памятник сакской культуры.',
    tags: ['Кочевники', 'Скифы', 'Золотой человек', 'Степь', 'Конные лучники', 'Курганы'],
    color: 'from-green-900 to-green-700'
  },
  {
    num: 2,
    name: 'Гунны',
    emoji: '⚔️',
    era: 'II в. до н.э. — V в. н.э.',
    where: 'Пришли из Центральной Азии, прошли через Казахстан и достигли Европы. Создали огромную кочевую державу.',
    facts: [
      'Создали мощную военную державу, державшую в страхе весь Евразийский континент',
      'Под предводительством Аттилы завоевали большую часть Европы',
      'Искусные наездники — вся жизнь гуннов была связана с конём',
      'Из-за нашествия гуннов началось Великое переселение народов в Европе'
    ],
    culture: 'Гунны были свирепыми воинами, но также умелыми торговцами. Они принесли в Европу новые виды оружия и конской упряжи. Их набеги изменили всю историю Евразии.',
    tags: ['Аттила', 'Держава', 'Переселение народов', 'Воины', 'Степь', 'Конница'],
    color: 'from-red-900 to-red-700'
  },
  {
    num: 3,
    name: 'Казахи',
    emoji: '🦅',
    era: 'XV в. н.э. — наши дни',
    where: 'Территория современного Казахстана — бескрайние степи, горы Тянь-Шаня и Алтая, берега Каспийского моря.',
    facts: [
      'Основали Казахское ханство в 1465 году — первое государство казахского народа',
      'Искусство беркутчи (охота с орлами-беркутами) — уникальная казахская традиция',
      'Знаменитая юрта — разборной дом кочевника, символ казахской культуры',
      'Три жуза (Старший, Средний, Младший) — три родовых союза казахского народа'
    ],
    culture: 'Казахи — народ с богатой культурой: эпос «Манас», домбра, кюи (инструментальная музыка), нааурыз (Новый год). Гостеприимство — главная ценность: гость всегда желанен в каждой юрте.',
    tags: ['Казахское ханство', 'Беркутчи', 'Юрта', 'Домбра', 'Три жуза', 'Наурыз'],
    color: 'from-blue-900 to-blue-700'
  },
  {
    num: 4,
    name: 'Үйсіндер (Усуни)',
    emoji: '🌄',
    era: 'II в. до н.э. — V в. н.э.',
    where: 'Жили на юго-востоке Казахстана, в районе Жетысу (Семиречья), у подножий гор Тянь-Шань.',
    facts: [
      'Создали мощный союз племён в Семиречье, воевали с гуннами и сакскими племенами',
      'Занимались скотоводством и частично земледелием — жили у рек и гор',
      'Поддерживали торговые связи с Китаем по Великому шёлковому пути',
      'Их предводители носили титул «гуньмо» — верховный правитель'
    ],
    culture: 'Усуни почитали горы и реки как священные места. Строили каменные изваяния (балбалы) в честь предков. Их искусство украшения коня и оружия было очень развитым.',
    tags: ['Жетысу', 'Семиречье', 'Шёлковый путь', 'Гуньмо', 'Скотоводы', 'Балбалы'],
    color: 'from-purple-900 to-purple-700'
  }
];

export const PeoplesTask: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const openModal = (idx: number) => {
    setSelectedIdx(idx);
    setVisited(prev => new Set(prev).add(idx));
  };

  const closeModal = () => setSelectedIdx(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#12100e] rounded-2xl shadow-2xl border border-[#D4A017]/30 p-3 sm:p-5 text-[#ede8df] relative">
      <div className="bg-gradient-to-br from-[#2a2018] to-[#12100e] border border-[#D4A017]/30 p-4 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A017]/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
        <h2 className="font-['Baloo_2'] text-lg sm:text-xl text-[#F5C842] font-bold relative z-10">🏇 Урок 6 — Задание 5</h2>
        <p className="text-[#9a8e7f] text-xs relative z-10">Нажми на изображение народа, чтобы узнать о нём</p>
      </div>

      <div className="bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-xl p-2 text-xs text-[#F5C842] text-center font-bold mb-4 flex items-center justify-center gap-2">
        <Info className="w-4 h-4" /> 👆 Нажми на карточку!
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {peoples.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal(i)}
            className={`relative rounded-xl overflow-hidden cursor-pointer shadow-xl border-2 border-white/5 group
              ${visited.has(i) ? 'opacity-90' : ''}`}
          >
            {visited.has(i) && (
              <div className="absolute top-2 left-2 z-20 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                ✅ ИЗУЧЕНО
              </div>
            )}
            <div className={`h-32 flex items-center justify-center text-6xl bg-gradient-to-br ${p.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <span className="relative z-10 drop-shadow-2xl">{p.emoji}</span>
            </div>
            <div className="bg-black/80 p-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#D4A017] text-black flex items-center justify-center font-black font-['Baloo_2'] text-[10px]">
                {p.num}
              </div>
              <div>
                <div className="font-['Baloo_2'] text-sm font-bold text-white leading-tight">{p.name}</div>
                <div className="text-[8px] text-[#9a8e7f] uppercase font-bold tracking-wider">{p.era}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative bg-[#1e1a16] w-full max-w-lg rounded-3xl shadow-2xl border border-[#D4A017]/40 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-start justify-between p-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="text-6xl mr-4">{peoples[selectedIdx].emoji}</div>
                <div className="flex-1">
                  <h3 className="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#F5C842]">{peoples[selectedIdx].name}</h3>
                  <p className="text-[#9a8e7f] text-sm font-bold">{peoples[selectedIdx].era}</p>
                </div>
                <button onClick={closeModal} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <section>
                  <h4 className="text-[#D4A017] text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    📍 Где жили <div className="h-px flex-1 bg-[#D4A017]/20"></div>
                  </h4>
                  <p className="text-sm leading-relaxed text-[#ede8df]/90">{peoples[selectedIdx].where}</p>
                </section>

                <section>
                  <h4 className="text-[#D4A017] text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                    ⚔️ Основные факты <div className="h-px flex-1 bg-[#D4A017]/20"></div>
                  </h4>
                  <ul className="space-y-2">
                    {peoples[selectedIdx].facts.map((f, i) => (
                      <li key={i} className="text-sm flex gap-3 text-[#ede8df]/80">
                        <span className="text-[#D4A017]">✦</span> {f}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-[#D4A017] text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    🎭 Традиции и культура <div className="h-px flex-1 bg-[#D4A017]/20"></div>
                  </h4>
                  <p className="text-sm leading-relaxed text-[#ede8df]/90">{peoples[selectedIdx].culture}</p>
                </section>

                <section>
                  <h4 className="text-[#D4A017] text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                    🏷️ Ключевые слова <div className="h-px flex-1 bg-[#D4A017]/20"></div>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {peoples[selectedIdx].tags.map((t, i) => (
                      <span key={i} className="bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F5C842] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
