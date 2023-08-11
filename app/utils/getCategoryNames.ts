

export const getCategoryNames = (category : any) => {
  const categoryInfo = [{name : category?.name, last : category?.children?.length === 0}];

  if (category?.children?.length > 0) {
    category.children.forEach((childCategory : any) => {
      const childCategoryNames = getCategoryNames(childCategory);
      categoryInfo.push(...childCategoryNames);
    });
  }

  return categoryInfo;
};