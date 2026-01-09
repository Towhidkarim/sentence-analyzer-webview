import React from 'react';
import VideoLessonClient from './VideoLessonClient';
import { subjects } from './data';

export default function page() {
  return <VideoLessonClient initialData={subjects} />;
}
