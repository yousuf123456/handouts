import React, { useState } from 'react'
import { FacetHeader } from './FacetHeader'
import { RatingStars } from '@/app/components/RatingStars';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateSearchParam } from '@/app/utils/updateSearchParam';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { addSelectedFacet, removeselectedFacet } from '@/app/store/features/selectedFacetsSlice';
import clsx from 'clsx';

export const RatingFacet = () => {

    const dispatch = useAppDispatch();

    const [collapsed, setIsCollapsed] = useState(false);
    const ratings = [5,4,3,2,1]

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname() || "/"

    function handleQueryChange(query : string, Delete : boolean){
        if (searchParams?.entries()) {
          const updatedSearchParams = updateSearchParam(searchParams, "rating" , query, Delete, true);
          router.push(`${pathName}?${updatedSearchParams.toString()}`, {shallow: true})
        }

        Delete ? dispatch(removeselectedFacet({"rating": query})) : dispatch(addSelectedFacet({"rating": query}))
    }

    const selectedRatingFacet = useAppSelector(state=> state.selectedFacets.facets)["rating"]
    const selectedRatingFacetValue = selectedRatingFacet ? selectedRatingFacet[0] : undefined

  return (
    <div className='flex flex-col gap-3'>
        <FacetHeader 
            facetName='Rating'
            collapsed={collapsed}
            setIsCollapsed={setIsCollapsed}
        />
        
        {
            !collapsed &&
            <div className='flex flex-col gap-1'>
                {
                    ratings.map((rating) => (
                        <div 
                            key={rating}
                            className='flex gap-3 cursor-pointer group'
                            onClick={()=>{
                                let Delete = false
                                if(selectedRatingFacetValue) if(parseInt(selectedRatingFacetValue) === rating) Delete = true
                                handleQueryChange(rating.toString(), Delete)
                            }}
                        >
                            <RatingStars 
                                defaultValue={rating}
                                size='small'
                            />
                            <p 
                                className={clsx('text-sm font-text group-hover:font-semibold group-hover:text-themeBlue',
                                selectedRatingFacetValue && parseInt(selectedRatingFacetValue) === rating && "font-semibold text-themeBlue"
                                )}
                            >
                                & up
                            </p>
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}
