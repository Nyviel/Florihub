import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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
		<html lang="en">
			<body className={inter.className}>
				<Navigation />

				{children}

				<Footer />
			</body>
		</html>
	);
}
