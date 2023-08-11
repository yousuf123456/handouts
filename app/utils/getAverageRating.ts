export const getAverageRating = (ratings : number[])=>{
    const total_ratings = ratings.length
    if (total_ratings == 0){
        return 0
    }

    const sum_ratings = ratings.reduce((partialSum, a) => partialSum + (a ?? 0), 0);
    const average_rating = sum_ratings / total_ratings
    const rounded_rating = Math.round(average_rating * 2) / 2
    return rounded_rating
}