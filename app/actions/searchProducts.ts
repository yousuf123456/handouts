
import prisma from "../libs/prismadb"
import { IParams } from "../types";
import { getFilterObjects } from "../filter/getFilterObjects";

export const searchProducts = async (params : IParams, category: String | undefined)=>{
    const filterArray = []
    const { 
        categoryObject,
        colorsObject,
        sizesObject,
        brandObject,
        priceObject,
        ratingObject

    } = getFilterObjects(params, category);

    if(category !== "search") filterArray.push(categoryObject)
    if(params.brand) filterArray.push(brandObject)
    if(params.sizes) filterArray.push(sizesObject)
    if(params.colors) filterArray.push(colorsObject)
    if(params.price) filterArray.push(priceObject)
    if(params.rating) filterArray.push(ratingObject)

    const query = params.q || params.category
    const queryPath = params.q ? "keywords" : "category"


    const pipeline = [
        {
            $search : {
                index : "productsSearch",
                compound : {
                    must : [ 
                        {
                            text : {
                                query : params.q || category,
                                path : params.q ? "keywords" : "categoryTreeData.name",
                                fuzzy : {
                                    maxEdits : 1
                                },
                                score : {
                                    function : {
                                        multiply: [
                                            {
                                                path: {
                                                value: "avgRating",
                                                undefined: 2
                                                }
                                            },
                                            {
                                                score: "relevance"
                                            }
                                            ]
                                    }
                                }
                            }
                        }
                    ],

                    should : [
                        {
                            text : {
                                query : params.q || category,
                                path : "name",
                                score : {
                                    boost : {
                                        value : 2.5
                                    }
                                }
                            }
                        },
                        {
                            text : {
                                query : params.q || category,
                                path : "description",
                                score : {
                                    boost : {
                                        value : 1.5
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        },
        
        { $limit : 15 },

        {
            $lookup : {
                from : "Discount",
                localField : "discountId",
                foreignField : "_id",
                as : "discount"
            }
        },

        {
            $addFields: {
                discount: { $arrayElemAt: ['$discount', 0] },
            },
        },

        {
            $project : {
                id : 1,
                name : 1,
                image : 1,
                price : 1,
                ratings : 1,
                ratingsCount : 1,
                avgRating : 1,
                discount : 1,
            }
        }    
    ]

    //@ts-ignore
    if (pipeline[0].$search?.compound) pipeline[0].$search.compound.filter = filterArray


    const searchProducts = await prisma.product.aggregateRaw({
        //@ts-ignore
        pipeline : pipeline
    }) as any;

    return searchProducts;
}