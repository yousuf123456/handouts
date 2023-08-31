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
  const placeholder = `1. Apny Product / Order ki pictures upload karen.
2. Product na pasend any py 1 ya 2 star select karen. 
3. Product kay experience ke bary main batayen`;
  return (
    <div className="flex items-start gap-16 rounded-md border-[1px] border-slate-300 p-3">
      <SectionHeading>Add Written Review</SectionHeading>

      <Textarea
        value={review}
        placeholder={placeholder}
        onChange={(e) => setReview && setReview(e.target.value)}
      />
    </div>
  );
};
