const express = require("express");
const url = require("url");
const path = require("path");
const Discord = require("discord.js");
const ejs = require("ejs");
const passort = require("passport");
const bodyParser = require("body-parser");
const Strategy = require("passport-discord").Strategy;
const Settings = require("../settings.json");
const passport = require("passport");
var colors = require('colors/safe');



module.exports = (data, app) => {

    app.get("/", (req, res) => {

        if (req.isAuthenticated()) {
            res.redirect("/panel");
        } else {
            res.render("login", {
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                callback: Settings.config.callback,
                data: data,
            })
        }
    })

    app.get("/login", (req, res, next) => {
        if (req.session.backURL) {
            req.session.backURL = req.session.backURL
        } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
            if (parsed.hostname == app.locals.domain) {
                req.session.backURL = parsed.path
            }
        } else {
            req.session.backURL = "/"
        }
        next();
    }, passport.authenticate("discord", { prompt: "none" })
    );

    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
        let banned = false //client.settings.get("bannedusers")
        if (banned) {
            req.session.destroy()
            res.json({ login: false, message: "You are banned from the dashboard", logout: true })
            req.logout();
        } else {
            res.redirect("/panel")
        }
    });
    
    app.get("/logout", function (req, res) {
        req.session.destroy(() => {
            req.logout();
            res.redirect("/");
        })
    })

   
    

}