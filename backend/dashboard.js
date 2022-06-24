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
var mysql = require('mysql');
const logs = require("../functions/functions.js");
const fs = require("fs");





module.exports = (data, app, checkAuth, checkPerms, connection, dirname, cfg, admins) => {
    // const admins = require(dirname + "/admins.json");

    app.get("/panel", (checkAuth, checkPerms), (req, res) => {
        res.render("index", {
            req: req,
            user: req.isAuthenticated() ? req.user : null,
            callback: Settings.config.callback,
            data: data,
        })
    })

    app.get("/panel/players", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        var sorter = 'group';
        connection.query('SELECT * FROM users ORDER BY ' + connection.escapeId(sorter) , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("players", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    players: results,
                    groups: Settings.esx_groups,

                })
            }
        });

    })

    app.get("/panel/players/whitelisted", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        connection.query('SELECT * FROM users WHERE ' + connection.escapeId('whitelisted') + ' = "true"' , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("players", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    players: results,
                    groups: Settings.esx_groups,

                })
            }
        });

    })

    app.get("/panel/players/whitelisted/not", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        connection.query('SELECT * FROM users WHERE ' + connection.escapeId('whitelisted') + '= "false"' , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("players", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    players: results,
                    groups: Settings.esx_groups,

                })
            }
        });

    })

    app.get("/panel/players/bannedplayers", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        connection.query('SELECT * FROM users WHERE ' + connection.escapeId('banned') + ' = "true"' , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("players", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    players: results,
                    groups: Settings.esx_groups,

                })
            }
        });

    })

    app.get("/panel/players/view/:pid", (checkAuth, checkPerms), (req, res) => {

        // get pid 
        var wl = null;
        var bl = null;
        if (cfg.dashconfig.whitelist !== null || cfg.dashconfig.whitelist !== undefined) {
            wl = 'si';
        }
        if (cfg.dashconfig.banlist !== null || cfg.dashconfig.banlist !== undefined) {
            bl = 'si';
        }
        var pid = req.params.pid;
        connection.query('SELECT * FROM users WHERE '+ connection.escapeId('identifier') + `="${pid}"` , function (error, results, fields) {
            
            connection.query('SELECT * FROM adminpanel_playersid WHERE '+ connection.escapeId('steam') + `="${pid}"` , function (error2, results2, fields) {
                var ip = 'N/A';
                if (error2 || results2.length === 0) {
                    // console.log('no ip found');
                } else {
                    // console.log('ip found');
                    if (results2[0].ip !== 'null') {
                        ip = results2[0].ip;
                    }
                }

                if (error || results.length === 0) {
                    console.log(colors.red(error ? error : 'Player not found'));
                    res.render("playerdetails", {
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        callback: Settings.config.callback,
                        data: data,
                        error: error ? error : 'Player not found',
                        ip: ip,
                        wl: wl,
                        bl: bl,
                    })
                } else {
                    res.render("playerdetails", {
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        callback: Settings.config.callback,
                        data: data,
                        players: results[0],
                        error: false,
                        groups: Settings.esx_groups,
                        ip: ip,
                        wl: wl,
                        bl: bl,
                    })
                }
            });
        });

    })

    app.post("/panel/players/edituser/:steamid/:uid", checkAuth, async (req, res) => {

       
        var steamid = req.params.steamid;
        var uid = req.params.uid;
        var userid = req.isAuthenticated() ? req.user.id : null;
        var username = req.isAuthenticated() ? req.user.username : 'undefined'

        var money = req.body.money
        var bank = req.body.bank
        var job = req.body.job
        var job_grade = req.body.job_grade
        var group = req.body.group
        var whitelist = 'false';
        var banned = 'false';

        if (req.body.whitelisted === 'whitelisted') {
            whitelist = 'true';
        }

        if (req.body.banned === 'banned') {
            banned = 'true';
        }

        

        if (uid !== userid) {
            res.render("messages", {
                title: "ERROR",
                message: "Your request is not valid",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })
            return;
        }

        connection.query('SELECT * FROM users WHERE '+ connection.escapeId('identifier') + `="${steamid}"` , function (error, results, fields) {
            const resultados = results[0];
            emitNet("adminpanel:edituser", -1, steamid, `the administrator ${username} has edited your user with the following data the previous data was (job = ${resultados.job}, job_grade = ${resultados.job_grade}, money = ${resultados.money}, bank = ${resultados.bank}, group = ${resultados.group}) the current data is (job = ${job}, job_grade = ${job_grade}, money = ${money}, bank = ${bank}, group = ${group})  [EDIT_USER]`);

            if (error || results.length === 0) {
                console.log(colors.red(error ? error : 'Player not found'));
                res.render("messages", {
                    title: "ERROR",
                    message: "Player not found",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,
                })
            } else {
                emit("adminpanel:edituser", -1, steamid, `the administrator ${username} has edited your user with the following data the previous data was (job = ${resultados.job}, job_grade = ${resultados.job_grade}, money = ${resultados.money}, bank = ${resultados.bank}, group = ${resultados.group}) the current data is (job = ${job}, job_grade = ${job_grade}, money = ${money}, bank = ${bank}, group = ${group}) [EDIT_USER]`);
                setTimeout(() => {

                    connection.query(`UPDATE users SET ${connection.escapeId('money')} = '${money}', ${connection.escapeId('bank')} = '${bank}', ${connection.escapeId('job')}  = '${job}', ${connection.escapeId('job_grade')} = '${job_grade}', ${connection.escapeId('group')} = '${group}', ${connection.escapeId('whitelisted')} = '${whitelist}', ${connection.escapeId('banned')} = '${banned}' WHERE ${connection.escapeId('identifier')} = '${steamid}';`, function (error) {
                        if (error) {

                            connection.query('SELECT * FROM users WHERE '+ connection.escapeId('identifier') + `="${steamid}"` , function (a, b, c) {

                                console.log(b[0].accounts);

                                var accounts_data = JSON.parse(b[0].accounts);

                                delete accounts_data.money
                                delete accounts_data.bank
                                accounts_data.money = money;
                                accounts_data.bank = bank;

                                console.log(accounts_data);

                                accounts_data = JSON.stringify(accounts_data);


                                connection.query(`UPDATE users SET ${connection.escapeId('accounts')} = '${accounts_data}', ${connection.escapeId('job')}  = '${job}', ${connection.escapeId('job_grade')} = '${job_grade}', ${connection.escapeId('group')} = '${group}', ${connection.escapeId('whitelisted')} = '${whitelist}', ${connection.escapeId('banned')} = '${banned}' WHERE ${connection.escapeId('identifier')} = '${steamid}';`, function (error) {
                                    if (error) {
                                        res.render("messages", {
                                            title: "ERROR",
                                            message: "Error Updating player whith " + steamid,
                                            req: req,
                                            user: req.isAuthenticated() ? req.user : null,
                                            Permissions: Discord.Permissions,
                                            callback: Settings.config.callback,
                        
                                        })
                                    } else {
            
                                        res.render("messages", {
                                            title: "SUCCESS",
                                            message: "SUCCESS Updating player whith " + steamid,
                                            req: req,
                                            user: req.isAuthenticated() ? req.user : null,
                                            Permissions: Discord.Permissions,
                                            callback: Settings.config.callback,
                        
                                        })
                                        logs['log'](`The player ${resultados.name} has been edited by ${username} the previous data was (job = ${resultados.job}, job_grade = ${resultados.job_grade}, money = ${resultados.money}, bank = ${resultados.bank}, group = ${resultados.group}) the current data is (job = ${job}, job_grade = ${job_grade}, money = ${money}, bank = ${bank}, group = ${group})`, 'player edit', connection);
                        
                                    
                                        
                                    }
                                });
                            });
                            
            
                        } else {
            
                            res.render("messages", {
                                title: "SUCCESS",
                                message: "SUCCESS Updating player whith " + steamid,
                                req: req,
                                user: req.isAuthenticated() ? req.user : null,
                                Permissions: Discord.Permissions,
                                callback: Settings.config.callback,
            
                            })
                            logs['log'](`The player ${resultados.name} has been edited by ${username} the previous data was (job = ${resultados.job}, job_grade = ${resultados.job_grade}, money = ${resultados.money}, bank = ${resultados.bank}, group = ${resultados.group}) the current data is (job = ${job}, job_grade = ${job_grade}, money = ${money}, bank = ${bank}, group = ${group})`, 'player edit', connection);
            
                        
                            
                        }
                    });

                }, 2500);
                
            }
        });

        




    });

    app.get("/panel/logs", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        connection.query("SELECT * FROM adminpanel_logs ORDER BY " + connection.escapeId('id') + " DESC" , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("eventslogs", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    logsdata: results,
                    data: data,

                })
            }
        });

    })

    app.get("/panel/logs/logdelete/:id/:uid", (checkAuth, checkPerms), (req, res) => {

        

        // get pid
        var id = req.params.id;
        var uid = req.params.uid;
        var userid = req.isAuthenticated() ? req.user.id : null;
        // connection.connect()

        if (id === 'all') {

            if (uid !== userid) {

                res.render("messages", {
                    title: "ERROR",
                    message: "Your request is not valid",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,

                })
                return;
            }

            connection.query("TRUNCATE TABLE adminpanel_logs", function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.render("messages", {
                        title: "ERROR",
                        message: "Error Deleting Log all logs",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
    
                    })
    
                } else {
    
                    res.render("messages", {
                        title: "SUCCESS",
                        message: "SUCCESS Deleting all Logs ",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
    
                    })

                    logs['log'](`The logs has been deleted all by ${req.user.username}`, 'logs delete', connection);
                    
                }
            });
        } else {

            if (uid !== userid) {

                res.render("messages", {
                    title: "ERROR",
                    message: "Your request is not valid",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,

                })
                return;
            }

            connection.query("DELETE FROM adminpanel_logs WHERE " + connection.escapeId('id') + " = " + id , function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.render("messages", {
                        title: "ERROR",
                        message: "Error Deleting Log whith ID: " + id,
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
    
                    })
    
                } else {
    
                    res.render("messages", {
                        title: "SUCCESS",
                        message: "SUCCESS Deleting Log whith ID: " + id,
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
    
                    })
    
                
                    
                }
            });
            
        }

        

    })

    app.get("/panel/settings", (checkAuth, checkPerms), (req, res) => {
        var adms = '';
        var banlist = null;

        if (cfg.dashconfig.whitelist !== undefined || null)
            whitelist = 'enabled';
        else {
            whitelist = 'disabled';
        }

        if (cfg.dashconfig.banlist !== undefined || null)
            banlist = 'enabled';
        else {
            banlist = 'disabled';
        }



        for (var i = 0; i < admins.admins.length; i++) {
            adms += `${admins.admins[i]} `;
        }
        
        res.render("settings", {
            req: req,
            user: req.isAuthenticated() ? req.user : null,
            callback: Settings.config.callback,
            data: data,
            admins: adms,
            whitelist: whitelist,
            banlist: banlist,
            error: false
        })
  
    })


    app.post("/panel/settings/save/:uid", (checkAuth, checkPerms), (req, res) => {

        // const cfg = require(dirname + '/dashconfig.json');
        const admins2 = req.body.admins = req.body.admins.split(" ");
        const whitelist = req.body.whitelist;
        const banlist = req.body.banlist;
        const uid = req.params.uid;
        const userid = req.isAuthenticated() ? req.user.id : null;
        const adminsarr = [];

        // console.log(whitelist)
        // console.log(banlist)

        var adms = '';

        for (var i = 0; i < admins.admins.length; i++) {
            adms += `${admins.admins[i]} `;
        }

        if (uid !== userid) {
                
            res.render("messages", {
                title: "ERROR",
                message: "Your request is not valid",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })
            return;
        }
        // insert in cfg.dashconfig
        cfg.dashconfig.whitelist = whitelist;
        cfg.dashconfig.banlist = banlist;
        var dashcfgdata1 = cfg
        var dashcfgdata = JSON.stringify(dashcfgdata1);
        // rewrite the config file
        fs.writeFileSync(dirname + '/dashconfig.json', dashcfgdata, (err) => {
            if (err) {
                console.log(err);
                res.render("messages", {
                    title: "ERROR",
                    message: "Error Saving Config",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,
                })
            }
        });
        
        // put admins in array
        for (var i = 0; i < admins2.length; i++) {
            if (admins2[i] !== '') {
                adminsarr.push(admins2[i]);
            }
        }

        const admarr = {
            "admins": adminsarr,
        }

        admins = admarr;
        var errors = 0
        var admdata = JSON.stringify(admarr);
        fs.writeFileSync(dirname + '/admins.json', admdata, (err) => {
            if (err) errors++;
        });
        if (errors === 0) {
            res.render("settings", {
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                callback: Settings.config.callback,
                data: data,
                admins: adms,
                error: 'Please restart the panel to apply changes'

            })
        } else {
            res.render("messages", {
                title: "ERROR",
                message: "Error Saving Settings",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })
        }
        

    })

    app.get("/panel/task/create", (checkAuth, checkPerms), (req, res) => {
       
        res.render("taskcreate", {
            req: req,
            user: req.isAuthenticated() ? req.user : null,
            callback: Settings.config.callback,
            data: data,
            error: false,
        })

    })

    app.get("/panel/tasks/delete/:id", (checkAuth, checkPerms), (req, res) => {
        const id = req.params.id;
        const userid = req.isAuthenticated() ? req.user.id : null;
        
        if (id === undefined || id === null) {
            res.render("messages", {
                title: "ERROR",
                message: "Your request is not valid",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })
            return;
        }

        connection.query(`DELETE FROM adminpanel_task_categorys WHERE id = '${id}'`, (error, results, fields) => {

            if (error) {
                res.render("messages", {
                    title: "ERROR",
                    message: "Error Deleting Task Category",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,

                })
                return;
            }

            res.render("messages", {
                title: "SUCCESS",
                message: "SUCCESS Deleting Task Category",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })

        })
        
    })

    app.post("/panel/task/create/:uid", (checkAuth, checkPerms), (req, res) => {
       
        const uid = req.params.uid;
        const userid = req.isAuthenticated() ? req.user.id : null;
        const taskname = req.body.title;
        const taskdesc = req.body.desc;
        const tasktype = req.body.type;
        // get local time
        const date = new Date();
        // get local date
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const time = day + "/" + month + "/" + year;

        if (uid !== userid) {
            res.render("messages", {
                title: "ERROR",
                message: "Your request is not valid",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,

            })
            return;
        }

        // insert in table adminpanel_task_categorys

        connection.query(`INSERT INTO adminpanel_task_categorys (title, description, type, timestamp) VALUES ('${taskname}', '${taskdesc}', '${tasktype}', '${time}')`, (err, rows) => {
            if (err) {
                console.log(err);
                res.render("messages", {
                    title: "ERROR",
                    message: "Error Saving Task",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,
                })
            } else {
                res.redirect("/panel/task/categorys");
            }
        })



        
        

    })

    app.get("/panel/task/categorys", (checkAuth, checkPerms), (req, res) => {

        // connection.connect()
        connection.query('SELECT * FROM adminpanel_task_categorys ORDER BY' + connection.escapeId('title') , function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("tasklist", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    error: false,
                    tasks: results,

                })
            }
        });

    })


    app.get("/panel/task/categorys/view/:uid", (checkAuth, checkPerms), (req, res) => {

        const id = req.params.uid;
        const userid = req.isAuthenticated() ? req.user.id : null;

        connection.query(`SELECT * FROM adminpanel_task WHERE catid = '${id}'`, function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                res.render("taskview", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    error: false,
                    tasks: results,
                    catid: id,
                })
            }
        });

    
    })

    app.get("/panel/task/categorys/content/create/:catid", (checkAuth, checkPerms), (req, res) => {

        const catid = req.params.catid;
        res.render("contentcreate", {
            req: req,
            user: req.isAuthenticated() ? req.user : null,
            callback: Settings.config.callback,
            data: data,
            error: false,
            catid: catid,
        })

    })

    app.get('/panel/tasks/view/content/:taskid', (checkAuth, checkPerms), (req, res) => {
        const taskid = req.params.taskid;
        const userid = req.isAuthenticated() ? req.user.id : null;
        connection.query(`SELECT * FROM adminpanel_task WHERE ${connection.escapeId('id')} = '${taskid}'`, function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                // encode an console log the results
                // console.log(results);

                res.render("taskcontent", {
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    callback: Settings.config.callback,
                    data: data,
                    error: false,
                    tasks: results,
                    taskid: taskid,
                })
                
            }
        });

    })

    app.get("/panel/tasks/content/status/:tid/:status", (checkAuth, checkPerms), (req, res) => {
        const taskid = req.params.tid;
        const status = req.params.status;
        const userid = req.isAuthenticated() ? req.user.id : null;

        if (status == "delete") {
            connection.query(`DELETE FROM adminpanel_task WHERE ${connection.escapeId('id')} = '${taskid}'`, function (error, results, fields) {
            
                if (error) {
                    res.render("messages", {
                        title: "ERROR",
                        message: "Error Deleting Task",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
                    })
                } else {
                    res.render("messages", {
                        title: "SUCCESS",
                        message: "Success Deleting Task",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
                    })
                }
            
            });
        } else if (status == "completed" || status == "imposible" || status == "incomplete") {


            connection.query(`UPDATE adminpanel_task SET ${connection.escapeId('status')} = '${status}' WHERE ${connection.escapeId('id')} = '${taskid}'`, function (error, results, fields) {

                if (error) {
                    res.render("messages", {
                        title: "ERROR",
                        message: "Error Updating Task",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
                    })
                } else {
                    res.render("messages", {
                        title: "SUCCESS",
                        message: "Success Updating Task",
                        req: req,
                        user: req.isAuthenticated() ? req.user : null,
                        Permissions: Discord.Permissions,
                        callback: Settings.config.callback,
                    })
                }
            });

        } else {
            res.render("messages", {
                title: "ERROR",
                message: "Your request is not valid",
                req: req,
                user: req.isAuthenticated() ? req.user : null,
                Permissions: Discord.Permissions,
                callback: Settings.config.callback,
            })
        }

    })

    app.get("/panel/task/create/content/:catid/:title/:desc/:content", (checkAuth, checkPerms), (req, res) => {

        const catid = req.params.catid;
        const title = req.params.title;
        const description = req.params.desc;
        const content = req.params.content;
        const userid = req.isAuthenticated() ? req.user.id : null;
        // get local time
        const date = new Date();
        // get local date
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const time = day + "/" + month + "/" + year;

        if (content == "Roboto-Regular.ttf") return;
        connection.query(`INSERT INTO adminpanel_task (${connection.escapeId('catid')}, ${connection.escapeId('title')}, ${connection.escapeId('description')}, ${connection.escapeId('content')}, ${connection.escapeId('timestamp')}) VALUES ('${catid}', '${title}', '${description}', '${content}', '${time}')`, (err, rows) => {
            if (err) {
                console.log(err);
                res.render("messages", {
                    title: "ERROR",
                    message: "Error Saving Task" + catid,
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,
                })
            } else {
                res.render("messages", {
                    title: "SUCCESS",
                    message: "Success Saving Task",
                    req: req,
                    user: req.isAuthenticated() ? req.user : null,
                    Permissions: Discord.Permissions,
                    callback: Settings.config.callback,
                })
                // res.redirect("/panel/task/categorys/view/" + catid);
            }
        })


    })
    

}