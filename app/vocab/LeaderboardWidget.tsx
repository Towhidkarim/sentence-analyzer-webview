'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userImage: string;
  country: string;
  score: number;
  highScore: number;
}

const STATIC_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user001',
    userName: 'Sarah Chen',
    userImage: 'https://i.pravatar.cc/150?img=47',
    country: 'Singapore',
    score: 2850,
    highScore: 2850,
  },
  {
    rank: 2,
    userId: 'user002',
    userName: 'Alex Rodriguez',
    userImage: 'https://i.pravatar.cc/150?img=12',
    country: 'Spain',
    score: 2720,
    highScore: 2720,
  },
  {
    rank: 3,
    userId: 'user003',
    userName: 'Yuki Tanaka',
    userImage: 'https://i.pravatar.cc/150?img=32',
    country: 'Japan',
    score: 2650,
    highScore: 2650,
  },
  {
    rank: 4,
    userId: 'user004',
    userName: 'Emma Wilson',
    userImage: 'https://i.pravatar.cc/150?img=45',
    country: 'United Kingdom',
    score: 2540,
    highScore: 2540,
  },
  {
    rank: 5,
    userId: 'user005',
    userName: 'Mohammed Ali',
    userImage: 'https://i.pravatar.cc/150?img=15',
    country: 'Egypt',
    score: 2430,
    highScore: 2430,
  },
  {
    rank: 6,
    userId: 'user006',
    userName: 'Maria Silva',
    userImage: 'https://i.pravatar.cc/150?img=38',
    country: 'Brazil',
    score: 2310,
    highScore: 2310,
  },
  {
    rank: 7,
    userId: 'user007',
    userName: 'Lucas Schmidt',
    userImage: 'https://i.pravatar.cc/150?img=13',
    country: 'Germany',
    score: 2200,
    highScore: 2200,
  },
  {
    rank: 8,
    userId: 'user008',
    userName: 'Priya Patel',
    userImage: 'https://i.pravatar.cc/150?img=44',
    country: 'India',
    score: 2150,
    highScore: 2150,
  },
  {
    rank: 9,
    userId: 'user009',
    userName: 'David Kim',
    userImage: 'https://i.pravatar.cc/150?img=14',
    country: 'South Korea',
    score: 2080,
    highScore: 2080,
  },
  {
    rank: 10,
    userId: 'user010',
    userName: 'Sophie Martin',
    userImage: 'https://i.pravatar.cc/150?img=41',
    country: 'France',
    score: 1990,
    highScore: 1990,
  },
];

export function LeaderboardWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLeaderboard = () => {
    setIsOpen(true);
  };

  const medalEmojis = ['🥇', '🥈', '🥉'];

  return (
    <>
      {/* Leaderboard Button */}
      <motion.button
        onClick={handleOpenLeaderboard}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 15px rgba(117, 186, 117, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        className='flex items-center justify-center size-9 text-white transition-shadow rounded-lg shadow-md bg-gradient-to-br from-[#75ba75] to-[#5fa75f] hover:shadow-lg'
        title='View Leaderboard'
      >
        <Trophy size={20} />
      </motion.button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
          />
        )}
      </AnimatePresence>

      {/* Modal Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div className='w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'>
              {/* Header */}
              <div className='relative px-6 py-8 overflow-hidden text-center bg-gradient-to-r from-[#75ba75] to-[#6cab6c]'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className='absolute inset-0 opacity-10'
                >
                  <Trophy size={200} className='mx-auto' />
                </motion.div>
                <div className='relative z-10'>
                  <h2 className='mb-2 text-4xl font-bold text-white'>
                    🏆 Global Leaderboard
                  </h2>
                  <p className='text-sm text-green-50'>Top Performers</p>
                </div>
              </div>

              {/* Content */}
              <div className='flex-1 overflow-y-auto p-6 space-y-4'>
                <motion.div className='space-y-3'>
                  {STATIC_LEADERBOARD.map((entry, index) => (
                    <motion.div
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className='relative p-4 overflow-hidden transition-all border cursor-pointer group bg-gradient-to-r from-slate-700/60 to-slate-600/60 hover:from-slate-700/80 hover:to-slate-600/80 rounded-xl border-slate-600/50 hover:border-[#75ba75]/40'
                    >
                      {/* Background Glow */}
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`absolute inset-0 ${
                          index === 0
                            ? 'bg-[#75ba75]/8'
                            : index === 1
                            ? 'bg-[#6cab6c]/6'
                            : index === 2
                            ? 'bg-[#5fa75f]/6'
                            : 'bg-[#75ba75]/4'
                        }`}
                      />

                      <div className='relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4'>
                        {/* Rank Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            delay: index * 0.05,
                            damping: 15,
                          }}
                          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg ${
                            index === 0
                              ? 'bg-gradient-to-br from-[#75ba75] to-[#5fa75f] text-white shadow-lg shadow-[#75ba75]/40'
                              : index === 1
                              ? 'bg-gradient-to-br from-[#6cab6c] to-[#5f9e5f] text-white shadow-lg shadow-[#6cab6c]/30'
                              : index === 2
                              ? 'bg-gradient-to-br from-[#5fa75f] to-[#529a52] text-white shadow-lg shadow-[#5fa75f]/30'
                              : 'bg-gradient-to-br from-slate-600 to-slate-700 text-white'
                          }`}
                        >
                          <span>{medalEmojis[index] || entry.rank}</span>
                        </motion.div>

                        {/* User Info */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 sm:gap-3 mb-1'>
                            <img
                              src={entry.userImage}
                              alt={entry.userName}
                              className='object-cover w-6 h-6 sm:w-8 sm:h-8 border rounded-full border-[#75ba75]/40'
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath fill='white' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                              }}
                            />
                            <div>
                              <p className='text-sm font-semibold text-white truncate'>
                                {entry.userName}
                              </p>
                              <p className='text-xs text-slate-400'>
                                {entry.country}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Score */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            delay: index * 0.05 + 0.1,
                          }}
                          className='flex-shrink-0 text-right self-end sm:self-auto'
                        >
                          <div className='text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-[#75ba75] to-[#6cab6c] bg-clip-text'>
                            {entry.score}
                          </div>
                          <p className='text-xs text-slate-400'>points</p>
                        </motion.div>
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
                        style={{ width: '100%' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Footer */}
              <div className='flex justify-end gap-3 px-6 py-4 border-t bg-slate-900/50 border-slate-700'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='px-6 py-2 font-medium text-white transition-colors rounded-lg bg-slate-700 hover:bg-slate-600'
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
