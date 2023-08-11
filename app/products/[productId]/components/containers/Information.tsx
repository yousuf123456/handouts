import React from 'react'
import { ProductInformation } from '../ProductInformation'
import { getProductInfoById } from '@/app/actions/getProductDetailsById/getProductInfoById'
import { ReduxProvider } from '@/app/context/ReduxProvider'
import { Container } from '../Container'
import { CategoriesType } from '@/app/types'
import { getCategoryTree } from '@/app/utils/getCategoryTree'

const renderCategory = (category : any) => {
  const categoryInfo = [{name : category?.name, last : category?.children?.length === 0}];

  if (category?.children?.length > 0) {
    category.children.forEach((childCategory : any) => {
      const childCategoryNames = renderCategory(childCategory);
      categoryInfo.push(...childCategoryNames);
    });
  }

  return categoryInfo;
};


interface InformationProps {
  productId : string
}

export const Information: React.FC<InformationProps> = async({
  productId
}) => {
  const productInfo = await getProductInfoById(productId);
  const categories = productInfo?.categoryTreeData as CategoriesType

  const categoryTree = getCategoryTree(categories ,null)[0];

  if(!productInfo) {
    return (
      <p>Product not found</p>
    )
  }

  return (
    <ReduxProvider>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-1'>
          {
            renderCategory(categoryTree).map((category, index) => (
              <p className='font-text text-rose-600 font-semibold tracking-wide' key={index}>
                {category.name}
                {
                  !category.last && (
                  <span className='ml-1 font-text text-rose-600 font-semibold'>
                    \
                  </span>
                  )
                }
              </p>
            ))
          }
        </div>

        <div className='flex flex-col gap-6'>
          <Container>
            <ProductInformation 
              product={productInfo} 
            />
          </Container>
        </div>
      </div>
    </ReduxProvider>
  )
}
