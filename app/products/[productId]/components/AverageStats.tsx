import Link from "next/link";
import React from "react";

interface AverageStatsProps {
  averageStats: number | undefined;
  label: string;
  href: string;
}

export const AverageStats: React.FC<AverageStatsProps> = ({
  averageStats,
  label,
  href,
}) => {
  return (
    <div className="flex gap-2">
      <p className="font-text text-xs">{averageStats + " " + label}</p>
      {averageStats !== 0 && (
        <Link href={href}>
          <p className="font-roboto text-xs text-themeSecondary underline">
            View All
          </p>
        </Link>
      )}
    </div>
  );
};
