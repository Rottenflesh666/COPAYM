const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const User = require("../models/User");
const jwtMW = exjwt({
  secret: "4 the lich king"
});

/*let user = {
  id: 1,
  username: "admin",
  password: "admin"
};*/

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({
      login: req.body.username,
      password: req.body.password
    }, function(err, user) {
      if (err) return handleError(err);
      if (user) {
        let token = jwt.sign({ user }, "4 the lich king", { expiresIn: 129600 });
        res.json({
          success: true,
          err: null,
          token
        });
      } else {
        res.status(404).json({
          success: false,
          token: null,
          err: "user not found"
        });
      }
    });
    /*if (username === user.username && password === user.password) {
      let token = jwt.sign({ id: user.id }, "4 the lich king", { expiresIn: 129600 });
      res.json({
        success: true,
        err: null,
        token
      });
    }
    else {
      res.status(404).json({
        success: false,
        token: null,
        err: "user not found"
      });
    }*/
  });
};
