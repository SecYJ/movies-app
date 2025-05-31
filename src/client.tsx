/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";

import { StartClient } from "@tanstack/react-start";

import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);

// Initialize stagewise toolbar in development mode only
if (process.env.NODE_ENV === "development") {
    import("@stagewise/toolbar-react").then(({ StagewiseToolbar }) => {
        import("react-dom/client").then(({ createRoot }) => {
            // Create a separate container for the toolbar
            const toolbarContainer = document.createElement("div");
            toolbarContainer.id = "stagewise-toolbar-root";
            document.body.appendChild(toolbarContainer);

            // Create a separate React root for the toolbar
            const toolbarRoot = createRoot(toolbarContainer);

            const stagewiseConfig = {
                plugins: [],
            };

            toolbarRoot.render(<StagewiseToolbar config={stagewiseConfig} />);
        });
    });
}
