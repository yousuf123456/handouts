import { PipelineStage } from "mongoose"
import prisma from "../libs/prismadb"

export const getAutoCompleteSuggestions = async(searchTerm : string)=>{
    const pipeline = [
        {
            $search : {
                index : "autoComplete",
                autocomplete : {
                    query : searchTerm,
                    path : "name",

                    fuzzy : { maxEdits : 1 }
                }
            }
        },

        {
            $limit : 10
        },

        {
            $project : {
                name : 1
            }
        }
    ]


    const autoCompleteSuggestions = await prisma.product.aggregateRaw({
        pipeline : pipeline
    }) as unknown as {name : string}[];

    return autoCompleteSuggestions;
}