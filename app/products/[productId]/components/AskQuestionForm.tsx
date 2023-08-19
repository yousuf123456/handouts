"use client"
import { CtaLink } from '@/app/(site)/components/CtaLink'
import { Button } from '@/app/components/Button'
import { LoadingButton } from '@/app/components/LoadingButton'
import { Textarea } from '@/components/ui/textarea'
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
                <CtaLink href='/user/sign?type=SIGN%20IN'>
                    <span className='mr-2 underline text-themeBlue'>Login</span>
                </CtaLink> 
                or 
                <CtaLink href='/user/sign?type=SIGN%20UP'>
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
            <div className='relative'>
                <Textarea 
                    maxLength={300}
                    value={question}
                    onChange={(e)=> setQuestion(e.target.value)}
                />
                
                <p className='absolute text-xs bottom-2 right-3'>{question.length + "/300"}</p>
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
