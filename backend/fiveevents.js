const express = require("express");
const url = require("url");
const path = require("path");
const Discord = require("discord.js");
const ejs = require("ejs");
const passort = require("passport");
const bodyParser = require("body-parser");
const Strategy = require("passport-discord").Strategy;
const passport = require("passport");
var colors = require('colors/safe');
var mysql = require('mysql');
const resname = GetCurrentResourceName();
const logs = require("../functions/functions.js");

module.exports = (data, app, connection, dirname, cfg, admins) => {
    on('playerConnecting', (name, setKickReason, deferrals) => {
        var whitelist = null;
        var banlist = null;

        if (cfg.dashconfig.whitelist !== undefined || null) {
            whitelist = 'enabled';
        } else {
            whitelist = 'disabled';
        }

        if (cfg.dashconfig.banlist !== undefined || null) {
            banlist = 'enabled';
        } else {
            banlist = 'disabled';
        }

        if (veriymysqlconn()) {

            const player = global.source;

            let steamidentifier = null;
            let license = null;
            let discord = null;
            let fivem = null;
            let license2 = null;
            let ip = null;

            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);
                // console.log(colors.blue(`Player ${name} connected with identifier: ` + colors.magenta(identifier)));
                if (identifier.includes('steam:')) {
                    steamidentifier = identifier;
                }
                if (identifier.includes('license2:')) {
                    license2 = identifier;
                }
                if (identifier.includes('license:')) {
                    license = identifier;
                }
                if (identifier.includes('ip:')) {
                    ip = identifier;
                }
                if (identifier.includes('discord:')) {
                    discord = identifier;
                }
                if (identifier.includes('fivem:')) {
                    fivem = identifier;
                }
            }
            
            deferrals.defer();

            var logsmsg = ''


            setTimeout(() => {

                deferrals.update(`Hello ${name}. Your steam ID is being checked.`)

                logsmsg = logsmsg + `The player ${name} is connecting now with the ${ip}`

                var whitelistedmessages = require(dirname + '/settings.json');
                if (whitelist == 'enabled') {

                    if (steamidentifier !== null) {

                        connection.query('SELECT * FROM users WHERE '+ connection.escapeId('identifier') + `="${steamidentifier}"` , function (error2, results2, fields) {

                            if (results2[0].whitelisted === 'true') {
                                deferrals.update(`Hello ${name}. Your steam ID is being checked in the whitelist`)
                                logsmsg = logsmsg + ` :: Autorized`


                            } else {
                                deferrals.done(`${whitelistedmessages.notwlisted}.`);
                                logsmsg = logsmsg + ` :: Not Autorized`

                            }

                        });
            
                    } 

                }

                if (banlist == 'enabled') {

                    if (steamidentifier !== null) {

                        connection.query('SELECT * FROM users WHERE '+ connection.escapeId('identifier') + `="${steamidentifier}"` , function (error2, results2, fields) {

                            if (results2[0].banned === 'false') {
                                deferrals.update(`Hello ${name}. Your steam ID is being checked in the banlist`)

                                logsmsg = logsmsg + ` :: ${colors.green('Not banned')}`

                            } else {
                                deferrals.done(`${whitelistedmessages.banned}.`);

                                logsmsg = logsmsg + ` :: ${colors.red('Banned')} :: ${colors.magenta('removing autorization')}`
                            }

                        });
            
                    } 

                }

                logs['log'](logsmsg, 'playerConnecting', connection);


                // esperar 1 segundo y guardar datos en adminpanel_playersid
                setTimeout(() => {
                    if (steamidentifier !== null) {
                        // verify if steamidentifier exists in database
                        connection.query(`SELECT * FROM adminpanel_playersid WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                            if (error) {
                                console.log(colors.red(error));
                            } else {
                                if (results.length > 0) {
                                    // console.log(colors.blue(results));
                                    // console.log(colors.blue(fields));
                                    if (results[0].license === 'null') {
                                        // update license
                                        connection.query(`UPDATE adminpanel_playersid SET license = '${license}' WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                                            if (error) {
                                                console.log(colors.red(error));
                                            }
                                        });
                                    }
                                    if (results[0].license2 === 'null') {
                                        // update license2
                                        connection.query(`UPDATE adminpanel_playersid SET license2 = '${license2}' WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                                            if (error) {
                                                console.log(colors.red(error));
                                            }
                                        });
                                    }
                                    if (results[0].ip === 'null') {
                                        // update ip
                                        connection.query(`UPDATE adminpanel_playersid SET ip = '${ip}' WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                                            if (error) {
                                                console.log(colors.red(error));
                                            }
                                        });
                                    }
                                    if (results[0].discord === 'null') {
                                        // update discord
                                        connection.query(`UPDATE adminpanel_playersid SET discord = '${discord}' WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                                            if (error) {
                                                console.log(colors.red(error));
                                            }
                                        });
                                    }
                                    if (results[0].fivem === 'null') {
                                        // update fivem
                                        connection.query(`UPDATE adminpanel_playersid SET fivem = '${fivem}' WHERE steam = '${steamidentifier}'`, function (error, results, fields) {
                                            if (error) {
                                                console.log(colors.red(error));
                                            }
                                        });
                                    }

                                } else {

                                    connection.query("INSERT INTO `adminpanel_playersid` (`steam`, `license`, `license2`, `ip`, `name`, `discord`, `fivem`) VALUES ('" + steamidentifier + "', '" + license + "', '" + license2 + "', '" + ip + "', '" + name + "', '" + discord + "', '" + fivem + "')", function (error, results, fields) {
                                        if (error) {
                                            console.log(colors.red(error));
                                        } else {
                                            console.log(colors.green(`Player ${name} connected with steamidentifier: ` + colors.magenta(steamidentifier)));
                                        }
                                    })

                                }
                            }
                        }
                        );

                    } else {
                        console.log(colors.red(`Player ${name} connected without steam.`));
                        deferrals.update(`Hello ${name}. Your steam ID is being checked.`)
                    }
                }, 200);
                deferrals.done();

            }, 0)
        }
    })


    on("playerDropped", (reason) => {

        if (veriymysqlconn()) {

            const player = global.source;

            let steamidentifier = null;
            let license = null;
            let discord = null;
            let fivem = null;
            let license2 = null;
            let ip = null;

            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);
                // console.log(colors.blue(`Player ${name} connected with identifier: ` + colors.magenta(identifier)));
                if (identifier.includes('steam:')) {
                    steamidentifier = identifier;
                }
                if (identifier.includes('license2:')) {
                    license2 = identifier;
                }
                if (identifier.includes('license:')) {
                    license = identifier;
                }
                if (identifier.includes('ip:')) {
                    ip = identifier;
                }
                if (identifier.includes('discord:')) {
                    discord = identifier;
                }
                if (identifier.includes('fivem:')) {
                    fivem = identifier;
                }
            }

            if (!reason.includes('[EDIT_USER]')) {

                logs['log'](`Player ${GetPlayerName(global.source)} dropped (Reason: ${reason}).`, 'exit / dropped', connection);

            }


        }


    });


    on("onResourceStart", (resourceName) => {

        if (veriymysqlconn()) {
            logs['log'](`The resource ${resourceName} has been started.`, 'resource start', connection);
        }

    });

    on("onResourceStop", (resourceName) => {
              
        if (veriymysqlconn()) {
            logs['log'](`The resource ${resourceName} has been stopped.`, 'resource stop', connection);
        }

    });

}