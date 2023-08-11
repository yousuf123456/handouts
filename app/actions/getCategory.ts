import prisma from "../libs/prismadb"

const getPrismaFormattedData = (data: any)=> {
    const prismaFormattedCategory = {
        id : data._id?.$oid,
        name : data.name,
        parentId : data.parentId?.$oid || null
    }

    return prismaFormattedCategory
}

interface Paramters {
    all? : boolean;
    full? : boolean;
    category? : string | undefined;
}

export const getCategory = async(params : Paramters = {})=> {

    const {
        all,
        full,
        category
    } = params

    const pipeline = [
        {
            $match : {
                ...(!all ? {name : category} : { parentId : null })
            }
        },

        {
            $graphLookup : {
                from: 'Category',
                startWith: "$_id",
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'descendants',
            }
        }
    ]

    !all && pipeline.push({
        $graphLookup : {
            from: 'Category',
            startWith: "$parentId",
            connectFromField: 'parentId',
            connectToField: '_id',
            as: 'ascendants',
        }
    })


    // Because it always return an array
    const categories = await prisma.category.aggregateRaw({
        pipeline : pipeline
    }) as any;

    if(all){
        const categoriesTreeData = categories.map((category: any)=> {
            const parentCategoryData = {
                _id : category._id,
                name : category.name,
                parentId : category.parentId?.$oid || null
            }

            return [
                ...category.descendants,
                parentCategoryData
            ]
        });

        const prismaFormattedData = categoriesTreeData.map((treeData: any)=> {
            return treeData.map((categoryData: any)=> {
                return getPrismaFormattedData(categoryData);
            })
        });

        return prismaFormattedData
    }

    const categoryData = categories[0] as any
    if(!categoryData) return null

    const parentCategoryData = {
        //@ts-ignore
        id : categoryData._id.$oid,
        name : categoryData.name,
        //@ts-ignore
        parentId : categoryData?.parentId?.$oid || null
    }

    //@ts-ignore
    const rawCategoryTreeData = [
        ...categoryData.ascendants,
        ...(full ? categoryData.descendants : [])
    ]

    const prismaFormattedData = rawCategoryTreeData.map((category: any)=> {
        return getPrismaFormattedData(category)
    })

    const prismaFormattedDescendants = categoryData.descendants.map((descendant: any)=> {
        return getPrismaFormattedData(descendant);
    })

    prismaFormattedData.push(parentCategoryData)

    return {
        descendants : prismaFormattedDescendants,
        rawCategoryData : prismaFormattedData, 
        parent : parentCategoryData
    }
}