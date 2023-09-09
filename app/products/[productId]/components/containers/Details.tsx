import { ProductDetails } from "../ProductDetails";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";

interface DetailsProps {
  productId: string;
}

export default async function Details({ productId }: DetailsProps) {
  const productInfo = await getProductInfoById(productId);
  // const questionsCount = store.getState().productMinorInfo.questionsCount;

  if (!productInfo) {
    return <p>No product was found</p>;
  }

  return <ProductDetails product={productInfo} />;
}
