import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import React from 'react'

interface SkeletonBox {
    className : string;
}

export const SkeletonBox: React.FC<SkeletonBox> = ({
    className
}) => {
  return (
    <Skeleton className={clsx("rounded-[2px]",className)} />
  )
}
