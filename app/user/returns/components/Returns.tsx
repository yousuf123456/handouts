import React from 'react'

import { getUserReturnRequests } from '@/app/actions/getUserReturnRequests';
import { EmptyState } from '../../components/EmptyState';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { ReturnRequestType } from '@/app/types';
import { ReturnRequestCard } from './ReturnRequestCard';
import { PaginationControl } from '../../components/PaginationControl';
import { RETURNS_PER_PAGE } from '@/app/constants/consts';
import { Heading } from '@/app/(site)/components/Heading';

interface ReturnsProps {
  pageNumber : number | undefined;
}

export const Returns: React.FC<ReturnsProps> = async({
  pageNumber
}) => {

  const { 
    data, 
    count 
  } 
  = await getUserReturnRequests({ page : pageNumber }) as unknown as { data : ReturnRequestType[], count : number };

  if(!data || data.length === 0){
    return (
      <EmptyState
          Icon={RiArrowGoBackFill}
          label='There are no returns yet'
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <Heading>
        Returns { "(" + count + ")" }
      </Heading>
      
      <div className='flex flex-col gap-0'>
        {
          data.map((returnRequest, i)=> (
            <ReturnRequestCard
              key={i}
              returnRequest={returnRequest as unknown as ReturnRequestType}
            />
          ))
        }
      </div>

      <PaginationControl
        count={count}
        offset={true}
        ITEMS_PER_PAGE={RETURNS_PER_PAGE}
      />
    </div>
  )
}
