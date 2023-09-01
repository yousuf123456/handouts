"use client";
import { Heading } from "@/app/(site)/components/Heading";
import { Avatar } from "@/app/components/Avatar";
import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input2 } from "../../../components/Input2";
import { SelectOptions } from "@/app/components/SelectOptions";
import { DateChooser } from "@/app/components/DatePicker";
import { Button } from "@/app/components/Button";
import clsx from "clsx";
import { User } from "@prisma/client";
import { NavigationPanel } from "@/app/components/NavigationPanel";

type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  birthDay: Date | null;
  gender: string | null;
  image: string | null;
};

interface ProfileProps {
  user: UserType | null | undefined;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, watch, setValue, control } = useForm<FieldValues>({
    defaultValues: {
      prof_name: "",
      prof_email: "",
      prof_phone: "",
    },
  });

  const options = ["Anonymous", "Male", "Female"];

  return (
    <div className="flex flex-col gap-6">
      <NavigationPanel heading="My Profile" />

      <Heading className="hidden sm:block">My Profile</Heading>

      <div className="flex w-full flex-col gap-4 sm:gap-6 md:gap-8 lg:px-6 xl:px-16">
        <div className="flex w-full justify-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20 xl:h-24 xl:w-24">
            <Avatar image={user?.image} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 xl:gap-24">
          <div className="flex w-full flex-col gap-8">
            <Input2
              id="prof_name"
              register={register}
              watch={watch}
              defaultValue={user?.name}
              setValue={setValue}
              label="Name"
              placeholder="Please Enter Your Name"
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type="text"
            />

            <Input2
              id="prof_email"
              label="Email"
              defaultValue={user?.email}
              setValue={setValue}
              register={register}
              watch={watch}
              placeholder="Please Enter Your Email"
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type="email"
            />
          </div>

          <div className="flex w-full flex-col gap-8">
            <Input2
              id="prof_phone"
              label="Phone"
              defaultValue={user?.phone}
              setValue={setValue}
              register={register}
              watch={watch}
              placeholder="Please Enter Your Phone"
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type="text"
            />

            <div className="flex w-full gap-5 md:justify-between md:gap-2">
              <div className="flex flex-col">
                <p className="font-text text-xs font-semibold text-themeSecondary">
                  Birthday
                </p>
                <Controller
                  control={control}
                  name="prof_birthday"
                  render={({ field }) => (
                    <DateChooser
                      disabled={!isEditing || isLoading}
                      field={field}
                      isLoading={isLoading}
                      label="Pick a Date"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <p className="mb-2 font-text text-xs font-semibold text-themeSecondary">
                  Gender
                </p>
                <Controller
                  control={control}
                  name="prof_gender"
                  render={({ field }) => (
                    <SelectOptions
                      disabled={!isEditing || isLoading}
                      field={field}
                      isLoading={isLoading}
                      placeHolder="Your Gender"
                      label="Gender"
                      options={options}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            variant="default"
            size="lg"
            className={clsx(
              "rounded-sm bg-rose-500 px-6 py-1.5 hover:bg-rose-600 active:scale-100",
              isEditing && "bg-themeBlue hover:bg-blue-600",
            )}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>

          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            variant="default"
            size="md"
            className={"rounded-sm px-4 py-1.5 active:scale-100"}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};
