const {hash, compare} = require('bcryptjs')
exports.doHash = (value,saltvalue) => {
    const result = hash(value,saltvalue)
    return result;
}

exports.doHashValidation = (value,hashedvalue) => {
    const result = compare(value,hashedvalue);
    return result;
}