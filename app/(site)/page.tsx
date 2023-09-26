import { Hero } from "./components/Hero/Hero";
import { FeaturedCategoriesList } from "./components/featuredCategoriesList/FeaturedCategoriesList";
import { FlashSaleProductsList } from "./components/flashSaleProductsList/FlashSaleProductsList";
import { CategoryDealsList } from "./components/categoryDealsList/CategoryDealsList";
import { ExclusiveSections } from "./components/exclusiveSections/ExclusiveSections";
import { Categories } from "./components/categories/Categories";
import { RecomendedProducts } from "./components/RecomendedProducts/RecomendedProducts";
import { MobileHeader } from "./components/mobileHeader/MobileHeader";

export default async function Home() {
  return (
    <div className="h-full w-full bg-slate-100 pt-16 sm:pt-0">
      <MobileHeader />
      <Hero />
      <div className="flex flex-col gap-8 px-4 pb-24 sm:gap-10 sm:px-8 md:gap-12 md:px-12 lg:gap-14 lg:px-16">
        <FeaturedCategoriesList />
        <FlashSaleProductsList />
        <CategoryDealsList />
        <ExclusiveSections />
        <Categories />
        <RecomendedProducts />
      </div>
    </div>
  );
}
