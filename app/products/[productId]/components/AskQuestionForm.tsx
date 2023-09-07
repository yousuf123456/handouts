"use client";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Button } from "@/app/components/Button";
import { Button as Button2 } from "@/components/ui/button";

import { LoadingButton } from "@/app/components/LoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Drawer } from "@/app/components/Drawer";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AskQuestionFormProps {
  productId: string;
  setQuestions: any;
  setQuestionsCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const AskQuestionForm: React.FC<AskQuestionFormProps> = ({
  productId,
  setQuestions,
  setQuestionsCount,
}) => {
  const [open, setOpen] = useState(false);

  const session = useSession();

  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSignIn = session.status === "authenticated";

  const askQuestion = () => {
    if (!question) {
      return;
    }
    setQuestion("");
    setIsLoading(true);
    axios
      .post("../../../api/askQuestion", {
        productId: productId,
        query: question,
      })
      .then((res) => {
        if (res.data) {
          const question: Question = res.data;
          setQuestions((prev: Question[]) => [question, ...prev]);
          setQuestionsCount((prev) => prev! + 1);
        }
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  if (!isSignIn) {
    return (
      <p className="font-text text-sm">
        <CtaLink href="/user/sign?type=SIGN%20IN">
          <span className="mr-2 text-themeBlue underline">Login</span>
        </CtaLink>
        or
        <CtaLink href="/user/sign?type=SIGN%20UP">
          <span className="mx-2 text-themeBlue underline">
            Create Handouts Accout
          </span>
        </CtaLink>
        to ask a question about this product.
      </p>
    );
  }

  return (
    <div>
      <div className="hidden flex-col gap-1 sm:flex">
        <h1 className="text-base font-medium text-black">
          Have a question about this product ?
        </h1>

        <div className="flex w-full flex-col gap-2">
          <div className="relative">
            <Textarea
              maxLength={300}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <p className="absolute bottom-2 right-3 text-xs">
              {question.length + "/300"}
            </p>
          </div>

          <div className="w-fit">
            <LoadingButton
              disabled={isLoading}
              isLoading={isLoading}
              onClick={askQuestion}
            >
              Ask Question
            </LoadingButton>
          </div>
        </div>

        <hr className="mt-4" />
      </div>

      <div className="sm:hidden">
        <Button2
          onClick={() => setOpen((prev) => !prev)}
          size="sm"
          className="h-8 text-xs"
        >
          Ask Question
        </Button2>

        <Drawer side="bottom" open={open} setOpen={setOpen}>
          <SheetHeader>
            <SheetTitle>Ask Question</SheetTitle>
          </SheetHeader>

          <div className="mt-3 flex flex-col gap-3">
            <div className="relative">
              <Textarea
                maxLength={300}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <p className="absolute bottom-2 right-3 text-xs">
                {question.length + "/300"}
              </p>
            </div>

            <Button2 size="sm" className="h-8 text-xs">
              Send
            </Button2>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
