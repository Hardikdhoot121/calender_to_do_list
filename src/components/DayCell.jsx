import React from 'react';
import { isSameDay } from '../utils/dateUtils';

const DayCell = ({ 
  dateObj, 
  selectedDate, 
  handleDateClick, 
  isToday, 
  hasNotes 
}) => {
  const { date, currentMonth } = dateObj;
  
  const isSelected = isSameDay(date, selectedDate);

  let bgClass = "bg-transparent";
  let textClass = currentMonth ? "text-[#004b34]" : "text-gray-400";
  let borderClass = "border-2 border-transparent"; // For selection ring

  // The logic priorities for highlighting:
  if (isToday && hasNotes) {
    // If it's both today AND has a note, we use a gradient to show both legend colors
    bgClass = "bg-gradient-to-br from-[#fbbd54] to-[#45bca5] shadow-sm";
    textClass = "text-white font-bold";
  } else if (hasNotes) {
    // Highlight for having a note
    bgClass = "bg-[#45bca5] shadow-[0_2px_8px_rgba(69,188,165,0.4)]";
    textClass = "text-white font-bold";
  } else if (isToday) {
    // Highlight for being today
    bgClass = "bg-[#fbbd54] shadow-[0_2px_8px_rgba(251,189,84,0.4)]";
    textClass = "text-white font-bold";
  } else if (!isSelected && currentMonth) {
    bgClass = "hover:bg-[#004b34]/10";
  }

  // Draw a visible ring if the user has selected this cell
  if (isSelected) {
    borderClass = "border-[#004b34] outline-dashed outline-2 outline-offset-2 outline-[#004b34]/30";
    if (!isToday && !hasNotes) {
      bgClass = "bg-[#004b34]/10"; // Light darker background if selected but not explicitly highlighted
      textClass = "text-[#004b34] font-bold";
    }
  }

  return (
    <div className={`py-[2px]`}>
      <button
        onClick={() => handleDateClick(date)}
        className={`w-9 h-9 sm:w-10 sm:h-10 mx-auto flex items-center text-sm sm:text-base justify-center rounded-full transition-all duration-200
          ${isSelected ? 'scale-110 z-10' : ''}
          ${!isSelected && currentMonth ? 'hover:scale-110 hover:z-10' : ''}
          ${bgClass}
          ${textClass}
          ${borderClass}
        `}
        title={hasNotes ? "Click to view note" : "Click to add note"}
      >
        <span>{date.getDate()}</span>
      </button>
    </div>
  );
};

export default DayCell;
