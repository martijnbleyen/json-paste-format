export const pageview = (url: string) => {
    window.dataLayer.push({
        event: "pageview",
        page: url,
    });
};

export const gtagEvent = (eventName: string, extraData?: object) => {
    if(window.dataLayer){
        gtag('event', eventName, {...extraData});
    }
};
