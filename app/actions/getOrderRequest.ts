
import prisma from "../libs/prismadb"

import { CancellationRequestType, ReturnRequestType } from "../types";

export const getOrderRequest = async (requestId : string, type : "Cancellation" | "Return")=>{

    let orderRequest : CancellationRequestType | ReturnRequestType;

    if(type === "Cancellation"){
        orderRequest = await prisma.cancellationRequest.findUnique({
            where : {
                id : requestId
            },
    
            include : {
                orderedProducts : true
            }
        }) as unknown as CancellationRequestType;
    }

    else {
        orderRequest = await prisma.returnRequest.findUnique({
            where : {
                id : requestId
            },
    
            include : {
                orderedProducts : true
            }
        }) as unknown as ReturnRequestType;    
    }

    return orderRequest
}