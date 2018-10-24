module.exports = (app) => {
    require("./auth")(app);
    require("./global")(app);
    require("./login")(app);
    require("./manager")(app);
    require("./people-list")(app);
};
