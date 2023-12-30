"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input2 } from "../../components/Input2";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { DateChooser } from "@/app/components/DatePicker";
import { SelectOptions } from "@/app/components/SelectOptions";
import { SocialButton } from "./components/SocialButton";
import { LoadingButton } from "@/app/components/LoadingButton";
import { PasswordRequirements } from "./components/PasswordRequirements";
import { useRequirmentsMatcher } from "@/app/hooks/useRequirmentsMatcher";
import { Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import axios from "axios";

interface IParams {
  type?: "SIGN IN" | "SIGN UP";
  callbackUrl: string;
}

export default function Sign({ searchParams }: { searchParams: IParams }) {
  const [signInOrSignUp, setSignInOrSignUp] = useState<"SIGN IN" | "SIGN UP">(
    searchParams.type || "SIGN UP",
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { register, watch, reset, control, handleSubmit } =
    useForm<FieldValues>({
      defaultValues: {
        name: "",
        phone: "",
        code: "",
        email_phone: "",
        password: "",
      },
    });

  const { isRequirementsMatched, requirementsMatched } = useRequirmentsMatcher(
    "password",
    watch,
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isRequirementsMatched) {
      return;
    }

    setIsLoading(true);
    if (signInOrSignUp === "SIGN IN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }

          if (!callback?.error && callback?.ok) {
            toast.success("Logged In Succesfully");
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      // Handle Sign Up here
    }
  };

  const socialSign = async (social: string) => {
    setIsLoading(true);
    signIn(social, {
      redirect: false,
      callbackUrl: searchParams.callbackUrl || "/",
    });
  };

  const iconClassName =
    "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 cursor-pointer";
  const onClick = () => setShow((show) => !show);

  const eyeIcon = show ? (
    <HiEyeOff className={iconClassName} onClick={onClick} />
  ) : (
    <HiEye className={iconClassName} onClick={onClick} />
  );

  const options = ["Anonymous", "Male", "Female"];

  return (
    <>
      <NavigationPanel heading="Sign In / Sign Up" />

      <div className=" flex h-full w-full items-center justify-center overflow-auto bg-slate-200 md:static md:py-16">
        <div className="flex h-full w-full flex-col gap-4 bg-white drop-shadow-lg md:w-auto">
          <div className="mt-8 text-center font-superHeading text-3xl font-bold text-themeSecondary md:mt-3">
            {signInOrSignUp}
          </div>

          <div className="flex h-full w-full flex-col gap-6 px-8 py-6 sm:h-auto md:w-[700px] md:flex-row md:gap-12 lg:w-[780px]">
            <div className="w-full">
              <form id="auth_form" className="flex w-full flex-col gap-4">
                {signInOrSignUp === "SIGN UP" && (
                  <Input2
                    id="phone"
                    register={register}
                    watch={watch}
                    label="Phone number"
                    placeholder="e.g., +92624 466373 734"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />
                )}

                {signInOrSignUp === "SIGN UP" ? (
                  <Input2
                    id="code"
                    register={register}
                    watch={watch}
                    label="Verification Code"
                    placeholder="e.g., 425616"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />
                ) : (
                  <Input2
                    id="email_phone"
                    register={register}
                    watch={watch}
                    label="Email or Phone"
                    placeholder="e.g., aryan@gmail.com"
                    type="email"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />
                )}

                <div className="relative">
                  <Input2
                    id="password"
                    register={register}
                    watch={watch}
                    label="Password"
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    icon={eyeIcon}
                    disabled={isLoading}
                    isLoading={isLoading}
                    required={true}
                    isRequirementsMatched={isRequirementsMatched}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />

                  {isFocused && (
                    <PasswordRequirements
                      isRequirementsMatched
                      requirementsMatched={requirementsMatched}
                    />
                  )}
                </div>

                {signInOrSignUp === "SIGN UP" && (
                  <div className="mt-4 flex justify-between">
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-text text-xs font-semibold text-slate-600">
                        BirthDay
                      </p>
                      <Controller
                        control={control}
                        name="birthDay"
                        render={({ field }) => (
                          <DateChooser
                            field={field}
                            isLoading={isLoading}
                            disabled={isLoading}
                            label="Pick a Date"
                          />
                        )}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-1">
                      <p className="font-text text-xs font-semibold text-slate-600">
                        Gender
                      </p>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                          <SelectOptions
                            field={field}
                            isLoading={isLoading}
                            disabled={isLoading}
                            label="Gender"
                            placeHolder="Gender"
                            options={options}
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="flex w-full flex-col gap-6">
              {signInOrSignUp === "SIGN UP" && (
                <div className="hidden md:block">
                  <Input2
                    id="name"
                    register={register}
                    watch={watch}
                    label="Full name"
                    placeholder="e.g., Aryan Ahmed"
                    type="text"
                    isLoading={isLoading}
                    disabled={isLoading}
                    required={true}
                  />
                </div>
              )}

              <LoadingButton
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
                className="flex justify-center bg-themeBlue font-text font-medium hover:bg-blue-600"
              >
                {signInOrSignUp === "SIGN UP"
                  ? "Create My Handouts Account"
                  : "Login"}
              </LoadingButton>

              <div className="mt-16 flex flex-col gap-6 md:mt-0">
                <div className="relative flex w-full items-center justify-center">
                  <div className="h-[2px] w-full bg-slate-300" />
                  <p className="absolute bg-white px-2 font-text text-xs font-semibold text-themeSecondary">
                    Or Sign Up with
                  </p>
                </div>

                <div className="flex w-full gap-3 md:flex-col">
                  <SocialButton
                    social="google"
                    onClick={socialSign}
                    isLoading={isLoading}
                    text="Google"
                    bg={"bg-red-500 hover:bg-red-600"}
                    icon={<FaGoogle className="h-5 w-5 text-white" />}
                  />
                  <SocialButton
                    social="facebook"
                    onClick={socialSign}
                    isLoading={isLoading}
                    text="Facebook"
                    bg={"bg-slate-800 hover:bg-slate-900"}
                    icon={<FaFacebook className="h-5 w-5 text-white" />}
                  />
                </div>

                <p className="font-text text-xs">
                  {signInOrSignUp === "SIGN IN"
                    ? "Do not have an account ?"
                    : "Already have an account ?"}
                  <span
                    onClick={() => {
                      setSignInOrSignUp((prev) => {
                        reset();
                        if (prev === "SIGN IN") {
                          return "SIGN UP";
                        }
                        return "SIGN IN";
                      });
                    }}
                    className="ml-2 cursor-pointer font-text text-xs font-semibold text-green-500"
                  >
                    {signInOrSignUp === "SIGN IN" ? "Sign Up" : "Sign In"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
