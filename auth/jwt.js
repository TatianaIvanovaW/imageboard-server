const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m"; ///<<< need only first part

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" }); ///<<< data - user id
}

function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
