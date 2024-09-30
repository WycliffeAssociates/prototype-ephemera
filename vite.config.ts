import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		base: "",
		plugins: [react(), viteTsconfigPaths()],
		server: {
			open: true,
			port: 3000,
		},
		define: {
			"process.env": env,
		},
	};
});
