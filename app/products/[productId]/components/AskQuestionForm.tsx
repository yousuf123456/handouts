"use client"
import { CtaLink } from '@/app/(site)/components/CtaLink'
import { Button } from '@/app/components/Button'
import { LoadingButton } from '@/app/components/LoadingButton'
import { Question } from '@prisma/client'
import axios from 'axios'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

interface AskQuestionFormProps {
    productId : string;
    setQuestions : any;
    setQuestionsCount :  React.Dispatch<React.SetStateAction<number | undefined>>
}

export const AskQuestionForm: React.FC<AskQuestionFormProps> = ({
    productId,
    setQuestions,
    setQuestionsCount
}) => {

    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession();
    const isSignIn = session.status === "authenticated";

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
                setQuestions((prev: Question[]) => [question, ...prev])
                setQuestionsCount((prev) => prev! + 1)
            }
        })
        .catch((e) => {
            toast.error(e)
        })
        .finally(()=>setIsLoading(false))
    }

    if (!isSignIn) {
        return (
            <p className='text-sm font-text'>
            <CtaLink href=''>
            <span className='mr-2 underline text-themeBlue'>Login</span>
            </CtaLink> 
            or 
            <CtaLink href=''>
                <span className='mx-2 underline text-themeBlue'>Create Handouts Accout</span>
            </CtaLink> 
            to ask a question about this product.
            </p>
        )
    }

  return (
    <div className='flex flex-col gap-1'>
        <h1 className='text-base font-heading font-medium text-black'>
            Have a question about this product ?
        </h1>

        <div className='w-full flex flex-col gap-2'>
            <div className='relative w-5/6'>
                <textarea 
                    className={clsx(`
                    px-4
                    py-2 
                    w-full  
                    rounded-sm 
                    border-[2px] 
                    font-text
                    resize-none 
                    transition-all 
                    focus-visible:h-32 
                    focus-visible:outline-0
                    focus-visible:border-green-500
                    placeholder:font-text
                    placeholder:font-medium
                    placeholder:text-base
                    `,
                    question.length > 0 ? "h-28 border-green-500" : "h-14 border-green-200 "
                    )} 
                    value={question}
                    onChange={(e)=>setQuestion(e.target.value)}
                    placeholder='Ask a question' 
                    maxLength={300}
                />
                <p className='absolute text-sm bottom-3 right-3'>{question.length + "/300"}</p>
            </div>

            <div className='w-fit'>
                <LoadingButton disabled={isLoading} isLoading={isLoading} onClick={askQuestion}>
                    Ask Question
                </LoadingButton>
            </div>
        </div>

        <hr className='mt-4'/>
    </div>
  )
}
