

interface Parameters {
    toPut? : boolean,
    toRetrieve? : boolean,
    category? : string
}

function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const formatCategoryParam = (params : Parameters = {})=> {
    const {
        toPut,
        toRetrieve,
        category
    } = params

    if(toPut){
        const formattedCategory = category?.split(" ").map((word)=> word.toLowerCase()).join("-")
        return formattedCategory
    }

    else {
        const formattedCategory = category?.split("-").map((word)=> capitalizeWord(word)).join(" ")
        return formattedCategory     
    }
}