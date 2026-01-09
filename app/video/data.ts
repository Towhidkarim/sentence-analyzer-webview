export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // Placeholder URL
  description: string;
  isLocked: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export const subjects: Subject[] = [
  {
    id: "physics",
    title: "Physics",
    icon: "⚛️",
    color: "#EF4444", // red-500
    chapters: [
      {
        id: "kinematics",
        title: "Kinematics",
        description: "Motion in one and two dimensions",
        lessons: [
          {
            id: "p1",
            title: "Introduction to Motion",
            duration: "10:25",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
            description:
              "Understanding displacement, velocity, and acceleration.",
            isLocked: false,
          },
          {
            id: "p2",
            title: "Projectile Motion",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Analyzing motion in 2D with gravity.",
            isLocked: true,
          },
        ],
      },
      {
        id: "dynamics",
        title: "Dynamics",
        description: "Forces and Newton's Laws",
        lessons: [
          {
            id: "p3",
            title: "Newton's First Law",
            duration: "08:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "The law of inertia explained.",
            isLocked: false,
          },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    title: "Chemistry",
    icon: "🧪",
    color: "#3B82F6", // blue-500
    chapters: [
      {
        id: "atomic-structure",
        title: "Atomic Structure",
        description: "Atoms, isotopes, and ions",
        lessons: [
          {
            id: "c1",
            title: "Protons, Neutrons, and Electrons",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "The building blocks of matter.",
            isLocked: false,
          },
        ],
      },
    ],
  },
  {
    id: "biology",
    title: "Biology",
    icon: "🧬",
    color: "#10B981", // green-500
    chapters: [
      {
        id: "cell-biology",
        title: "Cell Biology",
        description: "Structure and function of cells",
        lessons: [
          {
            id: "b1",
            title: "The Cell Theory",
            duration: "09:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "History and principles of cell biology.",
            isLocked: false,
          },
        ],
      },
    ],
  },
  {
    id: "math",
    title: "Mathematics",
    icon: "📐",
    color: "#F59E0B", // amber-500
    chapters: [
      {
        id: "calculus",
        title: "Calculus",
        description: "Limits, derivatives, and integrals",
        lessons: [
          {
            id: "m1",
            title: "Introduction to Limits",
            duration: "14:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Understanding the concept of limits.",
            isLocked: false,
          },
        ],
      },
    ],
  },
];
