import React from "react";
import { SectionHeading } from "./SectionHeading";
import { Textarea } from "@/components/ui/textarea";

interface WrittenReviewProps {
  review: string;
  setReview?: React.Dispatch<React.SetStateAction<string>>;
}

export const WrittenReview: React.FC<WrittenReviewProps> = ({
  review,
  setReview,
}) => {
  const placeholder = `3. Product kay experience ke bary main batayen`;
  return (
    <div className="flex items-start gap-3 rounded-md border-[1px] border-slate-300 p-3 max-sm:flex-col sm:gap-8 md:gap-16">
      <SectionHeading>Add Written Review</SectionHeading>

      <Textarea
        value={review}
        placeholder={placeholder}
        className="max-md:min-h-[120px]"
        onChange={(e) => setReview && setReview(e.target.value)}
      />
    </div>
  );
};
