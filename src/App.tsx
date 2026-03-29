/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFlip, Keyboard } from 'swiper/modules';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

// Import Task Components
import { MapTask } from './components/tasks/MapTask';
import { FillBlanksTask } from './components/tasks/FillBlanksTask';
import { ClusterTask } from './components/tasks/ClusterTask';
import { TrueFalseTask } from './components/tasks/TrueFalseTask';
import { PeoplesTask } from './components/tasks/PeoplesTask';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#0f172a] flex items-center justify-center overflow-hidden p-2 sm:p-4">
      <div className="w-full h-full max-w-5xl max-h-[min(900px,95vh)] relative group bg-[#1e293b] rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/5 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, EffectFlip, Keyboard]}
          effect={'flip'}
          grabCursor={true}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          className="mySwiper w-full h-full"
        >
          {/* Cover Page */}
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8 text-center border-4 border-white/10">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <BookOpen className="w-16 h-16 text-blue-200" />
              </div>
              <h1 className="font-['Baloo_2'] text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg">
                Урок 6: Моя Родина
              </h1>
              <p className="text-xl text-blue-100 max-w-md font-semibold opacity-80">
                5 интерактивных заданий о Казахстане
              </p>
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="px-8 py-4 bg-white text-blue-900 rounded-full font-black text-lg shadow-xl animate-bounce cursor-pointer">
                  Начать обучение
                </div>
                <p className="text-sm text-blue-300 font-bold uppercase tracking-widest">Листай вправо →</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Task 1: Cluster */}
          <SwiperSlide>
            <ClusterTask />
          </SwiperSlide>

          {/* Task 2: Map */}
          <SwiperSlide>
            <MapTask />
          </SwiperSlide>

          {/* Task 3: True/False */}
          <SwiperSlide>
            <TrueFalseTask />
          </SwiperSlide>

          {/* Task 4: Fill Blanks */}
          <SwiperSlide>
            <FillBlanksTask />
          </SwiperSlide>

          {/* Task 5: Peoples */}
          <SwiperSlide>
            <PeoplesTask />
          </SwiperSlide>

          {/* End Page */}
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-br from-green-600 to-emerald-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8 text-center border-4 border-white/10">
              <div className="text-8xl mb-6 animate-bounce">🏆</div>
              <h2 className="font-['Baloo_2'] text-4xl sm:text-5xl font-bold mb-4">Отличная работа!</h2>
              <p className="text-xl text-green-100 max-w-md font-semibold opacity-90 mb-10">
                Ты успешно прошел все интерактивные задания. Твои знания о Казахстане стали еще крепче!
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-10 py-4 bg-white text-green-900 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
              >
                Пройти еще раз
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default App;
