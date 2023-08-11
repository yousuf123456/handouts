import React from 'react'

interface PointProps {
    point : string;
    number : number;
    showNumbering : boolean;
}

export const Point: React.FC<PointProps> = ({
    point,
    number,
    showNumbering
}) => {
  return (
    <>
    {
        showNumbering? (
            <p className='text-sm text-black'>
                { number + " " + point }
            </p>
        ): (
            <p className='text-sm text-black'>
                { point }
            </p>
        )
    }
    </>
  )
}
