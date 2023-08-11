import React from 'react'

import { HiQuestionMarkCircle, HiCheckCircle } from "react-icons/hi"
import { HeaderInfo } from './mini/HeaderInfo'
import { Review_Question } from './mini/Review_Question'

interface QuestionCardProps {
    // Have to make it real
    question : any
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question
}) => {
  return (
    <div className='p-2 flex flex-col gap-4 bg-blue-50'>
        <div className='flex items-center gap-4'>
            <HiQuestionMarkCircle className='text-blue-500 w-8 h-8' />

            <div className='flex flex-col'>
                <HeaderInfo 
                    name={question.userInformation.name} 
                    date={question.createdAt} 
                />

                <Review_Question>
                    { question.query }
                </Review_Question>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <HiCheckCircle className='text-green-500 w-8 h-8'/>
            {
                question.answer ? (
                    <div className='flex flex-col'>
                        <HeaderInfo name={question.storeInformation.name} date={question.answeredAt} />
                        
                        <Review_Question>
                            { question.answer }
                        </Review_Question>
                    </div>
                ) 
                : (
                    <p className='text-sm font-text text-red-500'>
                        Not Answered Yet By The Store {"(" + question.storeInformation.name + ")" }!
                    </p>
                )
            }
        </div>
    </div>
  )
}
