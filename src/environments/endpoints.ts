
export const endpoints = {
  availableFilters: '/available-filters?navigationId={navigationId}&searchPattern={searchPattern}&priceFrom={priceFrom}&priceTo={priceTo}',
  items: '/information-items?navigationId={navigationId}&hashtags={hashtags}&id=&searchPattern={searchPattern}&numberOfResults={numberOfResults}&randomItems={randomItems}&page={page}&isBot={isBot}&filters={filterIds}&priceFrom={priceFrom}&priceTo={priceTo}&createdToday={createdToday}',
  itemsByCategories: '/information-items/by-categories?navigationIds={navigationIds}&numberOfResults={numberOfResults}&randomItems={randomItems}',
  hashtags: '/hashtags?hashtagPattern={hashtagsPattern}',
  hashtagsItems: '/information-items?numberOfResults={numberOfResults}&page={page}&isBot={isBot}&hashtags={hashtags}&searchPattern={searchPattern}&filters={filterIds}&priceFrom={priceFrom}&priceTo={priceTo}',
  singleItem: '/information-items?id={id}&hashtags={hashtags}&numberOfResults=1&isBot={isBot}',
  scoreItem: '/information-item/scoring',
  deleteWishlistItem: '/wishlist/item',
  wishlistItemBought: '/wishlist/item/bought',
  createWishlist: '/wishlist',
  shareWishlist: '/wishlist/share',
  cancelShareWishlist: '/wishlist/cancel-share',
  deleteWishlist: '/wishlist',
  getWishlist: '/wishlist?userId={userId}&id={id}&sharedWithHash={sharedWithHash}',
  getWishlists: '/wishlists?userId={userId}',
  rankedCategoriesByHashtags: '/ranked-categories?hashtags={hashtags}',
  saveWishlistItem: '/wishlist/item',
  searchSuggestions: '/search-suggestions?searchPattern={searchPattern}&navigationId={navigationId}'
};
