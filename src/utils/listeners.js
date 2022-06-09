export const DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION = {
    target: window.document,
    bubble: true,
    canBeCancelled: true,
    detail: undefined,
};

export const defined = (value, defaultValue) => {
    if (typeof value !== "undefined" && value !== null) {
        return value;
    }
    return defaultValue;
};

export const listenToCustomEvent = (
    eventName,
    listener,
    target = window.document,
) => {
    const eventListener = (evt) => {
        listener(evt);
    };

    target.addEventListener(eventName, eventListener);
    return () => target.removeEventListener(eventName, eventListener);
};


export const dispatchCustomEvent = (
    eventName,
    options= DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION,
) => {
    const customEvent = new CustomEvent(eventName, {
        bubbles: defined(options.bubble, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.bubble),
        cancelable: defined(options.canBeCancelled, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.canBeCancelled),
        detail: options.detail,
    });

    defined(options.target, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.target).dispatchEvent(customEvent);
};
