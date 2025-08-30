import { FC, useState } from 'react';
import { formConfig } from '../../config/formConfig';
import { FormAnswers, Question } from '../../types/form';
import QuestionComponent from '../QuestionComponent';
import ProgressBar from '../ProgressBar';
import NavigationButtons from './NavigationButtons';
import { useFormValidation } from '../../hooks/useFormValidation';

const MultiStepForm: FC = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const chapter = formConfig[currentChapter];
  const screen = chapter.screens[currentScreen];
  const isLastScreen = currentScreen === chapter.screens.length - 1;

  const { isValid, errors } = useFormValidation(screen.questions, answers);

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log('Form Answers:', answers);
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    if (!isValid) return;
    if (isLastScreen) {
      handleSubmit();
      return;
    }
    setCurrentScreen(currentScreen + 1);
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFF] flex flex-col items-center justify-center px-4 sm:px-6 py-4">
        <div className="w-full max-w-xl text-center bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="bg-green-100 text-green-700 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Thank you!</h2>
            <p className="text-sm sm:text-base">Your form has been successfully submitted.</p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentChapter(0);
              setCurrentScreen(0);
              setAnswers({});
            }}
            className="primary-button w-full max-w-sm text-base sm:text-lg py-3 px-4"
          >
            Start New Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col items-center px-4 sm:px-6 py-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg">
        <div className="p-4 sm:p-6">
          <div className="mb-6 sm:mb-8">
            <ProgressBar
              current={currentScreen + 1}
              total={chapter.screens.length}
            />
          </div>
          
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{screen.title}</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {screen.questions.map((question) => (
              <QuestionComponent
                key={question.id}
                question={question}
                value={answers[question.id]}
                error={errors[question.id]}
                onChange={(value) => handleAnswer(question.id, value)}
              />
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              isFirstScreen={currentScreen === 0}
              isLastScreen={isLastScreen}
              isValid={isValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
