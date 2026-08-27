import "@edgecoms-academy/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "www.tella.tv",
				pathname: "/api/stories/**",
				protocol: "https",
			},
		],
	},
	reactCompiler: true,
	typedRoutes: true,
};

export default nextConfig;
