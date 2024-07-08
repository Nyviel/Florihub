import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

async function isAdminCheck(req: NextApiRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.isAdmin) {
		return false;
	}

	return true;
}

export { isAdminCheck };
