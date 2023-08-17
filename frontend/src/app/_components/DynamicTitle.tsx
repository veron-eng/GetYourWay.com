import React, { useState, useEffect } from 'react'

function DynamicTitle() {
	const words = ["adventure", "journey", "expedition", "quest", "voyage"];
	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		// Change word every 8 seconds
		const interval = setInterval(() => {
			setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, 8000);

		return () => clearInterval(interval);
	}, [words.length]);
	
	return (
		<h1 className="relative md:text-4xl text-7xl text-glow  text-white font-bold w-full tracking-wide">
			Find your next{" "}
			<span className="bg-gradient-text bg-clip-text text-transparent px-1 rounded-lg typewriter-text">
				{words[wordIndex]}
			</span>
		</h1>
	)
}

export default DynamicTitle
