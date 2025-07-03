"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
    if (!session) {
        return {
        errors: { general: ["You must be logged in to access this resource"] },
        };
    }
    return {
        user: session.user,
    };
}

export async function loadPreviewQuiz() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  try {
    const quiz = await db.quiz.findMany({
      where: { public: true },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        difficulty: true,
        timeLimit: true,
        category: true,
        allowRetake: true,
        totalAttempts: true,
        averageScore: true,
      },
    });

    if (!quiz || quiz.length === 0) {
      return {
        errors: { general: ["Quiz not found"] },
        success: false,
      };
    }

    return {
      quiz,
      success: true,
    };
  } catch (error) {
    console.error("Error loading preview quiz:", error);
    return {
      errors: { general: ["An unexpected error occurred"] },
      success: false,
    };
  }
}

export async function loadQuizById(quizId) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return {
        errors: { general: ["Quiz not found"] },
        success: false,
      };
    }

    return {
      quiz,
      success: true,
    };
  } catch (error) {
    console.error("Error loading quiz by ID:", error);
    return {
      errors: { general: ["An unexpected error occurred"] },
      success: false,
    };
  }
}

export async function startQuizDb(quizId) {
   const { user } = await getCurrentUser();
  try {
    const questions = await db.question.findMany({
      where: { quizId },
      include: {
        options: true,
      },
    });

    if (!questions || questions.length === 0) {
      return {
        errors: { general: ["No questions found for this quiz"] },
        success: false,
      };
    }

    return {
      questions,
      success: true,
    };
  } catch (error) {
    console.error("Error loading quiz questions:", error);
    return {
      errors: { general: ["An unexpected error occurred"] },
      success: false,
    };
  }
}