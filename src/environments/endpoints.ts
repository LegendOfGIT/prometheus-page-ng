
export const endpoints = {
    items: '/information-items?navigationId={navigationId}&searchProfileId={searchProfileId}&searchPattern={searchPattern}',
    scoreItem: '/information-item/scoring',
    deleteWishlistItem: '/wishlist-item?userId={userId}&itemId={itemId}',
    getWishlistItems: '/wishlist-items?userId={userId}&searchPattern={searchPattern}',
    saveWishlistItem: '/wishlist-item',
    getSearchProfileItems: '/search-profiles?userId={userId}',
    removeSearchProfile: '/search-profile?userId={userId}&searchProfileId={searchProfileId}',
    saveSearchProfile: '/search-profile'
};
