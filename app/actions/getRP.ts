import { ObjectId } from "mongodb"
import prisma from "../libs/prismadb"

export const getRP = async()=> {

    const objectId = new ObjectId("64bd1974b6cbecb92c110ec5");
    const timeStamp = objectId.getTimestamp()

    const rp = await prisma.product.findMany({

        where : {
            id : {lt : "64bd1974b6cbecb92c110ec5"}
        },

        take : 3,

        select : {
            id : true,
            name : true
        },
        orderBy :[ {
            id : "desc"
        }],
    })

    const rpSortedByIdAsc = rp.sort((a, b) => a.id.localeCompare(b.id));
    return rpSortedByIdAsc
} 