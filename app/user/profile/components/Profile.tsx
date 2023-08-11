"use client"
import { Heading } from '@/app/(site)/components/Heading'
import { Avatar } from '@/app/components/Avatar'
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Input2 } from '../../../components/Input2'
import { SelectOptions } from '@/app/components/SelectOptions'
import { DateChooser } from '@/app/components/DatePicker'
import { Button } from '@/app/components/Button'
import clsx from 'clsx'
import { User } from '@prisma/client'

type UserType = {
  id : string;
  name : string | null;
  email : string | null;
  phone : string | null;
  birthDay : Date | null;
  gender : string | null;
  image : string | null;
}

interface ProfileProps {
  user : UserType | null | undefined
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, watch, setValue, control } = useForm<FieldValues>({
    defaultValues : {
      prof_name : "",
      prof_email : "",
      prof_phone : ""

    }
  });

  const options = ["Anonymous", "Male", "Female"]

  return (
    <div className='flex flex-col gap-6'>
      <Heading>
        My Profile
      </Heading>

      <div className='px-16 w-full flex flex-col gap-8'>
        <div className='w-full flex justify-center'>
          <div className='relative w-24 h-24 rounded-full overflow-hidden'>
            <Avatar image={user?.image}/>
          </div>
        </div>

        <div className='flex gap-24'>
          <div className='w-full flex flex-col gap-8'>
            <Input2 
              id='prof_name'
              register={register}
              watch={watch}
              defaultValue={user?.name}
              setValue={setValue}
              label='Name'
              placeholder='Please Enter Your Name'
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type='text'
            />

            <Input2 
              id='prof_email'
              label='Email'
              defaultValue={user?.email}
              setValue={setValue}
              register={register}
              watch={watch}
              placeholder='Please Enter Your Email'
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type='email'
            />
          </div>

          <div className='w-full flex flex-col gap-8'>
            <Input2 
              id='prof_phone'
              label='Phone'
              defaultValue={user?.phone}
              setValue={setValue}
              register={register}
              watch={watch}
              placeholder='Please Enter Your Phone'
              required={false}
              isLoading={isLoading}
              disabled={!isEditing || isLoading}
              type="text"
            />

            <div className='w-full flex gap-4 justify-between'>
              <div className='flex flex-col'>
                <p className='font-text text-xs font-semibold text-themeSecondary'>Gender</p>
                <Controller
                  control={control}
                  name='prof_birthday'
                  render={({field}) => (
                    <DateChooser 
                      disabled={!isEditing || isLoading} 
                      field={field} 
                      isLoading={isLoading} 
                      label="Pick a Date" 
                    />
                  )} 
                />
              </div>
              <div className='flex flex-col'>
                <p className='font-text text-xs font-semibold text-themeSecondary'>BirthDay</p>
                <Controller
                  control={control}
                  name='prof_gender'
                  render={({field}) => (
                    <SelectOptions 
                      disabled={!isEditing || isLoading} 
                      field={field} 
                      isLoading={isLoading}  
                      label='Gender' 
                      options={options} 
                    />
                  )} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-8'>
          <Button 
            onClick={()=>setIsEditing((prev)=>!prev)} 
            variant="default" 
            size="lg" 
            className={clsx('py-1.5 px-6 rounded-sm active:scale-100 bg-rose-500 hover:bg-rose-600', isEditing && "bg-themeBlue hover:bg-blue-600")}
          >
            { isEditing ? "Save Changes" : "Edit Profile"}
          </Button>

          <Button 
            onClick={()=>setIsEditing((prev)=>!prev)} 
            variant="default" 
            size="md" 
            className={'py-1.5 px-4 rounded-sm active:scale-100'}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  )
}
