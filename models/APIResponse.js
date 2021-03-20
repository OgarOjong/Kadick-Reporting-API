function APIResponse(status, success, message, payload) {
  return { status, success, message, payload };
}
function APIResponseToks(status, success, data) {
  return { status, success, data };
}

module.exports.APIResponse = APIResponse;
module.exports.APIResponseToks = APIResponseToks;
