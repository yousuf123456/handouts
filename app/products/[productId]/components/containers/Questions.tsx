import React from 'react'
import { ProductQuestions } from '../ProductQuestions'
import { getProductQuestionsById } from '@/app/actions/getProductDetailsById/getProductQuestionsById'
import { ReduxProvider } from '@/app/context/ReduxProvider'

interface QuestionsProps {
  productId : string
}

export const Questions: React.FC<QuestionsProps> = async({
  productId
}) => {
  const questions = await getProductQuestionsById(productId);
  // const questionsCount = store.getState().productMinorInfo.questionsCount;

  return (
    <ReduxProvider>
      <ProductQuestions 
        initialQuestions={questions}
        productId={productId}
      />
    </ReduxProvider>
  )
}
