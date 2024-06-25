import { User, UserPost } from "@/interfaces/user";

const API = "http://localhost:3000/api";

export const postUser = async (user: UserPost): Promise<Response> => {
	return fetch(`${API}/auth/users`, {
		method: "POST",
		body: JSON.stringify(user),
	});
};
