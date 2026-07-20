import { CATEGORY_DETAILS } from '../constants/recycle-category';

export const filterCategoryTags = (tagName: string) => {
  const tags = CATEGORY_DETAILS.filter((t) => t.category === tagName);
  const tagList = tags?.[0].details;

  return tagList;
};
