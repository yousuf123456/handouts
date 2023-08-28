export const getRoutes = () => {
  const routes = {
    home: "/",
    orders: "/user/orders",
    signInUp: "/user/sign",
    returns: "/user/returns",
    profile: "/user/profile",
    favourites: "/favourites",
    myAccount: "/user/account",
    addAddress: "/user/addAddress",
    addressDiary: "/user/addressDiary",
    cancellations: "/user/cancellations",
    historyReviews: "/user/myReviews?toBeReviewed=false&isHistory=true",
    toBeReviewdReviews: "/user/myReviews?toBeReviewed=true&isHistory=false",
  };

  return routes;
};
