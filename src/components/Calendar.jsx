import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, formatDateStr } from '../utils/dateUtils';
import useLocalStorage from '../hooks/useLocalStorage';
import DayCell from './DayCell';
import NotesPanel from './NotesPanel';

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = () => {
  const [storedMonthStr, setStoredMonthStr] = useLocalStorage('wallcal_lastMonth', formatDateStr(new Date()));
  const [selectedDate, setSelectedDate] = useLocalStorage('wallcal_selectedDate', null);
  const [notes, setNotes] = useLocalStorage('wallcal_notes', {});

  const [currentDate, setCurrentDate] = useState(storedMonthStr ? new Date(storedMonthStr) : new Date());
  const today = new Date();

  // If local storage gave us a string, parse it
  const safeSelectedDate = selectedDate ? new Date(selectedDate) : null;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const days = getDaysInMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(newDate);
    setStoredMonthStr(formatDateStr(newDate));
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(newDate);
    setStoredMonthStr(formatDateStr(newDate));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
    setStoredMonthStr(formatDateStr(new Date()));
  };

  const handleDateClick = (clickedDate) => {
    const clickedStr = clickedDate.toISOString();
    if (selectedDate === clickedStr) {
      setSelectedDate(null); // Toggle off if clicked again
    } else {
      setSelectedDate(clickedStr); // Assign note for this specific day
    }
  };

  const handleSaveNote = (key, text) => {
    setNotes(prev => ({ ...prev, [key]: text }));
  };

  const handleDeleteNote = (key) => {
    setNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[key];
      setSelectedDate(null); // Close panel after delete
      return newNotes;
    });
  };

  const checkHasNote = (date) => {
    const dStr = formatDateStr(date);
    return !!notes[dStr];
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1eb] p-6 lg:p-10 text-[#004b34] relative w-full lg:w-3/5 rounded-b-[1.5rem] lg:rounded-l-none lg:rounded-r-[1.5rem] shadow-inner lg:border-l border-black/5 ml-auto">
      
      {/* Month Year Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          {/* Decorative background block */}
          <div className="absolute -inset-x-8 -inset-y-4 bg-[#fbbd54] rounded-r-3xl rounded-bl-3xl shadow-[0_4px_10px_rgba(251,189,84,0.3)] z-0"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#004b34] leading-none mb-1 drop-shadow-sm font-serif">
              {String(currentMonth + 1).padStart(2, '0')}
            </h2>
            <div className="flex items-baseline space-x-2">
               <span className="text-xl lg:text-2xl font-serif text-[#004b34]">{monthName}</span>
               <span className="text-xl lg:text-2xl font-bold opacity-30 text-white tracking-widest outline-text" style={{ WebkitTextStroke: '1px #004b34' }}>{currentYear}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 z-10 items-center">
          {!isCurrentMonth && (
            <button 
              onClick={handleGoToToday}
              className="px-4 py-2 bg-[#004b34] text-[#f4f1eb] text-sm font-bold tracking-wide rounded-[1rem] hover:bg-[#004b34]/90 transition-all shadow-[0_2px_10px_rgba(0,75,52,0.2)] hover:shadow-[0_4px_15px_rgba(0,75,52,0.3)] hover:-translate-y-0.5 animate-in fade-in duration-300"
            >
              Today
            </button>
          )}
          <button onClick={handlePrevMonth} className="p-3 bg-[#f4f1eb]/80 hover:bg-white rounded-full transition-all duration-200 shadow-sm text-[#004b34] hover:shadow-md hover:-translate-x-1" title="Previous Month">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNextMonth} className="p-3 bg-[#f4f1eb]/80 hover:bg-white rounded-full transition-all duration-200 shadow-sm text-[#004b34] hover:shadow-md hover:translate-x-1" title="Next Month">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 mb-4 border-b-2 border-[#004b34]/20 pb-3">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center font-bold text-sm lg:text-base text-[#004b34]/70 tracking-widest uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-3 lg:gap-y-4 mb-2">
        {days.map((dayObj, i) => (
          <DayCell 
            key={i}
            dateObj={dayObj}
            selectedDate={safeSelectedDate}
            handleDateClick={handleDateClick}
            isToday={
              dayObj.date.getDate() === today.getDate() && 
              dayObj.date.getMonth() === today.getMonth() && 
              dayObj.date.getFullYear() === today.getFullYear()
            }
            hasNotes={checkHasNote(dayObj.date)}
          />
        ))}
      </div>

      {/* Legend identifying Highlights */}
      <div className="flex flex-wrap items-center justify-start space-x-6 mt-4 pt-4 border-t border-[#004b34]/10 text-xs sm:text-sm font-medium text-[#004b34]/80">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#fbbd54] shadow-[0_2px_4px_rgba(251,189,84,0.4)]"></div>
          <span>Current Date</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#45bca5] shadow-[0_2px_4px_rgba(69,188,165,0.4)]"></div>
          <span>Has Note</span>
        </div>
      </div>

      {/* Notes Section - Appears below grid when a date is selected */}
      <div className="flex-1 min-h-[160px]">
        <NotesPanel 
          selectedDate={safeSelectedDate} 
          notes={notes} 
          saveNote={handleSaveNote} 
          deleteNote={handleDeleteNote} 
        />
      </div>

    </div>
  );
};

export default Calendar;
