
import prisma from "../libs/prismadb"

export const getFacets = (async(searchTerm : string)=> {
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
                                        query : searchTerm,
                                        path : "keywords",
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
                                        query : searchTerm,
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
                                        query : searchTerm,
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

    console

    return facetsData
})