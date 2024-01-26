interface QuizProps {
  quizNumber: number | null;
}

export const Quiz = ({quizNumber}: QuizProps) => {
  return (
    <div>
      <p>{`Quiz ${quizNumber}`}</p>
    </div>
  );
};
