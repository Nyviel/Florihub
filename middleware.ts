import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(_) {}, {
	callbacks: {
		authorized: ({ token }) => token?.isAdmin === true,
	},
});

export const config = { matcher: ["/dashboard"] };
