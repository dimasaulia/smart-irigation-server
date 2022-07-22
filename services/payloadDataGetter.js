const urlPayloadFind = (req, data) => {
    const querys = req.query[data] || req.params[data];
    return querys;
};

module.exports = { urlPayloadFind };
