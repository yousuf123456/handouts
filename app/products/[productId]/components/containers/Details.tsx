import { getProductQuestionsById } from "@/app/actions/getProductDetailsById/getProductQuestionsById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { ProductDetails } from "../ProductDetails";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";
import { heavyAction } from "@/app/actions/heavyAction";

interface DetailsProps {
  productId: string;
}

export default async function Details({ productId }: DetailsProps) {
  // await new Promise((resolver) => setTimeout(resolver, 5000));
  const productInfo = await getProductInfoById(productId);
  // const questionsCount = store.getState().productMinorInfo.questionsCount;

  if (!productInfo) {
    return <p>No product was found</p>;
  }

  return <ProductDetails product={productInfo} />;
}
