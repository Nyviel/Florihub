import { User, UserPost } from "@/interfaces/user";
import { api } from "@/utils/constants";

export const postUser = async (user: UserPost): Promise<Response> => {
	return fetch(`${api}/auth/users`, {
		method: "POST",
		body: JSON.stringify(user),
	});
};

export const fetchUsers = async (): Promise<User[] | null> => {
	const response = await fetch(`${api}/auth/users`);
	if (response.ok) {
		return response.json();
	} else {
		return null;
	}
};
