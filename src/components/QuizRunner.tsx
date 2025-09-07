'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { QuizRunnerProps, QuizItem } from '@/types';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  quizItems,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = quizItems[currentIndex];
  const isLastQuestion = currentIndex === quizItems.length - 1;

  useEffect(() => {
    setIsAnswered(false);
    setShowExplanation(false);
  }, [currentIndex]);

  const handleAnswer = (answer: any) => {
    if (isAnswered) return;

    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
    setIsAnswered(true);

    // Check if answer is correct
    const isCorrect = checkAnswer(currentItem, answer);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Show explanation after a short delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const checkAnswer = (item: QuizItem, answer: any): boolean => {
    if (item.type === 'mcq' || item.type === 'tf') {
      return Array.isArray(item.correctAnswers) && 
             item.correctAnswers.includes(answer);
    }
    if (item.type === 'cloze') {
      return Array.isArray(answer) && 
             Array.isArray(item.correctAnswers) &&
             answer.every((ans, idx) => 
               ans.toLowerCase().trim() === 
               (item.correctAnswers[idx] as string).toLowerCase().trim()
             );
    }
    return false;
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = (score / quizItems.length) * 100;
      onComplete(finalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const renderMCQOptions = () => (
    <div className="space-y-3">
      {currentItem.options.map((option, index) => {
        const isSelected = answers[currentIndex] === index;
        const isCorrect = Array.isArray(currentItem.correctAnswers) && 
                         currentItem.correctAnswers.includes(index);
        
        let buttonStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
        
        if (isAnswered) {
          if (isSelected && isCorrect) {
            buttonStyle = "border-green-500 bg-green-50 text-green-800";
          } else if (isSelected && !isCorrect) {
            buttonStyle = "border-red-500 bg-red-50 text-red-800";
          } else if (isCorrect) {
            buttonStyle = "border-green-500 bg-green-50 text-green-800";
          }
        } else if (isSelected) {
          buttonStyle = "border-blue-500 bg-blue-50 text-blue-800";
        }

        return (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={isAnswered}
            className={cn(
              "w-full p-4 text-left border-2 rounded-lg transition-all duration-200",
              buttonStyle,
              isAnswered ? "cursor-default" : "cursor-pointer"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-semibold",
                isAnswered && isSelected && isCorrect ? "border-green-500 bg-green-500 text-white" :
                isAnswered && isSelected && !isCorrect ? "border-red-500 bg-red-500 text-white" :
                isAnswered && isCorrect ? "border-green-500 bg-green-500 text-white" :
                isSelected ? "border-blue-500 bg-blue-500 text-white" :
                "border-slate-300"
              )}>
                {isAnswered && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                 isAnswered && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                 String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderClozeQuestion = () => {
    const parts = currentItem.stem.split('_____');
    const userAnswers = answers[currentIndex] || new Array(parts.length - 1).fill('');

    return (
      <div className="space-y-4">
        <div className="text-lg leading-relaxed">
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <input
                  type="text"
                  value={userAnswers[index] || ''}
                  onChange={(e) => {
                    const newAnswers = [...userAnswers];
                    newAnswers[index] = e.target.value;
                    setAnswers(prev => ({ ...prev, [currentIndex]: newAnswers }));
                  }}
                  disabled={isAnswered}
                  className={cn(
                    "inline-block mx-2 px-3 py-1 border-b-2 bg-transparent text-center min-w-[100px]",
                    isAnswered ? "border-slate-300" : "border-blue-300 focus:border-blue-500 focus:outline-none"
                  )}
                  placeholder="..."
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {!isAnswered && (
          <div className="mt-6">
            <p className="text-sm text-slate-600 mb-3">Mots disponibles :</p>
            <div className="flex flex-wrap gap-2">
              {currentItem.options.map((word, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {word}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleAnswer(userAnswers)}
              disabled={userAnswers.some(answer => !answer.trim())}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Valider
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {currentIndex + 1} sur {quizItems.length}
          </span>
          <span className="text-sm text-slate-500">
            Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / quizItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {currentIndex + 1}
              </span>
            </div>
            <span className="ml-3 text-sm text-slate-500 font-medium">
              {currentItem.type === 'mcq' ? 'Question à choix multiple' :
               currentItem.type === 'tf' ? 'Vrai ou Faux' :
               'Texte à trous'}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-slate-800 leading-relaxed">
            {currentItem.type === 'cloze' ? '' : currentItem.stem}
          </h2>
        </div>

        {/* Answer options */}
        {currentItem.type === 'mcq' || currentItem.type === 'tf' ? 
          renderMCQOptions() : 
          renderClozeQuestion()
        }

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-slate-800 mb-2">Explication :</h4>
            <p className="text-slate-700">{currentItem.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </button>

        {showExplanation && (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isLastQuestion ? 'Terminer le quiz' : 'Question suivante'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

