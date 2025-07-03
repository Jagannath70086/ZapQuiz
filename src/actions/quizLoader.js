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
  const { user, errors } = await getCurrentUser();

  if (errors) {
    return { errors, success: false };
  }

  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      select: {
        id: true,
        title: true,
        public: true,
        questions: true,
        allowRetake: true,
        totalAttempts: true,
      },
    });

    if (!quiz) {
      return {
        errors: { general: ["Quiz not found"] },
        success: false,
      };
    }

    if (!quiz.public) {
      return {
        errors: { general: ["This quiz is not publicly available"] },
        success: false,
      };
    }

    if (!quiz.questions || quiz.questions.length === 0) {
      return {
        errors: { general: ["No questions found for this quiz"] },
        success: false,
      };
    }

    if (!quiz.allowRetake) {
      const existingAttempt = await db.attempt.findFirst({
        where: {
          userId: user.id,
          quizId: quizId,
        },
      });

      if (existingAttempt) {
        return {
          errors: {
            general: [
              "You have already attempted this quiz and retakes are not allowed",
            ],
          },
          success: false,
        };
      }
    }

    const result = await db.$transaction(async (prisma) => {
      const attempt = await prisma.attempt.create({
        data: {
          userId: user.id,
          quizId: quizId,
          answers: [],
          score: 0,
          percentage: 0,
          startedAt: new Date(),
        },
      });

      await prisma.quiz.update({
        where: { id: quizId },
        data: {
          totalAttempts: {
            increment: 1,
          },
        },
      });

      return { questions: quiz.questions };
    });

    return {
      questions: result.questions,
      success: true,
    };
  } catch (error) {
    return {
      errors: {
        general: ["An unexpected error occurred while starting the quiz"],
      },
      success: false,
    };
  }
}
