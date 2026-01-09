// All fields are optional since AI responses may have incomplete data

export interface BasicInfo {
  sentenceType?: string;
  structure?: string;
  mood?: string;
  voice?: string;
  tense?: string;
  wordCount?: number;
  complexityScore?: string;
}

export interface Transformations {
  simple?: string | null;
  compound?: string | null;
  complex?: string | null;
  passive?: string | null;
  active?: string | null;
  negative?: string | null;
  question?: string | null;
}

export interface SubjectComponent {
  text?: string;
  type?: string;
}

export interface PredicateComponent {
  text?: string;
  mainVerb?: string;
  verbPhrase?: string;
}

export interface GrammaticalComponents {
  subject?: SubjectComponent | null;
  predicate?: PredicateComponent | null;
  object?: string | null;
  complement?: string | null;
  modifiers?: string[];
}

export interface Clauses {
  independent?: string[];
  dependent?: string[];
}

export interface Phrases {
  noun?: string[];
  verb?: string[];
  prepositional?: string[];
  participial?: string[];
  infinitive?: string[];
  gerund?: string[];
}

export interface NounWord {
  word?: string;
  type?: string;
}

export interface Adjectives {
  positive?: string[];
  comparative?: string[];
  superlative?: string[];
}

export interface Conjunctions {
  coordinating?: string[];
  subordinating?: string[];
  correlative?: string[];
}

export interface WordsAnalysis {
  nouns?: NounWord[];
  verbs?: string[];
  adjectives?: Adjectives;
  adverbs?: string[];
  pronouns?: string[];
  prepositions?: string[];
  conjunctions?: Conjunctions;
}

export interface Punctuation {
  marks?: string[];
  correctness?: string;
  suggestions?: string[];
}

export interface DifficultyRating {
  score?: number;
  reasoning?: string;
}

export interface Analysis {
  original?: string;
  corrected?: string;
  hasErrors?: boolean;
  basicInfo?: BasicInfo;
  transformations?: Transformations;
  grammaticalComponents?: GrammaticalComponents;
  clauses?: Clauses;
  phrases?: Phrases;
  wordsAnalysis?: WordsAnalysis;
  punctuation?: Punctuation;
  errors?: string[];
  improvements?: string[];
  learningTips?: string[];
  keyGrammarConcepts?: string[];
  difficultyRating?: DifficultyRating;
}

export interface AnalysisResponse {
  success?: boolean;
  analysis?: Analysis;
  error?: string;
}
