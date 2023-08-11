
import { FieldValues, UseFormWatch } from 'react-hook-form'

const hasNumber = (str : string) => {
    const regex = /[0-9]/;
    return regex.test(str);
};

const hasLetter = (str : string) => {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
};

const hasSpecialCharacter = (str : string) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return regex.test(str);
};

const areAllRequirementsMatched = (requirementsMatched : any) => {
    for (const key in requirementsMatched) {
      if (requirementsMatched.hasOwnProperty(key)) {
        if (!requirementsMatched[key]) {
          return false;
        }
      }
    }
    return true;
};


export const useRequirmentsMatcher = (
    id : string,
    watch : UseFormWatch<FieldValues>
)=>{
    const fieldValue = watch(id);
    const requirementsMatched = {
        length : false,
        number : false,
        specialCharecter : false
    }

    if (fieldValue.length >= 8) {
        requirementsMatched.length = true 
    }


    if (hasNumber(fieldValue)) {
        requirementsMatched.number = true
    }

    if (hasSpecialCharacter(fieldValue)) {
        requirementsMatched.specialCharecter = true
    }

    const isRequirementsMatched = areAllRequirementsMatched(requirementsMatched);

    return {
        isRequirementsMatched : isRequirementsMatched,
        requirementsMatched : requirementsMatched
    }
}