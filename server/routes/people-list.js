const User = require('../models/User');
const authCheck = require("../middleware/auth");
const ObjectId = require('mongoose').Types.ObjectId;

/*
const decrypt = (str, key) => str
  .split('g')
  .filter(Boolean)
  .map(s=> String.fromCharCode(parseInt(s,16)^key) )
  .join('')
;
 */

//получаем список домов
module.exports = (app) => {
    app.post("/peopleList/add", authCheck.auth, (req, res) => {
        /*  var crypto = require('crypto')
          var abc = crypto.createHash('sha1').update(req.body.firstname).digest('hex');*/
        User.create(req.body)
            .then(user => res.status(200).json({result: {
                    firstName : user.firstName,
                    lastName  : user.lastName,
                    userID    : user._id
                }
            }))
            .catch(err => res.status(402).json({result:  err}))
    });

    app.post("/peopleList/delete", authCheck.auth, (req, res) => {
        res.status(200).json({result: "ok"});
        User.remove(req.body)
            .then(user => res.status(200).json({result: "ok"}))
            .catch(err => res.status(402).json({result:  err}))
    });

    app.post("/peopleList", authCheck.auth, (req, res) => {
        User.find({
            $and:
                [
                    {managerID: new ObjectId(req.body.managerID)},
                    {houseID: new ObjectId(req.body.houseID)}
                ]
        }, (function (err, users) {
            if (err) return handleError(err);
            if (users) {
                let usersMap = [];
                let index = 0;
                users.forEach((user) => {
                    let fName = user.firstName + " " + user.lastName;
                    usersMap.push({
                        fullName: fName,
                        userID: user._id
                    });
                });
                res.json({
                    status: 200,
                    err: null,
                    usersMap
                });
            } else {
                res.json({
                    status: 404
                })
            }
        }))
    });
};

//  managerID: new ObjectId(req.body.managerID),
//   houseID: new ObjectId(req.body.houseID)