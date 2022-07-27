module.exports.detail = (req, res) => {
    const data = {
        styles: ["detailRecord.css"],
        scripts: ["detailRecord.js"],
    };
    res.render("detailRecord", data);
};
