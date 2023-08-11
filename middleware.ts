import withAuth from 'next-auth/middleware';

export default withAuth({
    pages : {
        signIn : "/user/sign",
    }
});

export const config = {
    matcher: ["/cart", "/favourites", "/shipping", "/user/:path*"]
}