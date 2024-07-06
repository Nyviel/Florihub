import { User, UserPost } from "@/interfaces/user";
import { Session } from "next-auth";

const API = "http://localhost:3000/api";

export const postUser = async (user: UserPost): Promise<Response> => {
	return fetch(`${API}/auth/users`, {
		method: "POST",
		body: JSON.stringify(user),
	});
};

export const fetchUsers = async (): Promise<User[] | null> => {
	const response = await fetch(`${API}/auth/users`);
	if (response.ok) {
		return response.json();
	} else {
		return null;
	}
};
