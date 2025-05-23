import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
    tsr: {
        appDirectory: "src",
    },
    vite: {
        plugins: [
            tsConfigPaths({
                projects: ["./tsconfig.json"],
            }),
            tailwindcss(),
            svgr(),
        ],
    },
});
