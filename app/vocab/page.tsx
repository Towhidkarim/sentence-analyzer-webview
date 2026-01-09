import React from 'react';
import { VocabTestClient } from './VocabTestClient';

export default function page() {
  return (
    <main className='flex flex-col w-full h-screen overflow-hidden'>
      <h1 className='sr-only'>Vocab</h1>
      <div className='flex items-stretch justify-center flex-1 px-2 py-2 pb-0'>
        <VocabTestClient />
      </div>
    </main>
  );
}
