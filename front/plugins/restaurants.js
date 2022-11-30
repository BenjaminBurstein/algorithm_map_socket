export default ({ }, inject) => {
    inject("restaurants", {
        get() {
            return [
                { name: "resto 1", pos: { lat: 48.89366826474308, lng: 2.226839661598206 } },
                { name: "resto 2", pos: { lat: 48.89499435491002, lng: 2.224339842796326 } },
                { name: "resto 3", pos: { lat: 48.89652143112482, lng: 2.228808403015137 } },
                { name: "resto 4", pos: { lat: 48.8921199394261, lng: 2.232284545898438 } },
                { name: "resto 5", pos: { lat: 48.89079377301338, lng: 2.237906455993653 } },
                { name: "resto 6", pos: { lat: 48.89299462568024, lng: 2.239623069763184 } },
            ]
        }
    });
};
