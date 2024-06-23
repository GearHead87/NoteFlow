"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function AuroraBackgroundDemo() {
	const words = ["Efficiently", "Creatively", "Seamlessly", "Effortlessly"];
	const session = useSession();
	return (
		<AuroraBackground>
			<motion.div
				initial={{ opacity: 0.0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="relative h-screen flex flex-col gap-4 items-center justify-center px-4"
			>
				<div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
					Capture, Organize, and Remember Everything
					<FlipWords words={words} /> <br />
				</div>
				<div className="font-extralight text-center text-base md:text-4xl dark:text-neutral-200 py-4">
					Welcome to NoteFlow, your go-to tool for notes and tasks. Simplify
					your life and boost productivity with our easy-to-use platform.
				</div>
				{session.status === "authenticated" ? (
					<>
						<button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
							<Link href={"/notes"}>Open Notes</Link>
						</button>
					</>
				) : (
					<>
						<button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
							<Link href={"/login"}>Get Started for Free</Link>
						</button>
					</>
				)}
			</motion.div>
		</AuroraBackground>
	);
}
