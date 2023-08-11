import { getCategory } from "@/app/actions/getCategory";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getCategoryTree } from "@/app/utils/getCategoryTree";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{
        const categoriesTreeData = await getCategory({ all : true });
        const categories = categoriesTreeData.map((treeData: any)=> {
            return getCategoryTree(treeData, null)
        })
        
        return NextResponse.json(categories)
    }
    catch(e){
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 501 });
    }
}