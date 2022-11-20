
export const endpoints = {
    items: '/information-items?navigationId={navigationId}&searchPattern={searchPattern}',
    deleteWishlistItem: '/wishlist-item?userId={userId}&itemId={itemId}',
    getWishlistItems: '/wishlist-items?userId={userId}&searchPattern={searchPattern}',
    saveWishlistItem: '/wishlist-item',
    getSearchProfileItems: '/search-profiles?userId={userId}',
    removeSearchProfile: '/search-profile?userId={userId}&searchProfileId={searchProfileId}',
    saveSearchProfile: '/search-profile'
};
