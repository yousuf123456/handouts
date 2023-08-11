import { ReadonlyURLSearchParams } from "next/navigation";


export function updateSearchParam (searchParams: ReadonlyURLSearchParams, param: string, value: string, Delete? : boolean, deleteOldValues? : boolean) {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    if(deleteOldValues && !Delete){
      currentSearchParams.set(param, value);
      return currentSearchParams;
    }

    if (!currentSearchParams.has(param)) {
      currentSearchParams.set(param, value);
    } 
  
    else {
      const existingValues = currentSearchParams.get(param) as string;
      if (Delete) {
        const values = existingValues.split(',');
        const newValues = values.filter(v => v !== value);
        if (newValues.length === 0) {
          currentSearchParams.delete(param);
        } else {
          currentSearchParams.set(param, newValues.join(','));
        }
      }
  
      else currentSearchParams.set(param, `${existingValues},${value}`);
    }
    
    return currentSearchParams;
  }