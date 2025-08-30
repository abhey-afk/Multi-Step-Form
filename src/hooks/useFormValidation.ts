import { useState, useEffect } from 'react';
import { Question, FormAnswers } from '../types/form';

export const useFormValidation = (questions: Question[], answers: FormAnswers) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    const valid = questions.every(question => {
      if (question.required) {
        const answer = answers[question.id];
        const isEmpty = 
          !answer || 
          (Array.isArray(answer) ? answer.length === 0 : answer.trim() === '');
        
        if (isEmpty) {
          newErrors[question.id] = 'This field is required';
          return false;
        }
      }
      return true;
    });

    setErrors(newErrors);
    setIsValid(valid);
  }, [questions, answers]);

  return { isValid, errors };
};
