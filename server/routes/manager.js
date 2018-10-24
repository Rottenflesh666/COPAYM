const House = require('../models/House');
const authCheck = require("../middleware/auth");
const ObjectId = require('mongoose').Types.ObjectId;

//получаем список домов
module.exports = (app) => {
   /* app.post("/houseList/add", authCheck.auth, (req, res) => {
        House.find({
            managerID: new ObjectId(req.body.userID)
        }, (function (err, houses) {
            if (err) return handleError(err);
            if (houses) {
                let houseMap = [];
                let index = 0;
                houses.forEach((house) => {
                    houseMap.push({
                        address: house.address,
                        id: house._id
                    });
                });
                res.json({
                    status: 200,
                    err: null,
                    houseMap
                });
            } else {
                res.json({
                    status: 404
                })
            }
        }))
    });*/

    app.post("/houseList", authCheck.auth, (req, res) => {
        House.find({
            managerID: new ObjectId(req.body.userID)
        }, (function (err, houses) {
            if (err) return handleError(err);
            if (houses) {
                let houseMap = [];
                let index = 0;
                houses.forEach((house) => {
                    houseMap.push({
                        address: house.address,
                        id: house._id
                    });//[index] = house;
                    //index++;
                });
                res.json({
                    status: 200,
                    err: null,
                    houseMap
                });
            } else {
                res.json({
                    status: 404
                })
            }
        }))
    });
};
