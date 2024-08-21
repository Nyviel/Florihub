import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "photoswipe/dist/photoswipe.css";
import Navigation from "@/components/Navigation";
import AuthProvider from "@/components/AuthProvider";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "FloriHub",
	description: "All about plants and their care",
	authors: [{ name: "Przemysław Kaczmarski" }],
	keywords: ["Flora", "plants", "plant care", "plant guides", "succulents"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang="en" suppressHydrationWarning={true}>
				<body className={`${inter.className} antialiased bg-green-900`}>
					<Navigation />
					<main>{children}</main>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
						transition={Bounce}
					/>
				</body>
			</html>
		</AuthProvider>
	);
}
