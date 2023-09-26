"use client";
import { Input2 } from "@/app/components/Input2";
import { LoadingButton } from "@/app/components/LoadingButton";
import React, { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const SignForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInOrSignUp, setSignInOrSignUp] = useState<"SIGN IN" | "SIGN UP">(
    "SIGN UP",
  );
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const toggleSign = () =>
    setSignInOrSignUp((prev) => (prev === "SIGN UP" ? "SIGN IN" : "SIGN UP"));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (signInOrSignUp === "SIGN IN") {
      // Log the seller in
    } else {
      // Register seller
    }
  };

  return (
    <div className="bg-themeBlue px-12 py-6">
      <div className="flex items-start justify-around gap-16">
        <div className="flex flex-col items-center gap-3 pt-16">
          <h1 className=" font-heading text-[2.7rem] font-bold leading-10 text-white">
            Turn your passion into profit
          </h1>

          <h4 className="font-sans text-lg font-medium text-white">
            Sell your decor items on Handouts and reach millions of buyers.
          </h4>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-white">
            {signInOrSignUp === "SIGN UP"
              ? "Already have an account ?"
              : "Don't have an account ?"}

            <span
              onClick={toggleSign}
              className="ml-2 cursor-pointer text-sm font-semibold text-black hover:underline"
            >
              {signInOrSignUp === "SIGN UP" ? "Sign In here" : "Sign Up here"}
            </span>
          </p>

          <div className="flex w-[460px] flex-col items-center gap-3 rounded-lg bg-white px-6 py-4">
            <h2 className="font-text text-2xl font-semibold text-themeSecondary">
              {signInOrSignUp === "SIGN UP"
                ? "Create Seller Account"
                : "Login To Seller Account"}
            </h2>

            <p className="text-sm text-black">
              Welcome! Millions of Handouts users are waiting to buy your
              product.
            </p>

            <div className="mt-4 w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col gap-4">
                  <Input2
                    id="phone"
                    register={register as any}
                    watch={watch as any}
                    label="Phone number"
                    placeholder="e.g., +92624 466373 734"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />

                  <Input2
                    id="password"
                    register={register as any}
                    watch={watch as any}
                    label="Password"
                    placeholder="Enter your password"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />

                  <LoadingButton
                    className="mt-3"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {signInOrSignUp === "SIGN UP"
                      ? "Create Account"
                      : "Login To Account"}
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
