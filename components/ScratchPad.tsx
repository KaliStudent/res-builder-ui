'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

export default function ScratchPad() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('scratchPadNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('scratchPadNotes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      content: currentNote.trim(),
      timestamp: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setCurrentNote('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (notes.length === 1) {
      localStorage.removeItem('scratchPadNotes');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddNote();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-2xl w-96 max-h-[600px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="font-semibold">Scratch Pad</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
                aria-label="Minimize"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-b bg-gray-50">
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Brainstorm ideas, notes, or reminders... (Ctrl+Enter to save)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={handleAddNote}
              disabled={!currentNote.trim()}
              className="mt-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              + Add Note
            </button>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm">No notes yet</p>
                <p className="text-xs mt-1">Start brainstorming!</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap flex-1">{note.content}</p>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                      aria-label="Delete note"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notes.length > 0 && (
            <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
              {notes.length} note{notes.length !== 1 ? 's' : ''} saved
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Open scratch pad"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  );
}
