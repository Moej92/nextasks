export { auth as middleware } from "@/auth"

// const privateRoutes = ["/calendar", "/my-tasks", "/notification", "/settings"]

// export default auth((req) => {
//     const { nextUrl, headers } = req;
//     const originUrl = `${nextUrl.protocol}//${headers.get("host")}`;

//     const isLoggedIn = !!req.auth; 
//     const isAuthRoute = nextUrl.pathname.includes("/auth");
//     const isPrivateRoute = nextUrl.pathname === "/" || privateRoutes.includes(nextUrl.pathname);
    

//     if(isAuthRoute && isLoggedIn) {
//         return Response.redirect(`${originUrl}`);
//     }

//     if(!isLoggedIn && isPrivateRoute) {
//         return Response.redirect(`${originUrl}/auth/sign-in`)
//     }

// })

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }