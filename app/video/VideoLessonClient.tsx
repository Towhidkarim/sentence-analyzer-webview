'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Lock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Subject, Chapter, Lesson } from './data';

interface VideoLessonClientProps {
  initialData: Subject[];
}

export default function VideoLessonClient({
  initialData,
}: VideoLessonClientProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(
    initialData[0]
  );
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(
    initialData[0].chapters[0]
  );
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(
    initialData[0].chapters[0].lessons[0]
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Theme color variable
  const themeColor = '#65d5a3';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLessonSelect = (
    subject: Subject,
    chapter: Chapter,
    lesson: Lesson
  ) => {
    if (lesson.isLocked) return;
    setSelectedSubject(subject);
    setSelectedChapter(chapter);
    setSelectedLesson(lesson);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className='flex text-gray-800 bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 z-40 bg-black lg:hidden'
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? (isMobile ? '80%' : '350px') : '0px',
          x: sidebarOpen ? 0 : isMobile ? -300 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed lg:relative z-50 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col overflow-hidden ${
          !sidebarOpen && !isMobile ? 'invisible w-0' : ''
        }`}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-100'>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <span style={{ color: themeColor }}>
              <BookOpen size={24} />
            </span>
            Course Content
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className='p-1 rounded hover:bg-gray-100'
            title='Close Sidebar'
          >
            {isMobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className='flex-1 overflow-y-auto custom-scrollbar'>
          {initialData.map((subject) => (
            <div key={subject.id} className='mb-2'>
              <div className='sticky top-0 px-4 py-2 text-sm font-semibold tracking-wider text-gray-500 uppercase bg-gray-50'>
                {subject.icon} {subject.title}
              </div>
              {subject.chapters.map((chapter) => (
                <ChapterItem
                  key={chapter.id}
                  chapter={chapter}
                  subject={subject}
                  selectedLesson={selectedLesson}
                  onSelectLesson={handleLessonSelect}
                  themeColor={themeColor}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className='relative flex flex-col flex-1 h-full overflow-hidden'>
        {/* Helper Toggle Button for Desktop when closed */}
        {!sidebarOpen && !isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            className='absolute z-10 p-2 transition-colors bg-white rounded-full shadow-md top-4 left-4 hover:bg-gray-100'
            title='Open Sidebar'
          >
            <Menu size={20} />
          </button>
        )}

        {/* Top Navigation / Breadcrumbs */}
        <header className='flex items-center gap-4 p-4 bg-white border-b border-gray-200'>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className='p-2 rounded hover:bg-gray-100 focus:outline-none'
            >
              <Menu size={20} />
            </button>
          )}
          <div className='flex flex-col'>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <span>{selectedSubject.title}</span>
              <ChevronRight size={14} />
              <span>{selectedChapter.title}</span>
            </div>
            <h1 className='text-xl font-bold truncate'>
              {selectedLesson.title}
            </h1>
          </div>
        </header>

        {/* Video Player Area */}
        <div className='flex-1 overflow-y-auto scroll-smooth'>
          <div className='relative w-full bg-black aspect-video group max-h-[70vh]'>
            {/* Placeholder Player */}
            <iframe
              className='w-full h-full'
              src={selectedLesson.videoUrl}
              title={selectedLesson.title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>

          {/* Lesson Content Tabs/Details */}
          <div className='w-full p-6 mx-auto space-y-6'>
            <div className='flex flex-col gap-4 pb-4 border-b border-gray-200 md:flex-row md:items-center md:justify-between'>
              <div className='flex-1'>
                <h2 className='mb-2 text-2xl font-bold'>
                  {selectedLesson.title}
                </h2>
                <p className='text-gray-600'>{selectedLesson.description}</p>
              </div>
              {/* Action Buttons Example */}
              <button
                className='px-6 py-2 font-medium text-white transition-transform rounded-lg hover:scale-105 active:scale-95 shrink-0'
                style={{ backgroundColor: themeColor }}
              >
                Mark as Complete
              </button>
            </div>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4'>
              <div className='space-y-4 lg:col-span-2 xl:col-span-3'>
                <div className='p-6 bg-white border border-gray-100 shadow-sm rounded-xl'>
                  <h3 className='mb-4 text-lg font-bold'>Lesson Notes</h3>
                  <p className='leading-relaxed text-gray-600'>
                    This is a placeholder for the lesson notes content. In a
                    real application, this would contain rich text, markdown, or
                    additional resources related to the video lesson. You can
                    add more static content here later.
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='p-6 bg-white border border-gray-100 shadow-sm rounded-xl'>
                  <h3 className='mb-4 text-lg font-bold'>Lesson Details</h3>
                  <div className='flex items-center gap-3 mb-2 text-gray-600'>
                    <Clock size={16} />
                    <span>{selectedLesson.duration}</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-600'>
                    <CheckCircle size={16} />
                    <span>Fundamental Concept</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChapterItem({
  chapter,
  subject,
  selectedLesson,
  onSelectLesson,
  themeColor,
}: {
  chapter: Chapter;
  subject: Subject;
  selectedLesson: Lesson;
  onSelectLesson: (s: Subject, c: Chapter, l: Lesson) => void;
  themeColor: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasActiveLesson = chapter.lessons.some(
    (l) => l.id === selectedLesson.id
  );

  // Auto-open if active lesson lies inside (though default is open)
  useEffect(() => {
    if (hasActiveLesson) setIsOpen(true);
  }, [hasActiveLesson]);

  return (
    <div className='border-b border-gray-100 last:border-0'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-gray-50'
      >
        <div className='font-medium text-gray-800'>{chapter.title}</div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className='text-gray-400' />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden bg-gray-50/50'
          >
            {chapter.lessons.map((lesson, idx) => {
              const isActive = lesson.id === selectedLesson.id;
              const isLocked = lesson.isLocked;

              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(subject, chapter, lesson)}
                  disabled={isLocked}
                  className={`w-full px-4 py-3 pl-8 flex items-center gap-3 text-sm transition-all border-l-4 ${
                    isActive
                      ? 'bg-white text-gray-900 font-medium shadow-sm'
                      : 'border-transparent text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    borderLeftColor: isActive ? themeColor : 'transparent',
                  }}
                >
                  <div className='flex-shrink-0'>
                    {isLocked ? (
                      <Lock size={14} className='text-gray-400' />
                    ) : isActive ? (
                      <Play size={14} fill={themeColor} color={themeColor} />
                    ) : (
                      // <div className="w-4 h-4 border border-gray-300 rounded-full" />
                      <Play size={14} className='text-gray-400' />
                    )}
                  </div>
                  <div className='flex-1 text-left line-clamp-1'>
                    {idx + 1}. {lesson.title}
                  </div>
                  <span className='flex-shrink-0 text-xs text-gray-400'>
                    {lesson.duration}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
