import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  {
    id: "intro-pourquoi",
    title: "Pourquoi ce manuel pour vous, aidants familiaux ?",
    slug: "intro-pourquoi",
    order: 1,
    sourceRefs: "pages 4",
    readingTimeSec: 180,
    htmlContent: "Contenu de la leçon...",
    quizItemIds: ["intro-pourquoi-mcq-1", "intro-pourquoi-tf-1"],
  },
  {
    id: "intro-role",
    title: "Votre rôle d'aidant : un engagement précieux, souvent invisible",
    slug: "intro-role",
    order: 2,
    sourceRefs: "pages 5",
    readingTimeSec: 200,
    htmlContent: "Contenu de la leçon...",
    quizItemIds: ["intro-role-mcq-1", "intro-role-tf-1"],
  },
  {
    id: "intro-offre",
    title: "Ce que ce manuel vous offre : soutien et outils concrets",
    slug: "intro-offre",
    order: 3,
    sourceRefs: "pages 6",
    readingTimeSec: 220,
    htmlContent: "Contenu de la leçon...",
    quizItemIds: ["intro-offre-mcq-1", "intro-offre-tf-1"],
  },
];

