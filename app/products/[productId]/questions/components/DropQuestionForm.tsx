"use client"
import React, { useState } from 'react'

import { LoadingButton } from '@/app/components/LoadingButton';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Question } from '@prisma/client';
import { PRODUCTS_QUESTIONS_PER_PAGE } from '@/app/constants/consts';

interface DropQuestionFormProps {
    productId : string;
    setQuestions : React.Dispatch<React.SetStateAction<Question[]>>;
    setQuestionsCount : React.Dispatch<React.SetStateAction<number>>;
}

export const DropQuestionForm: React.FC<DropQuestionFormProps> = ({
    productId,
    setQuestions,
    setQuestionsCount
}) => {

    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
     
    const askQuestion = () => {
        if (!question) {
            return ;
        }
        setQuestion("")
        setIsLoading(true)
        axios.post("../../../api/askQuestion", {
            productId : productId,
            query : question
        })
        .then((res) => {
            if (res.data) {
                const question: Question = res.data
                setQuestions((prev: Question[]) => {
                    if(prev.length === PRODUCTS_QUESTIONS_PER_PAGE) prev.pop();
                    return [question, ...prev]
                })
                setQuestionsCount((prev) => prev! + 1)
            }
        })
        .finally(()=>setIsLoading(false))
    }

  return (
    <div className='flex flex-col gap-3'>
        <p className='text-sm font-medium'>
            Drop your question here.
        </p>
        
        <div className='relative'>
            <Textarea
                maxLength={300}
                value={question}
                onChange={(e)=> setQuestion(e.target.value)}
            />

            <p className='absolute text-xs text-black bottom-2 right-3'>{ question.length + " / 300" }</p>
        </div>

        <div className='w-fit'>
            <LoadingButton disabled={isLoading} isLoading={isLoading} onClick={askQuestion}>
                Ask Question
            </LoadingButton>
        </div>
    </div>
  )
}
