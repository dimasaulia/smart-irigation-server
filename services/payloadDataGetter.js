const urlPayloadFind = (req, data) => {
    const querys = req.query[data] || req.params[data];
    return querys;
};

const payloadFind = (req, data) => {
    const querys = req.query[data] || req.params[data] || req.body[data];
    return querys;
};

module.exports = { urlPayloadFind, payloadFind };
