import { NextResponse } from "next/server";
import { getCurrentUser, getCurrentUserParameters } from "@/app/actions/getCurrentUser";

export async function POST(req: Request){
    try{
        const { address } = await req.json();

        const parameters: getCurrentUserParameters = {
            removeAddress : true,
            address : address
        }
        const currentUser = await getCurrentUser(parameters);

        if(!currentUser || !currentUser.id){
            return new NextResponse("Unauthorized User", { status : 401 })
        }

        return NextResponse.json("Added the address to the diary")
    }
    catch(e){
        return new NextResponse('Internal Server Error', { status : 500 })
    }
}