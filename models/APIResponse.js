function APIResponse(status, success, message, payload) {
  return { status, success, message, payload };
}
function APIResponseToks(status, success, data) {
  return { status, success, data };
}

class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    return { message, statusCode };
  }
}

module.exports.APIResponse = APIResponse;
module.exports.APIResponseToks = APIResponseToks;
module.exports.ExpressError = ExpressError;
