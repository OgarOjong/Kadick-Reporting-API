const mongoose = require("mongoose");
const User = require("../models/User");
// var userNumber = User.users.estimatedDocumentCount();

User.estimatedDocumentCount(function (err, count) {
  if (err) {
    console.log(err);
  } else {
    console.log("Estimated Count :", count);
  }
});

var number_of_users = 2; //db.collection.count()

function UniqueID(prefix, d = 16, upperCase = false) {
  var text = prefix;
  if (!isNaN(d)) {
    d = parseInt(d);
  }

  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < d; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return upperCase ? String(text).toLocaleUpperCase() : text;
}
var x = parseInt(number_of_users) + 1 + UniqueID("MO", 10, true);
console.log(x);
