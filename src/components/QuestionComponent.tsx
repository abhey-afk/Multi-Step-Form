import React, { FC } from 'react';
import { Question } from '../types/form';

interface QuestionComponentProps {
  question: Question;
  value?: string | string[];
  error?: string;
  onChange: (value: string | string[]) => void;
}

const QuestionComponent: FC<QuestionComponentProps> = ({ question, value, error, onChange }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl 
                     focus:border-[#1CB0F6] focus:ring-2 focus:ring-[#1CB0F6] focus:outline-none"
            placeholder="Type your answer..."
          />
        );

      case 'radio':
        return (
          <div className="space-y-2 sm:space-y-3">
            {question.options?.map((option) => (
              <div
                key={option}
                onClick={() => onChange(option)}
                className={`p-3 sm:p-4 text-base sm:text-lg border-2 rounded-xl cursor-pointer
                          ${value === option 
                            ? 'border-[#58CC02] bg-[#E5F6E7] text-[#58CC02]' 
                            : 'border-gray-200 hover:border-[#1CB0F6]'}`}
              >
                {option}
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2 sm:space-y-3">
            {question.options?.map((option) => (
              <div
                key={option}
                onClick={() => {
                  const currentValues = (value as string[]) || [];
                  const newValues = currentValues.includes(option)
                    ? currentValues.filter(v => v !== option)
                    : [...currentValues, option];
                  onChange(newValues);
                }}
                className={`p-3 sm:p-4 text-base sm:text-lg border-2 rounded-xl cursor-pointer
                          ${(value as string[] || []).includes(option)
                            ? 'border-[#58CC02] bg-[#E5F6E7] text-[#58CC02]'
                            : 'border-gray-200 hover:border-[#1CB0F6]'}`}
              >
                {option}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="block text-base sm:text-lg font-medium text-gray-800">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderQuestion()}
      {error && (
        <p className="text-sm sm:text-base text-[#FF4B4B] font-medium mt-2">{error}</p>
      )}
    </div>
  );
};

export default QuestionComponent;
