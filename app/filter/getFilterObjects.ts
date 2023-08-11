import { IParams } from "../types"


export const getFilterObjects = (params : IParams, category : String | undefined) => {

  const paramsColors = params.colors?.split(",");
  const paramsSizes = params.sizes?.split(",");
  const paramsBrand = params.brand?.split(",");
  const paramsPrice = params.price?.split("-") as string[];
  const paramsRating = params.rating as string

  const categoryObject = {
    text : {
      query : category,
      path : "categoryTreeData.name"
    }
  }

  const colorsObject = {
    text : {
      query : paramsColors,
      path : "attributes.colors"
    }
  }

  const sizesObject = {
    text : {
      query : paramsSizes,
      path : "attributes.sizes"
    }
  }

  const brandObject = {
    text : {
      query : paramsBrand,
      path : "attributes.brand"
    }
  }

  const priceObject = {
    range : {
      gte : parseInt(paramsPrice && paramsPrice[0]),
      lte : parseInt(paramsPrice && paramsPrice[1]),
      path : "price"
    }
  }

  const ratingObject = {
    range : {
      gte : parseInt(paramsRating && paramsRating),
      path : "avgRating"
    }
  }

  return {
    categoryObject,
    colorsObject,
    sizesObject,
    brandObject,
    priceObject,
    ratingObject
  }
}