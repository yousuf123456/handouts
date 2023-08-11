import React from 'react'

interface SuggestionsFeedProps {
    suggestions : {name : string}[]
}

export const SuggestionsFeed: React.FC<SuggestionsFeedProps> = ({
    suggestions
}) => {
  return (
    <div className='p-4 absolute top-10 left-0 w-full bg-white drop-shadow-lg rounded-sm'>   
        <div className='flex flex-col gap-0'>
            {
                suggestions.map((suggestion, i) => (
                    <div key={i} className='p-2 cursor-pointer hover:bg-slate-200'>
                        <h2 className='font-text font-semibold line-clamp-1'>
                            { suggestion.name }
                        </h2>
                    </div>
                ))
            }
        </div>  
    </div>
  )
}
