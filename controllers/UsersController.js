const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req,res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{login: email}}).then( user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                login: email,
                password: hash
            }).then(function(x){
                console.log(x.id);
                res.redirect("/");
            }).catch((err)=>{
                res.redirect("/");
            });
        }else{
            res.redirect("/admin/users/create");
        }
    })

});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req,res) => {
    var login = req.body.email;
    var password = req.body.password;
    req.session.usuario = login;

    User.findOne({where:{login:login}}).then(user=>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    login: user.login
                }
                res.redirect("/");
            }else{
                res.redirect("/login");
            }

        }else{
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req,res) =>{
    req.session.user = undefined;
    res.redirect("/login");
});

module.exports = router;
