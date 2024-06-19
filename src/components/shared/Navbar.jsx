"use client";
import React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
	const session = useSession();
	// console.log(session);
	return (
		<div className="flex justify-center items-center">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					{session.status === "authenticated" ? (
						<>
							<NavigationMenuItem>
								<button onClick={signOut}>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Logout
									</NavigationMenuLink>
								</button>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href={'/notes'}>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Notes
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</>
					) : (
						<>
							<NavigationMenuItem>
								<Link href="/login" legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Login
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/signup" legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Sign Up
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Navbar;
