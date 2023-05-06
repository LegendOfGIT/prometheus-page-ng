
export const endpoints = {
  items: '/information-items?navigationId={navigationId}&hashtags={hashtags}&id=&searchPattern={searchPattern}&numberOfResults={numberOfResults}&randomItems={randomItems}&page={page}&isBot={isBot}',
  itemsByCategories: '/information-items/by-categories?navigationIds={navigationIds}&numberOfResults={numberOfResults}&randomItems={randomItems}',
  highlightedItems: '/information-items?numberOfResults={numberOfResults}&isBot={isBot}&highlightedItems=true',
  singleItem: '/information-items?id={id}&hashtags={hashtags}&numberOfResults=1&isBot={isBot}',
  scoreItem: '/information-item/scoring',
  deleteWishlistItem: '/wishlist-item?userId={userId}&itemId={itemId}',
  getWishlistItems: '/wishlist-items?userId={userId}&searchPattern={searchPattern}',
  rankedCategoriesByHashtags: '/ranked-categories?hashtags={hashtags}',
  saveWishlistItem: '/wishlist-item'
};
