const jwt = require("jsonwebtoken");
const json_sec="adsfasdghahdskfas";

const isAuthenticated = async (req, res, next) => {

  try {
    const tokenCookie = req.cookies.access_token; 
    if (!tokenCookie) {
      return res.redirect("/teacher/login");
    }
    const decoded = await jwt.verify(tokenCookie, json_sec);
    if (decoded) {
      return next();
    } else {
      return res.redirect("/teacher/login");
    }
  } catch (error) {
    return res.redirect("/teacher/login");
  }
};
module.exports = { isAuthenticated };