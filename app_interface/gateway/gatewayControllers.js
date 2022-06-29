module.exports.list = (req, res) => {
    const data = {
        styles: ["list.css"],
        scripts: ["gatewayList.js"],
    };
    res.render("list", data);
};

module.exports.create = (req, res) => {
    const data = {
        styles: ["form.css", "list.css"],
        scripts: ["gatewayForm.js"],
    };
    res.render("form", data);
};
