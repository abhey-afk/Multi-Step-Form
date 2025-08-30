import { FC } from 'react';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isFirstScreen: boolean;
  isLastScreen: boolean;
  isValid: boolean;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  isFirstScreen,
  isLastScreen,
  isValid
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstScreen}
        className="secondary-button w-full text-base sm:text-lg py-4 sm:py-3 px-4"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className={`primary-button w-full text-base sm:text-lg py-4 sm:py-3 px-4 
                   ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLastScreen ? 'Submit' : 'Continue'}
      </button>
    </div>
  );
};

export default NavigationButtons;
