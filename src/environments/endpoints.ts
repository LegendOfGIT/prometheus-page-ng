
export const endpoints = {
    items: '/information-items?navigationId={navigationId}&searchProfileId={searchProfileId}&id=&searchPattern={searchPattern}&numberOfResults={numberOfResults}&randomItems={randomItems}&page={page}',
    singleItem: '/information-items?id={id}&searchProfileId={searchProfileId}',
    scoreItem: '/information-item/scoring',
    deleteWishlistItem: '/wishlist-item?userId={userId}&itemId={itemId}',
    getWishlistItems: '/wishlist-items?userId={userId}&searchPattern={searchPattern}',
    saveWishlistItem: '/wishlist-item',
    getSearchProfileItem: '/search-profile?searchProfileId={searchProfileId}',
    getSearchProfileItems: '/search-profiles?userId={userId}',
    removeSearchProfile: '/search-profile?userId={userId}&searchProfileId={searchProfileId}',
    saveSearchProfile: '/search-profile'
};
