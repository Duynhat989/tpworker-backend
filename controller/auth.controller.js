const { create_new_token } = require("../midleware/manage_token");
const { encryption, compare } = require("../utils/encode");
const User = require("../model/user");
let debug = true;
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.send({
        status: false,
        user: null,
      });
      return;
    }
    var result = await User.login(email, password);
    if (result.length == 0) {
      res.send({
        status: false,
        user: null,
      });
      return;
    }
    var isValid = await compare(password, result[0].password);
    if (!isValid) {
      res.send({
        status: false,
        user: null,
        error: "password",
      });
      return;
    }
    const auth = await create_new_token({ user_id: result[0].id });
    res.send({
      status: true,
      auth: auth,
    });
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null,
      });
    }
  }
};
exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    res.send({
      status: false,
      user: null,
    });
    return;
  }
  if (await contains_mail(email)) {
    res.send({
      status: false,
      user: null,
      error: "email exits",
    });
    return;
  }
  const hash_password = await encryption(password);
  var result = await User.register(email, hash_password, "nocheck");
  const auth = await create_new_token({ user_id: result.insertId });
  res.send({
    status: true,
    auth: auth,
  });
};
exports.info = async (req, res) => {
  try {
    const { user_id } = req.user;
    var user = await User.info_person(user_id);
    delete user[0].password;
    delete user[0].timestemp;
    delete user[0].ip_address;
    delete user[0].role;
    res.send({
      status: true,
      user: user[0],
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
exports.avaliable = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      res.send({
        status: false,
        user: null,
      });
      return;
    }
    if (await contains_mail(email)) {
      res.send({
        status: false,
      });
      return;
    }
    res.send({
      status: true, //khả dụng
    });
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
    });
  }
};
async function contains_mail(email) {
  var result = await User.check_contains_email(email);
  if (result[0].count == 0) {
    return false;
  }
  return true;
}
