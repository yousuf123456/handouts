import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

import prisma from "../../libs/prismadb"

type UserWithBehaviourDoc = {
    id : string;
    behaviour : {
        id : string;
        count : number;
        userId : string;
        browsingHistory : {
            categoryTreeData : {}[];
            description : string;
            keywords : string[];
            attributes : any;
            name : string;
        }[];
        browsingHistoryProductIds : string[]
    }
}

export async function POST(req: Request){
    try{
        const currentUser = await getCurrentUser({ getBehaviourDoc : true }) as UserWithBehaviourDoc;

        const {productData, productId} = await req.json();

        if(!currentUser.behaviour){
            const createdBehaviourDoc = await prisma.userBehaviour.create({
                data : {
                    user : {
                        connect : {
                            id : currentUser.id
                        }
                    }
                }
            });

            const updatedBehaviourDoc = await prisma.userBehaviour.update({
                where : {
                    id : createdBehaviourDoc.id
                },

                data : {
                    count : { increment : 1 },
                    browsingHistory : {
                        push : productData
                    },
                    browsingHistoryProductIds : {
                        push : productId
                    }
                }
            });

            return NextResponse.json("Updated the browing history");
        }

        if(currentUser.behaviour.browsingHistoryProductIds.includes(productId)){
            return NextResponse.json("Product is already in the browsing history");
        }

        let valueToIncrement = 1;
        const newBrowsingHistory = currentUser.behaviour.browsingHistory;
        const newBrowingHistoryProductIds = currentUser.behaviour.browsingHistoryProductIds;

        if(currentUser.behaviour.count === 25){
            valueToIncrement = 0;
            newBrowsingHistory.shift();
            newBrowingHistoryProductIds.shift();
        }

        newBrowsingHistory.push(productData);
        newBrowingHistoryProductIds.push(productId);

        const updatedBehaviourDoc = await prisma.userBehaviour.update({
            where : {
                id : currentUser.behaviour.id
            },

            data : {
                browsingHistoryProductIds : newBrowingHistoryProductIds,
                count : { increment : valueToIncrement },
                browsingHistory : newBrowsingHistory,
            }
        });

        return NextResponse.json("Updated the browing history");
    }
    catch(e){
        return new NextResponse("Internal Server Error", { status : 501 })
    }
}