const isValidCords = (input) => {
  var reg = new RegExp("^[0-9,.]+$");
  if (reg.test(input)) {
    let cords = input.split(",");
    if (cords.length <= 2)
      if (cords[0].match(/\./g) && cords[1].match(/\./g)) return true;
      else return false;
    else return false;
  }
  return false;
};
module.exports.isValidCords = isValidCords;
