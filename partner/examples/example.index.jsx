import React from "react";
import { entrypoints } from "uxp";

// Example for your plugin's src/index.jsx.
// Use example.PanelController.jsx (or merge its menuItems handling into yours).
// Replace MyPanel with your real panel component.
import { PanelController } from "./example.PanelController.jsx";
import { MyPanel } from "./panels/MyPanel.jsx";

import { fixtureMenuItems } from "./checker/testing/fixtureMenuItems.js";
import { runFixtureTestSuite } from "./checker/testing/runFixtureTestSuite.js";

const myPanelController = new PanelController(() => <MyPanel />, {
    id: "myPanel",
    menuItems: fixtureMenuItems
});

entrypoints.setup({
    plugin: {
        create(plugin) {
            /* optional */ console.log("created", plugin);
        },
        destroy() {
            /* optional */ console.log("destroyed");
        }
    },
    panels: {
        myPanel: myPanelController
    },
    commands: {
        async runFixtureTests() {
            const result = await runFixtureTestSuite();

            if (result.ok) {
                console.log(result.message);
            } else {
                console.error(result.message, result.summary);
            }

            return result;
        }
    }
});
