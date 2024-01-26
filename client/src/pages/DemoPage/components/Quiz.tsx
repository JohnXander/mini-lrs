interface QuizProps {
  quizNumber: number;
}

export const Quiz = ({quizNumber}: QuizProps) => {
  return (
    <div>
      <p>{`Quiz ${quizNumber}`}</p>
    </div>
  );
};
