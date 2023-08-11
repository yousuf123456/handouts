import prisma from "../../libs/prismadb"

export const getProductQuestionsById = async(productId : string) => {

    if (productId === undefined || productId === "undefined" || productId === null) {
        return null
    }

    const productQuestions = await prisma.question.findMany({
        where : {
            productId : productId
        },

        take : 8
    });

    return productQuestions;
}