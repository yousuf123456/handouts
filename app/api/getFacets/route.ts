import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb"

export async function POST(req : Request){
    try {
        const { searchTerm, category } = await req.json();
        const pipeline = [
            {
                $searchMeta : {
                    index : "productsSearch",
                    facet : {
                        operator : {
                            compound : {
                                must : [
                                    {
                                        text : {
                                            query : searchTerm || category,
                                            path : searchTerm ? "keywords" : "categoryTreeData.name",
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
                                            query : searchTerm || category,
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
                                            query : searchTerm || category,
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
                        },
    
    
                        facets : {
                            colors : {
                                type : "string",
                                path : "attributes.colors"
                            },
                            brand : {
                                type : "string",
                                path : "attributes.brand"
                            },
                            sizes : {
                                type : "string",
                                path : "attributes.sizes"
                            },
                            category : {
                                type : "string",
                                path : "category"
                            }
                        }
                    }
                },
            }
        ]
    
        const facetsData = await prisma.product.aggregateRaw({
            pipeline : pipeline
        }) as any;
        
        return NextResponse.json(facetsData)
    }

    catch(e) {
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}