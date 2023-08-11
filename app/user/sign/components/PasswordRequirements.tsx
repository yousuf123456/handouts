import clsx from 'clsx'
import React from 'react'

interface PasswordRequirementsProps {
    requirementsMatched : any,
    isRequirementsMatched : boolean
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
    requirementsMatched,
    isRequirementsMatched
}) => {

    const liClassName = "text-[12px] font-text font-medium"

  return (
    <div className={clsx('absolute max-[768px]:top-20 md:bottom-16 w-full p-6 rounded-sm z-[999] drop-shadow-lg bg-white')}>
        <ul className='ml-4 list-disc space-y-2'>
            <li className={clsx(liClassName, requirementsMatched.length ? "text-green-500" : "text-red-500")}>
                Password length must be 8 or more
            </li>

            <li className={clsx(liClassName, requirementsMatched.number ? "text-green-500" : "text-red-500")}>
                Password must include at least one numeric digit (0-9).
            </li>

            <li className={clsx(liClassName, requirementsMatched.specialCharecter ? "text-green-500" : "text-red-500")}>
                Password must include at least one special character (e.g., !@#$%^&*).
            </li>
        </ul>
    </div>
  )
}
