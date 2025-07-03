import { loadQuizById } from "@/actions/quizLoader";
import QuizPage from "./quizTaker";

export default async function Page({ params }) {
  const { id } = await params
  const { quiz, success, errors } = await loadQuizById(id);

  if (!success) {
    console.error("Failed to load quiz:", errors);
    return <div>Error loading quiz</div>;
  }

  return (
    <div>
      <QuizPage myQuiz={quiz} />
    </div>
  );
}