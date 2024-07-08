export interface User {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface UserPost {
	name: string;
	email: string;
	password: string;
}
