import Link from 'next/link'
import React from 'react'

interface AverageStatsProps {
    averageStats : number | undefined,
    label : string;
    href : string
}

export const AverageStats: React.FC<AverageStatsProps> = ({
    averageStats,
    label,
    href
}) => {
  return (
    <div className='flex gap-2'>
        <p className='text-xs font-text'>
            { averageStats + " " + label  }
        </p>
        {
            averageStats !== 0 && (
                <Link href={href}>
                    <p className='text-xs underline font-text font-semibold text-themeSecondary'>
                        View All
                    </p>
                </Link>
            )
        }
    </div>
  )
}
