exports.selected = function (a, b) {
    if (a.toLowerCase() === b.toLowerCase())
        return new hbs.SafeString(`selected`);
};

exports.price = (p) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(p);
};

exports.date = (d) => {
    const date = new Date(d);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
};
