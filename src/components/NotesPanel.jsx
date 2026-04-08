import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, StickyNote } from 'lucide-react';
import { formatDateStr } from '../utils/dateUtils';

const NotesPanel = ({ selectedDate, notes, saveNote, deleteNote }) => {
  const currentKey = selectedDate ? formatDateStr(selectedDate) : null;
  const currentNote = currentKey ? notes[currentKey] || '' : '';

  const [text, setText] = useState(currentNote);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state when selection changes
  useEffect(() => {
    if (currentKey) {
      setText(notes[currentKey] || '');
      setIsEditing(!notes[currentKey]); // auto-edit if no note exists
    }
  }, [currentKey, notes]);

  if (!currentKey) return null;

  const handleSave = () => {
    if (text.trim()) {
      saveNote(currentKey, text);
      setIsEditing(false);
    } else {
      deleteNote(currentKey); // Auto-delete if saving empty text
      setIsEditing(false);
    }
  };

  const title = `Notes for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="mt-4 sm:mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-[#004b34]/10 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center space-x-2 mb-3 text-[#004b34]">
        <StickyNote size={18} />
        <h4 className="font-semibold">{title}</h4>
      </div>

      {isEditing ? (
        <div className="flex flex-col space-y-3">
          <textarea
            autoFocus
            className="w-full bg-white/80 border border-[#004b34]/20 text-[#004b34] rounded-lg p-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#fbbd54]/60 transition-all text-sm sm:text-base placeholder:text-[#004b34]/40"
            placeholder=" Hello everyone welcome back to the calender, make your notes here !"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            {currentNote && (
              <button
                onClick={() => { setText(currentNote); setIsEditing(false); }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#004b34]/70 hover:bg-[#004b34]/10 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              className="bg-[#004b34] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#004b34]/90 transition-colors shadow-sm flex items-center space-x-1.5"
            >
              <Check size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="bg-white/80 rounded-lg p-3 min-h-[64px] border border-[#004b34]/10 text-[#004b34] text-sm sm:text-base whitespace-pre-wrap">
            {currentNote}
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <button onClick={() => deleteNote(currentKey)} className="p-1.5 text-rose-500/80 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors" title="Delete note">
              <Trash2 size={16} />
            </button>
            <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#004b34]/70 hover:text-[#004b34] hover:bg-[#004b34]/10 rounded-md transition-colors flex items-center space-x-1" title="Edit note">
              <Edit2 size={16} />
              <span className="text-xs font-semibold">Edit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPanel;
