"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session || !session?.user) {
			router.replace("/");
		}
	}, [session]);
	return <Profile />;
};
export default ProfilePage;
