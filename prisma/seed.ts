import { NoQuestions_ReviewsMessage } from "./../app/products/[productId]/components/mini/NoQuestions_ReviewsMessage";
import { Product, Store } from "@prisma/client";
import prisma from "../app/libs/prismadb";
import { faker } from "@faker-js/faker";
import { OrderedProductType } from "@/app/types";
import { ObjectId } from "mongodb";

export const getCategory = async (category: string | undefined) => {
  const pipeline = [
    {
      $match: {
        name: category,
      },
    },

    {
      $graphLookup: {
        from: "Category",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentId",
        as: "categoryTree",
      },
    },
  ];

  // Because it always return an array
  const categories = await prisma.category.aggregateRaw({
    pipeline: pipeline,
  });

  const categoryData = categories[0] as any;
  if (!categoryData) return null;

  const parentCategoryData = {
    //@ts-ignore
    id: categoryData._id.$oid,
    name: categoryData.name,
    //@ts-ignore
    parentId: categoryData.parentId?.$oid || null,
  };

  //@ts-ignore
  const rawCategoryTreeData = categoryData.categoryTree;

  const prismaFormattedData = rawCategoryTreeData.map((category: any) => {
    const prismaFormattedCategory = {
      id: category._id.$oid,
      name: category.name,
      parentId: category.parentId.$oid,
    };

    return prismaFormattedCategory;
  });

  prismaFormattedData.push(parentCategoryData);

  return {
    rawCategoryData: prismaFormattedData,
    parent: parentCategoryData,
  };
};

async function main() {
  // const colorNames = [
  //     'Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink',
  //     'Black', 'White', 'Gray', 'Brown', 'Cyan', 'Magenta', 'Gold', 'Silver'
  // ];
  // const sizes = ['Small', 'Medium', 'Large', 'Extra Large', 'XXL'];
  // function createRandomProduct()  {
  //     const prefix = "SKU"
  //     const suffix = "-2023"
  //     const colorIndex1 = Math.floor(Math.random() * colorNames.length);
  //     const colorIndex2 = Math.floor(Math.random() * colorNames.length);
  //     const colorIndex3 = Math.floor(Math.random() * colorNames.length);
  //     const sizeIndex1 = Math.floor(Math.random() * sizes.length);
  //     const sizeIndex2 = Math.floor(Math.random() * sizes.length);
  //     return {
  //         SKU : prefix + faker.string.alpha() + suffix,
  //         name : faker.commerce.productName() ,
  //         description : faker.commerce.productDescription(),
  //         image : faker.image.url(),
  //         details : [faker.commerce.productDescription(), faker.commerce.productDescription()],
  //         attributes : {
  //             colors : [colorNames[colorIndex1], colorNames[colorIndex2],  colorNames[colorIndex3]],
  //             sizes : [sizes[sizeIndex1], sizes[sizeIndex2]],
  //             brand : faker.company.name(),
  //         },
  //         price : parseInt(faker.commerce.price()),
  //         quantity : faker.number.int()
  //     };
  // }
  // function createRandomStore () {
  //     return {
  //         name : faker.person.fullName(),
  //         logo : faker.image.avatar(),
  //     }
  // }
  // function createRandomVendor(){
  //     return {
  //         name : faker.person.fullName(),
  //         email : faker.internet.email(),
  //         hashedPassword : faker.internet.password(),
  //         image : faker.image.avatar()
  //     }
  // }
  // function createRandomDiscount() {
  //     return {
  //         name : faker.string.alpha(),
  //         isPercentOff : faker.datatype.boolean(),
  //         percentOff : Math.floor(Math.random() * 40),
  //         ammountOff : Math.floor(Math.random() * 100),
  //         priceThreshold : faker.number.int(),
  //         startingDate : faker.date.anytime(),
  //         endingDate : faker.date.anytime(),
  //     }
  // }
  // function createVariant(){
  //     const variants = {
  //         color : {
  //             title : "Color",
  //             red : {
  //                 title : "Red",
  //                 images : [faker.image.url()]
  //             },
  //             blue : {
  //                 title : "Blue",
  //                 images : [faker.image.url()]
  //             }
  //         },
  //         size : {
  //             title : "Size",
  //             sm : {
  //                 title : "sm",
  //                 images : []
  //             },
  //             md : {
  //                 title : "md",
  //                 images : []
  //             },
  //             lg : {
  //                 title : "lg",
  //                 images : []
  //             }
  //         }
  //     }
  //     return variants
  // }
  // async function DeleteAllDataBaseRecords(){
  //     await prisma.discount.deleteMany();
  //     await prisma.product.deleteMany();
  //     await prisma.store.deleteMany();
  //     await prisma.vendor.deleteMany();
  //     // await prisma.category.deleteMany();
  //     await prisma.question.deleteMany();
  // }
  // await DeleteAllDataBaseRecords();
  // const categories = [
  //     [
  //         {
  //           id: "1",
  //           name: "Decor",
  //           parentId: null
  //         },
  //         {
  //           id: "2",
  //           name: "Wall Arts",
  //           parentId: "1"
  //         }
  //     ],
  //     [
  //         {
  //           id: "3",
  //           name: "Wall Arts",
  //           parentId: "1"
  //         },
  //         {
  //           id: "4",
  //           name: "Picture Frames",
  //           parentId: "3"
  //         }
  //     ],
  //     [
  //         {
  //           id: "5",
  //           name: "Decor",
  //           parentId: null
  //         },
  //         {
  //           id: "6",
  //           name: "Candles",
  //           parentId: "5"
  //         }
  //     ],
  //     [
  //         {
  //           id: "7",
  //           name: "Decor",
  //           parentId: null
  //         },
  //         {
  //           id: "8",
  //           name: "Vases",
  //           parentId: "7"
  //         }
  //     ],
  //     [
  //         {
  //           id: "9",
  //           name: "Decor",
  //           parentId: null
  //         },
  //         {
  //           id: "10",
  //           name: "Clocks",
  //           parentId: "9"
  //         }
  //     ],
  //     [
  //         {
  //           id: "11",
  //           name: "Wall Arts",
  //           parentId: "1"
  //         },
  //         {
  //           id: "12",
  //           name: "Posters",
  //           parentId: "11"
  //         }
  //     ],
  //     [
  //         {
  //           id: "13",
  //           name: "Picture Frames",
  //           parentId: "2"
  //         },
  //         {
  //           id: "14",
  //           name: "Collage Frames",
  //           parentId: "13"
  //         }
  //     ],
  //     [
  //         {
  //           id: "15",
  //           name: "Candles",
  //           parentId: "1"
  //         },
  //         {
  //           id: "16",
  //           name: "Scented Candles",
  //           parentId: "15"
  //         }
  //     ],
  //     [
  //         {
  //           id: "17",
  //           name: "Vases",
  //           parentId: "1"
  //         },
  //         {
  //           id: "18",
  //           name: "Flower Vases",
  //           parentId: "17"
  //         }
  //     ],
  //     [
  //         {
  //           id: "19",
  //           name: "Lighting",
  //           parentId: "1"
  //         },
  //         {
  //           id: "20",
  //           name: "Hanging Lamps",
  //           parentId: "19"
  //         }
  //     ]
  // ]
  // for (let index = 0; index < 10; index++) {
  //     const vendor = createRandomVendor();
  //     const store = createRandomStore();
  //     const discount = createRandomDiscount();
  //     const category = categories[index]
  //     const Vendor = await prisma.vendor.create({
  //         data : vendor
  //     });
  //     const Store = await prisma.store.create({
  //         data : {
  //             ...store,
  //             vendor : {
  //                 connect : {
  //                     id : Vendor.id
  //                 }
  //             }
  //         }
  //     });
  //     const Discount = await prisma.discount.create({
  //         data : {
  //             ...discount,
  //             ...(index % 2 === 0 ? {isApplicableForStore : true} : {isApplicableForStore : false}),
  //             store : {
  //                 connect : {
  //                     id : Store.id
  //                 }
  //             }
  //         }
  //     });
  //     for (let index = 0; index < 10; index++) {
  //         const variants = createVariant();
  //         const product = createRandomProduct();
  //         const nameWords = product.name.split(' ');
  //         const keyword = nameWords[Math.floor(Math.random() * nameWords.length)];
  //         await prisma.product.create({
  //             data : {
  //                 ...product,
  //                 category : category[0].name,
  //                 categoryTreeData : category,
  //                 storeName : Store.name as string,
  //                 ...({
  //                     discount : {
  //                         connect : {
  //                             id : Discount.id
  //                         }
  //                     }
  //                 }),
  //                 ...(index % 2 === 0 ? { variants : variants } : {}),
  //                 store : {
  //                     connect : {
  //                         id : Store.id
  //                     }
  //                 },
  //                 keywords : [keyword]
  //             },
  //         })
  //     }
  // }
  //sep
  // const categories = [
  //   {
  //     name : "Home",
  //     children : {
  //       create : {
  //         name : "Wall Arts",
  //         children : {
  //           create : {
  //             name : "Picture Frames"
  //           }
  //         }
  //       }
  //     }
  //   },
  //   {
  //     name : "Decor",
  //     children : {
  //       create : {
  //         name : "Beds",
  //         children : {
  //           create : {
  //             name : "Bed Sheets"
  //           }
  //         }
  //       }
  //     }
  //   },
  //   {
  //     name : "Paintings",
  //     children : {
  //       create : {
  //         name : "Oil Painting"
  //       }
  //     }
  //   },
  //   {
  //     name : "Hand Arts",
  //     children : {
  //       create : {
  //         name : "Calliography"
  //       }
  //     }
  //   },
  //   {
  //     name : "Lounge",
  //     children : {
  //       create : {
  //         name : "Comfort",
  //         children : {
  //           create : {
  //             name : "Sofas"
  //           }
  //         }
  //       }
  //     }
  //   }
  // ]
  // const categoriesNames = await prisma.category.findMany({
  //   where : {
  //     name : { in : ["Lounge", "Home", "Decor", "Paintings", "Hand Arts"] }
  //   }
  // });
  // const categoriesTreeData = await Promise.all(categoriesNames.map(async(categoryName, i)=> {
  //   const categoryData = await getCategory(categoryName.name);
  //   return categoryData
  // }));
  // const names = ["Lounge", "Home", "Decor", "Paintings", "Hand Arts"]
  // const products = await prisma.product.findMany({ skip : 80, take : 20 })
  // const productsIds = products.map((product)=> product.id)
  // await prisma.product.updateMany({
  //   where : {
  //     id : {
  //       in : productsIds
  //     }
  //   },
  //   data : {
  //     category : categoriesTreeData[4]?.parent.name,
  //     categoryTreeData : categoriesTreeData[4]?.rawCategoryData
  //   }
  // })
  // sep
  // const users = await prisma.user.findMany();
  // users.forEach(async (user) => {
  //   const updatedAddressDiary = user.addressDiary.map((address: any) => ({
  //     ...address,
  //     _id: new ObjectId(),
  //   }));
  //   await prisma.user.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       addressDiary: updatedAddressDiary,
  //     },
  //   });
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
