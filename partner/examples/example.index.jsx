/**
 * Template for your plugin’s src/index.jsx (not runnable from this folder).
 *
 * Copy the imports and entrypoints.setup block into src/index.jsx.
 * All import paths below are relative to src/.
 *
 * Match three ids to your manifest panel entrypoint:
 *   manifest entrypoints[].id  ↔  PanelController({ id })  ↔  entrypoints.setup.panels key
 */
import React from "react";
import { entrypoints } from "uxp";

import { fixtureMenuItems } from "./checker/testing/fixtureMenuItems.js";
import { PanelController } from "./controllers/PanelController.jsx";
import { MyPanel } from "./panels/MyPanel.jsx";

const { app } = require("indesign");

const myPanelController = new PanelController(() => <MyPanel app={app} />, {
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
    }
});
