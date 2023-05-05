
export const endpoints = {
  items: '/information-items?navigationId={navigationId}&hashTags={hashTags}&id=&searchPattern={searchPattern}&numberOfResults={numberOfResults}&randomItems={randomItems}&page={page}&isBot={isBot}',
  itemsByCategories: '/information-items/by-categories?navigationIds={navigationIds}&numberOfResults={numberOfResults}&randomItems={randomItems}',
  highlightedItems: '/information-items?numberOfResults={numberOfResults}&isBot={isBot}&highlightedItems=true',
  singleItem: '/information-items?id={id}&hashTags={hashTags}&numberOfResults=1&isBot={isBot}',
  scoreItem: '/information-item/scoring',
  deleteWishlistItem: '/wishlist-item?userId={userId}&itemId={itemId}',
  getWishlistItems: '/wishlist-items?userId={userId}&searchPattern={searchPattern}',
  rankedCategoriesByHashTags: '/ranked-categories?hashTags={hashTags}',
  saveWishlistItem: '/wishlist-item'
};
