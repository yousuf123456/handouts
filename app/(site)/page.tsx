
import { Hero } from './components/Hero/Hero'
import { FeaturedCategoriesList } from './components/featuredCategoriesList/FeaturedCategoriesList'
import { FlashSaleProductsList } from './components/flashSaleProductsList/FlashSaleProductsList'
import { CategoryDealsList } from './components/categoryDealsList/CategoryDealsList'
import { ExclusiveSections } from './components/exclusiveSections/ExclusiveSections'
import { Categories } from './components/categories/Categories'
import { RecomendedProducts } from './components/RecomendedProducts/RecomendedProducts'
import { MobileHeader } from './components/mobileHeader/MobileHeader'

export default async function Home() {  

  return (
    <div className='pt-16 sm:pt-0 w-full h-full bg-slate-100'>
      <MobileHeader />
      <Hero />
      <div className='px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 pb-24'>
        <FeaturedCategoriesList />
        <FlashSaleProductsList />
        <CategoryDealsList />
        <ExclusiveSections />
        <Categories />
        <RecomendedProducts />
      </div>
    </div>
  )
}