import * as configcat from "configcat-js";
import { dispatchCustomEvent } from "./listeners";

export const CONFIG_CHANGED_EVENT = "CONFIG_CHANGED_EVENT";

export let configCatClient;

export const FeatureToggleInit = () => {
    if (typeof configCatClient === "undefined") {
            configCatClient = configcat.createClientWithAutoPoll("yjTaCCjWFUOHgbuc7G614Q/adNpA4jbJ0Ke88Jplgbauw", {
                pollIntervalSeconds: 60,
                maxInitWaitTimeSeconds: 0,
                configChanged: () => dispatchCustomEvent(CONFIG_CHANGED_EVENT),
            });
        }

};
