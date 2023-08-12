import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb"

export async function POST(req: Request) {
    try {
        const { searchTerm } = await req.json();

        const pipeline = [
            {
                $search : {
                    index : "autoComplete",
                    autocomplete : {
                        query : searchTerm,
                        path : "name",
                        tokenOrder : "any",
                        fuzzy : { maxEdits : 1 }
                    }
                }
            },
    
            {
                $limit : 8
            },
    
            {
                $project : {
                    name : 1,
                }
            }
        ]
    
        const autoCompleteSuggestions = await prisma.keyword.aggregateRaw({
            pipeline : pipeline
        }) as unknown as {name : string}[];

        return NextResponse.json(autoCompleteSuggestions);
    }
    
    catch(e) {
        console.log(e)
        return new NextResponse("Internal Server Error !", { status : 500 })
    }
}