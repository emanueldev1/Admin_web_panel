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
const fs = require("fs");
const admins = require('../admins.json');
const config = require('../dashconfig.json');





module.exports = (data, app, checkAuth, checkPerms, dirname) => {

    const admins = require(`${dirname}/admins.json`);
    const config = require(`${dirname}/dashconfig.json`);


    // console.log(colors.blue('Admins Loaded') + " " + colors.magenta(admins.admins.length) + " " + colors.blue('Admins'));

    function getAdmins() {
        if (admins.admins !== undefined) {
            const a = admins.admins;
            console.log(a);
            return a;
        } else {
            return 'noadms';
        }
    }

    app.get("/setup", (checkAuth), async (req, res) => {
        console.log(admins)
        const adminsarray = getAdmins();

        if (adminsarray !== 'noadms') {
            console.log(colors.magenta('admins found, redirecting to panel page'));
            res.redirect('/panel');
        } else {
            res.render("setup", {
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                callback: Settings.config.callback,
                data: data,
                status: undefined,
            })
        }


    })

    app.post("/setup", checkAuth, async (req, res) => {
        const user = req.user;


        const adminsarray = admins.admins;
        const settings = {
            "dashconfig": {
                svname: req.body.svname,
                svhost: req.body.svhost,
                svusrname: req.body.svusrname,
                svpss: req.body.svpss,
                sv_db: req.body.sv_db,
            },

        };
        const admarr = {
            "admins": [user.id],
        }

        if (adminsarray !== undefined) {
            res.redirect("/panel");
        } else {
            var errors = 0;

            var data = JSON.stringify(settings);
            console.log(data)
            var admdata = JSON.stringify(admarr);
            console.log(admdata)
            fs.writeFileSync(dirname + '/dashconfig.json', data, (err) => {
                if (err) errors++;
                
            });

            fs.writeFileSync(dirname + '/admins.json', admdata, (err) => {
                if (err) errors++;
            });


            if (errors === 0) {
                res.render("setup", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    status: 'success',
                })
            } else {
                res.render("setup", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    status: 'error',
                })
            }


        }



    })

}