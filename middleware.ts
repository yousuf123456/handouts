import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/user/sign",
  },

  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;

      if (
        path.startsWith("/seller") &&
        path !== "/seller/landing" &&
        path !== "/seller/sign"
      ) {
        return token?.role === "seller";
      }

      return token !== null;
    },
  },
});

export const config = {
  matcher: ["/cart", "/favourites", "/shipping", "/user/:path*"],
};
