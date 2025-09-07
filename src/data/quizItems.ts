import { QuizItem } from "@/types";

export const quizItems: QuizItem[] = [
  {
    id: "intro-pourquoi-mcq-1",
    type: "mcq",
    stem: "Combien d'aidants familiaux apportent une aide régulière à un proche en France ?",
    options: ["5,2 millions", "9,3 millions", "12,1 millions", "7,8 millions"],
    correctAnswers: [1],
    explanation: "En France, 9,3 millions de personnes apportent une aide régulière à un proche en situation de handicap ou de perte d'autonomie.",
    lessonId: "intro-pourquoi",
  },
  {
    id: "intro-pourquoi-tf-1",
    type: "tf",
    stem: "Près d'un aidant sur deux ne se reconnaît pas comme tel.",
    options: ["Vrai", "Faux"],
    correctAnswers: [0],
    explanation: "C'est vrai. Paradoxalement, près d'un aidant sur deux ne se reconnaît pas comme tel, ce qui peut amplifier l'isolement.",
    lessonId: "intro-pourquoi",
  },
];

