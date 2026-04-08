export function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  
  // Get the first day of the week (0 = Sunday, 1 = Monday ...)
  let startDay = date.getDay();
  
  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      currentMonth: false
    });
  }
  
  // Current month days
  const currentMonthDays = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthDays; i++) {
    days.push({
      date: new Date(year, month, i),
      currentMonth: true
    });
  }
  
  // Next month padding to fill a 6x7 grid (42 cells)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      currentMonth: false
    });
  }
  
  return days;
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}


export function formatDateStr(d) {
  if (!d) return '';
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
