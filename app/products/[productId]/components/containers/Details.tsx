import { getProductQuestionsById } from '@/app/actions/getProductDetailsById/getProductQuestionsById'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { ProductDetails } from '../ProductDetails';
import { getProductInfoById } from '@/app/actions/getProductDetailsById/getProductInfoById';

interface DetailsProps {
  productId : string
}

export const Details: React.FC<DetailsProps> = async({
  productId
}) => {
  const productInfo = await getProductInfoById(productId);
  // const questionsCount = store.getState().productMinorInfo.questionsCount;

    if(!productInfo){
        return (
            <p>No product was found</p>
        )
    }

  return (
    <ProductDetails
        product={productInfo}
    />
  )
}
