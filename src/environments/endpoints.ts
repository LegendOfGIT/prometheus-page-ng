
export const endpoints = {
  contentGetTranslations: '/translations?locale={locale}',
  contentUpdateTranslations: '/translations',
  items: '/information-items?navigationId={navigationId}&hashtags={hashtags}&id=&searchPattern={searchPattern}&numberOfResults={numberOfResults}&randomItems={randomItems}&page={page}&isBot={isBot}&filters={filterIds}&priceFrom={priceFrom}&priceTo={priceTo}&createdToday={createdToday}',
  itemsAvailableFilters: '/available-filters?navigationId={navigationId}&searchPattern={searchPattern}&priceFrom={priceFrom}&priceTo={priceTo}',
  itemsHashtags: '/hashtags?hashtagPattern={hashtagsPattern}',
  itemsHashtagsItems: '/information-items?numberOfResults={numberOfResults}&page={page}&isBot={isBot}&hashtags={hashtags}&searchPattern={searchPattern}&filters={filterIds}&priceFrom={priceFrom}&priceTo={priceTo}',
  itemsItemsByCategories: '/information-items/by-categories?navigationIds={navigationIds}&numberOfResults={numberOfResults}&randomItems={randomItems}',
  itemsRemoveProviderByMean: '/information-item?mean={mean}',
  itemsScoreItem: '/information-item/scoring',
  itemsSearchSuggestions: '/search-suggestions?searchPattern={searchPattern}&navigationId={navigationId}',
  itemsSingleItem: '/information-items?id={id}&hashtags={hashtags}&numberOfResults=1&isBot={isBot}',
  wishlistCancelShareWishlist: '/wishlist/cancel-share',
  wishlistCreateOrUpdateWishlist: '/wishlist',
  wishlistDeleteWishlist: '/wishlist',
  wishlistDeleteWishlistItem: '/wishlist/item',
  wishlistDiscoverAndAddWishlistItem: '/wishlist/item/discover-and-add',
  wishlistGetWishlist: '/wishlist?userId={userId}&id={id}&sharedWithHash={sharedWithHash}',
  wishlistGetWishlists: '/wishlists?userId={userId}',
  wishlistSaveWishlistItem: '/wishlist/item',
  wishlistShareWishlist: '/wishlist/share',
  wishlistWishlistItemBought: '/wishlist/item/bought'
};
