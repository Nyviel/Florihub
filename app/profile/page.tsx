"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === "loading") {
			return;
		}
		if (!session || !session?.user) {
			router.replace("/");
		}
	}, [session, status]);
	return <Profile />;
};
export default ProfilePage;
