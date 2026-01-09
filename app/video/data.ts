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
    id: 'physics',
    title: 'A-Level Physics',
    icon: '⚛️',
    color: '#EF4444', // red-500
    chapters: [
      {
        id: 'mechanics',
        title: 'Mechanics',
        description: 'Motion, forces, and energy in mechanical systems',
        lessons: [
          {
            id: 'p1',
            title: 'Kinematics Fundamentals',
            duration: '12:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Displacement, velocity, acceleration, and graphs of motion. SUVAT equations explained.',
            isLocked: false,
          },
          {
            id: 'p2',
            title: "Newton's Laws of Motion",
            duration: '16:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'F=ma, momentum, impulse, and conservation of momentum in collisions.',
            isLocked: false,
          },
          {
            id: 'p3',
            title: 'Work, Energy, and Power',
            duration: '14:00',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Work done, kinetic energy, potential energy, and conservation of mechanical energy.',
            isLocked: false,
          },
          {
            id: 'p4',
            title: 'Circular Motion',
            duration: '15:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Angular velocity, centripetal acceleration, and forces in circular paths.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'thermodynamics',
        title: 'Thermodynamics',
        description: 'Heat, temperature, and energy transfer',
        lessons: [
          {
            id: 'p5',
            title: 'Temperature and Heat',
            duration: '11:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Internal energy, specific heat capacity, and latent heat.',
            isLocked: false,
          },
          {
            id: 'p6',
            title: 'First Law of Thermodynamics',
            duration: '13:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Energy conservation, pV diagrams, and work done by gases.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'waves-optics',
        title: 'Waves & Optics',
        description: 'Wave motion, sound, light, and electromagnetic radiation',
        lessons: [
          {
            id: 'p7',
            title: 'Wave Properties',
            duration: '14:40',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Wavelength, frequency, speed, superposition, and interference.',
            isLocked: false,
          },
          {
            id: 'p8',
            title: 'Sound Waves',
            duration: '12:25',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Intensity, loudness, Doppler effect, and standing waves.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'electricity-magnetism',
        title: 'Electricity & Magnetism',
        description: 'Electric fields, currents, and magnetic phenomena',
        lessons: [
          {
            id: 'p9',
            title: 'Electric Fields and Potential',
            duration: '15:00',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Electric field strength, potential difference, and energy in electric fields.',
            isLocked: false,
          },
          {
            id: 'p10',
            title: 'DC Circuits',
            duration: '13:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              "Resistance, Ohm's law, EMF, internal resistance, and circuit analysis.",
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    title: 'A-Level Chemistry',
    icon: '🧪',
    color: '#3B82F6', // blue-500
    chapters: [
      {
        id: 'atomic-structure',
        title: 'Atomic Structure & Bonding',
        description: 'Atoms, electrons, and chemical bonding',
        lessons: [
          {
            id: 'c1',
            title: 'Atomic Structure',
            duration: '13:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Protons, neutrons, electrons, electron configuration, and the periodic table.',
            isLocked: false,
          },
          {
            id: 'c2',
            title: 'Ionic Bonding',
            duration: '11:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Electron transfer, ionic compounds, and properties of ionic substances.',
            isLocked: false,
          },
          {
            id: 'c3',
            title: 'Covalent Bonding',
            duration: '14:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Electron sharing, dative bonding, shapes of molecules, and VSEPR theory.',
            isLocked: false,
          },
        ],
      },
      {
        id: 'energetics',
        title: 'Energetics & Kinetics',
        description: 'Energy changes and reaction rates',
        lessons: [
          {
            id: 'c4',
            title: 'Enthalpy and Energy Changes',
            duration: '12:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              "Exothermic and endothermic reactions, Hess's law, and bond enthalpy.",
            isLocked: false,
          },
          {
            id: 'c5',
            title: 'Reaction Rates',
            duration: '15:10',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Rate of reaction, factors affecting rate, and rate equations.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'equilibrium',
        title: 'Equilibrium',
        description: 'Reversible reactions and equilibrium systems',
        lessons: [
          {
            id: 'c6',
            title: 'Chemical Equilibrium',
            duration: '14:35',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              "Reversible reactions, equilibrium constant, and Le Chatelier's principle.",
            isLocked: true,
          },
        ],
      },
      {
        id: 'redox',
        title: 'Redox Reactions',
        description: 'Oxidation, reduction, and electron transfer',
        lessons: [
          {
            id: 'c7',
            title: 'Oxidation and Reduction',
            duration: '13:00',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Oxidation states, redox equations, and balancing redox reactions.',
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'biology',
    title: 'A-Level Biology',
    icon: '🧬',
    color: '#10B981', // green-500
    chapters: [
      {
        id: 'cell-biology',
        title: 'Cell Structure & Organisation',
        description: 'Cells, organelles, and tissues',
        lessons: [
          {
            id: 'b1',
            title: 'Prokaryotic and Eukaryotic Cells',
            duration: '12:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Cell structure, organelles, and differences between cell types.',
            isLocked: false,
          },
          {
            id: 'b2',
            title: 'Membrane Structure and Transport',
            duration: '14:40',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Fluid mosaic model, active transport, diffusion, and osmosis.',
            isLocked: false,
          },
        ],
      },
      {
        id: 'genetics',
        title: 'Genetics & Inheritance',
        description: 'DNA, genes, and heredity',
        lessons: [
          {
            id: 'b3',
            title: 'DNA Structure and Replication',
            duration: '15:25',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Double helix, base pairing, semi-conservative replication, and DNA polymerase.',
            isLocked: false,
          },
          {
            id: 'b4',
            title: 'Gene Expression',
            duration: '16:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Transcription, translation, genetic code, and protein synthesis.',
            isLocked: true,
          },
          {
            id: 'b5',
            title: 'Mendelian Genetics',
            duration: '13:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Inheritance patterns, alleles, dominant and recessive traits, and Punnett squares.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'physiology',
        title: 'Human Physiology',
        description: 'Organ systems and homeostasis',
        lessons: [
          {
            id: 'b6',
            title: 'Nervous System',
            duration: '14:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Neurons, synapses, action potentials, and reflex arcs.',
            isLocked: false,
          },
          {
            id: 'b7',
            title: 'Hormonal Control',
            duration: '13:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Endocrine system, hormones, negative feedback, and homeostasis.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'ecology',
        title: 'Ecology & Organisms',
        description: 'Populations, ecosystems, and sustainability',
        lessons: [
          {
            id: 'b8',
            title: 'Populations and Competition',
            duration: '12:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Population growth, carrying capacity, and intraspecific competition.',
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    title: 'A-Level Mathematics',
    icon: '📐',
    color: '#F59E0B', // amber-500
    chapters: [
      {
        id: 'pure-maths',
        title: 'Pure Mathematics',
        description: 'Algebra, trigonometry, and calculus',
        lessons: [
          {
            id: 'm1',
            title: 'Polynomials and Algebra',
            duration: '15:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Expanding, factoring, solving equations, and polynomial division.',
            isLocked: false,
          },
          {
            id: 'm2',
            title: 'Trigonometry',
            duration: '14:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Sine, cosine, tangent, trigonometric identities, and solving trigonometric equations.',
            isLocked: false,
          },
          {
            id: 'm3',
            title: 'Logarithms and Exponentials',
            duration: '13:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Laws of logarithms, exponential functions, and solving exponential equations.',
            isLocked: false,
          },
          {
            id: 'm4',
            title: 'Differentiation',
            duration: '16:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Limits, derivatives, chain rule, product rule, and applications of differentiation.',
            isLocked: true,
          },
          {
            id: 'm5',
            title: 'Integration',
            duration: '15:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Antiderivatives, definite integrals, integration by substitution, and areas under curves.',
            isLocked: true,
          },
        ],
      },
      {
        id: 'statistics-mechanics',
        title: 'Statistics & Mechanics',
        description: 'Data analysis and applied mechanics',
        lessons: [
          {
            id: 'm6',
            title: 'Probability',
            duration: '12:40',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Probability rules, conditional probability, and probability distributions.',
            isLocked: false,
          },
          {
            id: 'm7',
            title: 'Statistics',
            duration: '13:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Sampling, hypothesis testing, normal distribution, and correlation.',
            isLocked: true,
          },
          {
            id: 'm8',
            title: 'Vectors and Mechanics',
            duration: '14:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description:
              'Vector notation, motion in 2D, and forces in mechanics problems.',
            isLocked: true,
          },
        ],
      },
    ],
  },
];
