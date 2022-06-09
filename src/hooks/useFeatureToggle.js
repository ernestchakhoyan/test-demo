import React from "react";
import { listenToCustomEvent } from "../utils/listeners";
import { configCatClient, CONFIG_CHANGED_EVENT } from "../utils/featureFlag";

export const useFeatureToggle = (key, defaultValue = false) => {
    const [allowed, setAllowed] = React.useState(defaultValue);

    const triggerFeatureToggle = React.useCallback(async () => {
        if (typeof configCatClient !== "undefined") {
            const value = await configCatClient.getValueAsync(key, defaultValue);
            setAllowed(value);
        } else {
            console.error("Missing config cat configuration and provider");
        }
    }, [defaultValue, key]);

    React.useEffect(() => {
        return listenToCustomEvent(CONFIG_CHANGED_EVENT, triggerFeatureToggle);
    });

    React.useEffect(() => {
        triggerFeatureToggle().then(r => console.log(r));
    }, []);

    return allowed;
};
