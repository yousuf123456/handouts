import Link from 'next/link'
import React from 'react'

interface SuggestionsFeedProps {
    suggestions : {name : string}[];
    onClick : (query: string)=> void
}

export const SuggestionsFeed: React.FC<SuggestionsFeedProps> = ({
    suggestions,
    onClick
}) => {

    if(suggestions.length === 0) return null

  return (
    <div className='p-4 absolute top-10 left-0 w-full bg-white drop-shadow-lg rounded-sm'>   
        <div className='flex flex-col gap-0'>
            {
                suggestions.map((suggestion, i) => (
                    <Link key={i} href={`/search?q=${suggestion.name}&from=input`}>
                        <div onClick={()=> onClick(suggestion.name)} className='p-2 cursor-pointer hover:bg-slate-200'>
                            <h2 className='font-text font-semibold line-clamp-1'>
                                { suggestion.name }
                            </h2>
                        </div>
                    </Link>
                ))
            }
        </div>  
    </div>
  )
}
