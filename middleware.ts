import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const privateRoutes = ["/calendar", "/my-tasks", "/settings"]

export default auth((req) => {
    const { nextUrl, headers } = req;
    const originUrl = `${nextUrl.protocol}//${headers.get("host")}`;

    const isLoggedIn = !!req.auth; 
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isPrivateRoute = nextUrl.pathname === "/" || privateRoutes.includes(nextUrl.pathname);
    

    if(isAuthRoute && isLoggedIn) {
        return Response.redirect(`${originUrl}`);
    }

    if(!isLoggedIn && isPrivateRoute) {
        return Response.redirect(`${originUrl}/auth/sign-in`)
    }

})

export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

}