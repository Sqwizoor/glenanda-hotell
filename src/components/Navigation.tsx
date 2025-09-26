"use client";

import { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Services", href: "/services" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200 shadow-sm"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.15 }}
						className="flex items-center"
					>
						<Link href="/" className="flex items-center">
							<OptimizedImage
								src="/logo.jpeg"
								alt="Glenanda Hotel Logo"
								width={160}
								height={80}
								className="h-14 w-auto object-cover rounded-md ring-1 ring-gray-200 hover:scale-[1.03] transition-transform duration-200"
								priority
							/>
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						{navigation.map((item, index) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0, y: -12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25 + index * 0.07 }}
							>
								<Link
									href={item.href}
									className={cn(
										"relative group text-sm font-medium px-4 py-2 rounded-full transition-colors",
										pathname === item.href
											? "text-gray-900 bg-gray-900/5"
											: "text-gray-700 hover:text-gray-900 hover:bg-gray-900/5"
									)}
								>
									{item.name}
									<span className="absolute left-4 right-4 -bottom-0.5 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform bg-emerald-600" />
								</Link>
							</motion.div>
						))}

						{/* Actions */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6, type: "spring", stiffness: 160 }}
							className="flex items-center space-x-3 ml-4 pl-6 border-l border-gray-200"
						>
							<motion.a
								href="https://instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="group"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								aria-label="Instagram"
							>
								<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow">
									<Instagram className="w-5 h-5 text-white" />
								</div>
							</motion.a>
							<motion.a
								href="tel:+27762073299"
								className="group"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								aria-label="Call Glenanda Hotel"
							>
								<div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow">
									<Phone className="w-5 h-5 text-white" />
								</div>
							</motion.a>
							<Button
								asChild
								size="sm"
								className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<a
									href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20stay."
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center"
								>
									<MessageCircle className="w-4 h-4 mr-2" />
									Book Stay
								</a>
							</Button>
						</motion.div>
					</div>

					{/* Mobile Actions */}
					<div className="md:hidden flex items-center space-x-3">
						<motion.a
							href="tel:+27762073299"
							className="group"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow">
								<Phone className="w-4 h-4 text-white" />
							</div>
						</motion.a>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-700 hover:bg-gray-100"
							aria-label="Toggle menu"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-white border-t border-gray-200"
					>
						<div className="px-4 py-6 space-y-4">
							{navigation.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									<Link
										href={item.href}
										onClick={() => setIsOpen(false)}
										className={cn(
											"block text-base font-medium py-3 px-4 rounded-xl transition-colors",
											pathname === item.href
												? "text-gray-900 bg-gray-100"
												: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										)}
									>
										{item.name}
									</Link>
								</motion.div>
							))}

							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="pt-6 mt-2 border-t border-gray-200"
							>
								<div className="flex items-center justify-center space-x-4 mb-4">
									<a
										href="https://instagram.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow"
									>
										<Instagram className="w-6 h-6 text-white" />
									</a>
									<a
										href="tel:+27762073299"
										className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow"
									>
										<Phone className="w-6 h-6 text-white" />
									</a>
								</div>
								<Button
									asChild
									className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl"
									onClick={() => setIsOpen(false)}
								>
									<a
										href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20stay."
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center"
									>
										<MessageCircle className="w-5 h-5 mr-2" />
										Book Stay
									</a>
								</Button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
