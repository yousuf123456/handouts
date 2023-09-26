export const getRoutes = () => {
  const routes = {
    home: "/",
    cart: "/cart",
    payment: "/payment",
    shipping: "/shipping",
    orders: "/user/orders",
    signInUp: "/user/sign",
    returns: "/user/returns",
    profile: "/user/profile",
    favourites: "/favourites",
    myAccount: "/user/account",
    sellerSign: "/seller/sign",
    addAddress: "/user/addAddress",
    addressDiary: "/user/addressDiary",
    cancellations: "/user/cancellations",
    sellOnHandoutsLanding: "/sell-on-handouts/landing",
    sellerAccountVerification: "/seller/accountVerification",
    historyReviews: "/user/myReviews?toBeReviewed=false&isHistory=true",
    toBeReviewdReviews: "/user/myReviews?toBeReviewed=true&isHistory=false",
  };

  return routes;
};
