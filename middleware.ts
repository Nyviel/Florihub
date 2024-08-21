import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(_) {}, {
	callbacks: {
		authorized: ({ token, req }) => {
			if (req.nextUrl.pathname === "/dashboard") {
				return token?.isAdmin === true;
			}

			return !!token;
		},
	},
});

export const config = { matcher: ["/dashboard", "/profile", "/trackedplants"] };
