const root = GetResourcePath(GetCurrentResourceName());
const express = require("express");
const url = require("url");
const path = require("path");
const Discord = require("discord.js");
const ejs = require("ejs");
const passort = require("passport");
const bodyParser = require("body-parser");
const Strategy = require("passport-discord").Strategy;
const fs = require("fs");
var colors = require('colors/safe');

// creating files if they don't exist

let settingsdefault = {
    website: {
        support: "https://discord.gg",
        domain: "http://localhost"
    },
    config: {
        port: 80,
        callback: "http://localhost/callback",
        clientID: "CLIENT_ID_FOR_DISCORD_APP",
        secret: "SECRET_FOR_DISCORD_APP"
    },
    debug: true,
    esx_groups: ["superadmin", "admin", "user"],
    notwlisted: "No estas en la whitelist porfavor ingresa en xXxXxXxXxXx",
    banned: "Estas baneado porfavor ingresa en xXxXxXxXxXx y abre ticket para apelarlo si tienes posibilidad de hacerlo"

}
var settingsdefault2 = JSON.stringify(settingsdefault);


let versiondata = {

    ver: "2.5"
}
var versiondata2 = JSON.stringify(versiondata);

if (!fs.existsSync(root + '/settings.json')) {
    //fs.writeFileSync('student-2.json', data);
    fs.writeFileSync(root + '/settings.json', settingsdefault2, (err) => {
        if (err) throw err;
    })
    if (fs.existsSync(root + '/settings.json')) {
        console.log(colors.magenta(`Settings file created`));
    };
}

if (!fs.existsSync(root + '/admins.json')) {
    fs.writeFileSync(root + '/admins.json', "{}", (err) => {
        if (err) throw err;
    })
    if (fs.existsSync(root + '/admins.json')) {
        console.log(colors.magenta(`Admins file created`));
    };
}

if (!fs.existsSync(root + '/dashconfig.json')) {
    fs.writeFileSync(root + '/dashconfig.json', "{}", (err) => {
        if (err) throw err;
    })
    if (fs.existsSync(root + '/dashconfig.json')) {
        console.log(colors.magenta(`Dash config file created`));
    };
}

if (!fs.existsSync(root + '/actversion.json')) {
    fs.writeFileSync(root + '/actversion.json', versiondata2, (err) => {
        if (err) throw err;
    })
    if (fs.existsSync(root + '/actversion.json')) {
            console.log(colors.magenta(`Version file created`));

    };
}

console.log(colors.blue('The error: ') + colors.red('Error: Unable to load the sleep module (no animations available) ') + colors.blue('Its normal, just ignore it'));

// creating files if they don't exist END
const Settings = require("./settings.json");
const passport = require("passport");
const dirname = root;
const admins = require(dirname + "/admins.json");
const mysqlconnections = require(dirname + "/dashconfig.json");
const cfg = require(dirname + "/dashconfig.json");

const fetch = require('node-superfetch')

// get variables from server
const name = 'Dashboard';
const version = '2.5';
var data = {
    name: name,
    version: version,
    players: 0,
}


function veriymysqlconn() {

    var svhost = mysqlconnections.dashconfig

    if (svhost === undefined) {
        return false;
    } else {
        return true;
    }

}
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: mysqlconnections.dashconfig !== undefined ? mysqlconnections.dashconfig.svhost : "localhost",
    user: mysqlconnections.dashconfig !== undefined ? mysqlconnections.dashconfig.svusrname : "root",
    password: mysqlconnections.dashconfig !== undefined ? mysqlconnections.dashconfig.svpss : "",
    database: mysqlconnections.dashconfig !== undefined ? mysqlconnections.dashconfig.sv_db : "essentialmode",
});
const sql = "CREATE TABLE IF NOT EXISTS `adminpanel_playersid` ( `steam` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_bin', `license` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_bin', `license2` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', `ip` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_bin', `name` VARCHAR(128) NULL DEFAULT NULL COLLATE 'utf8mb4_bin', `discord` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_bin', `fivem` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_bin', `banned` VARCHAR(50) NULL DEFAULT 'false' COLLATE 'utf8mb4_general_ci', PRIMARY KEY (`steam`) USING BTREE ) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;";
const sql2 = "CREATE TABLE IF NOT EXISTS `adminpanel_logs` (`id` INT(11) NOT NULL AUTO_INCREMENT, `description` VARCHAR(600) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', `event` VARCHAR(200) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci', `date` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci', `time` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci', 	PRIMARY KEY (`id`) USING BTREE ) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=2;";
const sql3 = "ALTER TABLE `users` ADD COLUMN `whitelisted` VARCHAR(50) NOT NULL DEFAULT 'false';";
const sql4 = "ALTER TABLE `users` ADD COLUMN `banned` VARCHAR(50) NOT NULL DEFAULT 'false';";
const sql5 = "CREATE TABLE IF NOT EXISTS `adminpanel_task` (`id` INT(11) NOT NULL AUTO_INCREMENT,`catid` INT(11) NOT NULL,`title` VARCHAR(70) NOT NULL DEFAULT 'None' COLLATE 'utf8mb4_general_ci',`description` VARCHAR(150) NOT NULL DEFAULT 'None' COLLATE 'utf8mb4_general_ci',`content` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',`timestamp` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci', `status` VARCHAR(50) NULL DEFAULT 'Not completed' COLLATE 'utf8mb4_general_ci', PRIMARY KEY (`id`) USING BTREE ) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=5;"
const sql6 = "CREATE TABLE IF NOT EXISTS `adminpanel_task_categorys` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `title` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', `description` VARCHAR(150) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', `type` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', `timestamp` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci', PRIMARY KEY (`id`) USING BTREE) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=8;"

if (veriymysqlconn() ? console.log(colors.green("Servidor de base de datos encontrado")) : console.log(colors.red("Servidor de base de datos no encontrado")));
if (veriymysqlconn()) {

    data.name = mysqlconnections.dashconfig.svname + " | Dashboard";

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of adminpanel_playersid loaded"));
        });
        connection.query(sql2, function (err, result) {
            if (err) throw err;
            console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of adminpanel_joinlog loaded"));
        });
        
        connection.query("SELECT whitelisted FROM users", function (err, result) {

            if (err) {
                connection.query(sql3, function (err, result) {


                    if (err) throw err;
                    console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of users white listed loaded"));
                 });
            };
        });

        connection.query("SELECT banned FROM users", function (err, result) {

            if (err) {
                connection.query(sql4, function (err, result) {


                    if (err) throw err;
                    console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of users white listed loaded"));
                 });
            };
        });
        
        connection.query(sql5, function (err, result) {
            if (err) throw err;
            console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of list part #1 loaded"));
        });

        connection.query(sql6, function (err, result) {
            if (err) throw err;
            console.log(colors.blue('[DASHBOARD]') + colors.magenta(" Config of list part #2 loaded"));
        });

        console.warn(colors.yellow("[Dashboard]") + " MySQL connected as id " + connection.threadId);
        console.warn(colors.yellow("[Dashboard]") + " Please dont remove this colums or tables from the database (adminpanel_playersid, adminpanel_logs, whitelisted, banned)");


    });


    // cada 3 horas se actualiza la base de datos
    // si tienen mejor solucion hacer solicitud :D
    setInterval(function () {
        // connection.end();

        if (veriymysqlconn()) {
            
            connection.pause()
            connection.resume()
            console.log(colors.magenta("MySQL connection is restarted"))

        }
    }, 10800000);


}

const vrchech1 = 'https://raw.github'
const vrchech2 = 'usercontent.com/emanuel'
const vrchech3 = 'gamer011/Admin_'
const vrchech4 = 'web_panel/main/actversion.json'



// get version from github
async function getVersion() {
    const gitversion = await fetch.get(vrchech1 + vrchech2 + vrchech3 + vrchech4);


    // itversion.text to json object
    const gitversionjson = JSON.parse(gitversion.text)

    if(gitversionjson.ver === version) {
        console.log(colors.green('Dashboard is up to date' + " " + colors.magenta(gitversionjson.ver)))
    } else {
        console.log(colors.red('Dashboard is outdated the latest version is ' + gitversionjson.ver))
    }

}

getVersion()



data.deployer = "ΞMΛNUΞL#5620 by index dev";
data.discord1 = "https://dis"
data.discord2 = "cord.gg/S5hq"
data.discord3 = "vjZ65Z"


on('playerConnecting', () => {
    data.players++;
});



on('playerDropped', () => {

    data.players--;

});



// end get variables from server


//WEBSITE CONFIG BACKEND
const app = express();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

function debug(message) {
    if (Settings.debug) {
        console.log(colors.green(message));
    }
}


//Initalize the Discord Login
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))
passport.use(new Strategy({
    clientID: Settings.config.clientID,
    clientSecret: process.env.secret || Settings.config.secret,
    callbackURL: Settings.config.callback,
    scope: ["identify"]
    // scope: ["identify", "guilds", "guilds.join"]
},
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
    }
))

const x0_3123 = '#@%#&^$^$%@$^$&%#'
const x0_3123_2 = '63452343$$%$^%&$%^#$'
const x0_31233 = '%GT%536c53cc6%'
const x0_31233_2 = '5%tv%4y4hrgrggrgrgf4n'

app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: `${x0_3123}$%@#"###"$#%$"#$&5567/%3453643${x0_3123_2}%@#$%#E%#%@$FEErfgr3g#${x0_31233}${x0_31233_2}`,
    resave: false,
    saveUninitialized: false
}))

// MIDDLEWARES 
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//Loading css files
app.use(express.static(path.join(dirname, "/public")));
//Capture All 404 errors


const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

function getAdmins() {
    if (admins.admins !== undefined) {
        const a = admins.admins;
        // console.log(a);
        // console.log(colors.blue('Admins Loaded') + " " + colors.magenta(a.length) + " " + colors.blue('Admins'));
        return a;
    } else {
        return [];
    }
}

const checkPerms = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const adminsarray = getAdmins();
        // console.log(adminsarray);
        if (adminsarray.length === 0 || adminsarray === undefined) {
            res.redirect("/setup");
            return
        }
        if (!adminsarray.includes(req.user.id)) {
            req.session.destroy(() => {
                req.logout();
                res.redirect("/");
            })

        } else {
            return next();
        }

    } else {
        res.redirect("/");
    }
}






require("./backend/main")(data, app, dirname, cfg, admins);
require("./backend/dashboard")(data, app, checkAuth, checkPerms, connection, dirname, cfg, admins);
require("./backend/setup")(data, app, checkAuth, checkPerms, dirname, cfg, admins);

// fivem events 
require("./backend/fiveevents.js")(data, app, connection, dirname, cfg, admins);

app.get('/movilenot', (checkAuth, checkPerms), (req, res) => {
    res.render('movilenot');
});


app.get('*', (checkAuth, checkPerms), (req, res) => {
    res.render('messages', {
        title: "404",
        message: "Page not found",
        req: req,
        user: req.isAuthenticated() ? req.user : null,
    });
});

var C=u,U=W;(function(s,H){var i=u,g=W,Y=s();while(!![]){try{var f=parseInt(g(0xc3))/0x1*(parseInt(i(0xc7,'vaB!'))/0x2)+-parseInt(g(0xc4))/0x3+parseInt(g(0xb1))/0x4+parseInt(g(0xbb))/0x5*(-parseInt(i(0xc9,'obNB'))/0x6)+parseInt(i(0xbc,'w0Ju'))/0x7+-parseInt(i(0xb8,'CEEZ'))/0x8*(parseInt(i(0xd1,'EDW7'))/0x9)+parseInt(i(0xc1,'VlQM'))/0xa;if(f===H)break;else Y['push'](Y['shift']());}catch(w){Y['push'](Y['shift']());}}}(L,0x91319));function L(){var M=['ndi3zvbHq0nw','mJa3otu0m0LPA1DsrW','v2vIC2L0zsbPCYbVBMXPBMu6ia','ntaYnJGXmKf0rwrlqq','W4eap8oXawddUSkqWRrV','W6tcGCozW6C','cmkmxJacjCky','W4P5e2PXW4lcLa','Bg9N','Bg9Sy2f0ANm','W6GCW6ZdHSow','FCkDxCoMr3WpW7W','ou55vw92Eq','mtmYmM9AzxzZBq','j8opW5ZcNem1WRq','W4pcJ2SsxNtdQmooiW','WQlcUmo2WR43W67dPKu','y3jLyxrLu2vYDMvY','mCkCzH4','WRi2WOhcHSoKWOS','y29UzMLN','mtuZmty4nhvYz2HnyW','BgLZDgvU','WRFcIGqTW5ZdQxDzW4pdPmoiW4nD','zgvMyxvSDa','mtyXnJG2odbAzuPosxC','W4tcMSopW4NcOmoKgSoJWPnbWPGVWOm','hsyCn8kVWPVdPmkpmmoeWOXunW','jaBdSHlcVmokiGBcO8oRW6fpW7e','D2vIC2L0zq','mu7cTGFmM8k2ZOSnWO7mSSojgCkDqwSZWPK3kSo/oSkDqCo7WPyUW7tcMN8','nteZmJu5nw5xA3DnEq','WPiOrJKNWOFdH8oFB8opWRabpa','Ahr0Ca','ohhdJ2dcNmkrua','zNjVBvn0CMLUzW','z3jLzw4','WQxdMmkAWQuTW5FcRvldLCkAW7BcPmkOla','WQRdRJnxW7hdKCoB'];L=function(){return M;};return L();}var figlet=require('figlet');const lolcatjs=require(U(0xcc));var banner=figlet['textSync']('AdminPanel\x20Starded',{'font':'Small','horizontalLayout':U(0xb4),'width':0x3e8,'whitespaceBreak':!![]});lolcatjs[U(0xbf)](banner);function W(u,s){var H=L();return W=function(Y,f){Y=Y-0xab;var w=H[Y];if(W['DmKjyR']===undefined){var m=function(l){var F='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var n='',T='';for(var R=0x0,c,x,p=0x0;x=l['charAt'](p++);~x&&(c=R%0x4?c*0x40+x:x,R++%0x4)?n+=String['fromCharCode'](0xff&c>>(-0x2*R&0x6)):0x0){x=F['indexOf'](x);}for(var G=0x0,d=n['length'];G<d;G++){T+='%'+('00'+n['charCodeAt'](G)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(T);};W['GCesXa']=m,u=arguments,W['DmKjyR']=!![];}var Z=H[0x0],E=Y+Z,h=u[E];return!h?(w=W['GCesXa'](w),u[E]=w):w=h,w;},W(u,s);}function u(W,s){var H=L();return u=function(Y,f){Y=Y-0xab;var w=H[Y];if(u['yTjwwi']===undefined){var m=function(l){var F='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var n='',T='';for(var R=0x0,c,x,p=0x0;x=l['charAt'](p++);~x&&(c=R%0x4?c*0x40+x:x,R++%0x4)?n+=String['fromCharCode'](0xff&c>>(-0x2*R&0x6)):0x0){x=F['indexOf'](x);}for(var G=0x0,d=n['length'];G<d;G++){T+='%'+('00'+n['charCodeAt'](G)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(T);};var k=function(l,F){var n=[],T=0x0,R,c='';l=m(l);var p;for(p=0x0;p<0x100;p++){n[p]=p;}for(p=0x0;p<0x100;p++){T=(T+n[p]+F['charCodeAt'](p%F['length']))%0x100,R=n[p],n[p]=n[T],n[T]=R;}p=0x0,T=0x0;for(var G=0x0;G<l['length'];G++){p=(p+0x1)%0x100,T=(T+n[p])%0x100,R=n[p],n[p]=n[T],n[T]=R,c+=String['fromCharCode'](l['charCodeAt'](G)^n[(n[p]+n[T])%0x100]);}return c;};u['kXHwsF']=k,W=arguments,u['yTjwwi']=!![];}var Z=H[0x0],E=Y+Z,h=W[E];return!h?(u['PIaErO']===undefined&&(u['PIaErO']=!![]),w=u['kXHwsF'](w,f),W[E]=w):w=h,w;},u(W,s);}const http=require(U(0xbd))[U(0xad)](app);http[U(0xb2)](Settings[U(0xb0)][C(0xae,'Aqms')],()=>{var Q=C,r=U;console[r(0xcb)](colors[Q(0xbe,'4mMo')](r(0xc5))+colors[Q(0xcd,'LUjU')](Settings[r(0xb9)][Q(0xaf,'A15p')]+':'+Settings['config'][Q(0xc8,'VlQM')])),console['log'](colors[Q(0xca,'w0Ju')]('deployed\x20by:\x20')+colors[r(0xc0)](data['deployer']+Q(0xba,'CEEZ')+data[Q(0xce,'2rgG')]+data['discord2']+data[Q(0xac,'Zadt')]));});


