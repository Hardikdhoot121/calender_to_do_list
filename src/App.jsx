import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-[#45bca5] p-4 sm:p-8 md:p-12 xl:p-24 flex items-center justify-center font-sans">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-[1.5rem] bg-[#f4f1eb] relative overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] border-2 border-white/20">

        {/* Left Side: Hero Image (India Scenery) */}
        <div className="w-full lg:w-2/5 relative h-64 lg:h-auto overflow-hidden bg-[#e0ded8] group">
           
           <img 
             src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop" 
             alt="India Scenery" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
           />
           
           {/* Dark gradient overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>

           {/* Inner Border Vintage Look */}
           <div className="absolute inset-3 border-[3px] border-[#f4f1eb]/80 rounded-[1.2rem] lg:rounded-l-[1.2rem] lg:rounded-r-none z-20 pointer-events-none"></div>
           
           <div className="absolute top-10 w-full text-center z-30">
             <h1 className="text-white font-sans font-bold text-5xl lg:text-5xl xl:text-6xl tracking-[0.25em] ml-4 drop-shadow-xl opacity-95">INDIA</h1>
           </div>
           
        </div>

        {/* Right Side: Calendar Component */}
        <Calendar />

      </div>
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
