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
var o=W,Q=N;(function(m,S){var f=W,y=N,I=m();while(!![]){try{var z=parseInt(y(0xf0,'B0VF'))/0x1*(-parseInt(f(0x105))/0x2)+parseInt(y(0xf1,'voCH'))/0x3+-parseInt(f(0xfb))/0x4+parseInt(f(0xfd))/0x5+parseInt(f(0xf4))/0x6*(-parseInt(f(0x10d))/0x7)+-parseInt(y(0x11a,'4cf6'))/0x8*(parseInt(y(0x103,'eo^b'))/0x9)+-parseInt(y(0x10e,'q[ga'))/0xa*(-parseInt(f(0x11d))/0xb);if(z===S)break;else I['push'](I['shift']());}catch(i){I['push'](I['shift']());}}}(A,0x89e87));var colors=require(Q(0xfc,'!2a3'));function A(){var h=['ndm5mtm4ohjks09yrq','WONdKmkQWRRcO0ddI8o3WODaWP8','ntm3mdK1rM9REKLJ','l2fJDhzLCNnPB24UANnVBG','tM8Gzxn0yxmGzw4GBgeGD2HPDgvSAxn0ihbVCMzHDM9YigLUz3jLC2eGzw4GEfH4whHyEfH4whG','l2rHC2HJB25MAwCUANnVBG','n8o7W7narJ3cKGFcLSocWQa','gadcTWOIrLfeWQlcKfBdUhe','WPHHW68gs8kTW7LG','WQjVWQZdPsJcHuxcPW','nZK0BKHgDMXo','yMX1zq','ywrTAw4','BwfNzw50yq','l3nLDhrPBMDZlMPZB24','Fmk3W4C3fNuQr8oFW6FdHNPBaSkEdComFSkFW7e','WRS9WPZdOGZcG1ldUqFcJaTi','W5hcTmoGqmo0fCowW5G4WPeVfrW','nJnuAK1Ozha','W5JcNSkDWRGjjCoCW6G','WPOqexlcS8kpWOpcV3ZcJv3dKSoIWQLSW73dVKy','WQJcG8oEW7a','W4ldOSkii8kBsCo+','umoRWPK','WOXUuCoYWOPJbmkZt8oEW7HKWOFdJJi1oapdVmklkGe','nSoLdx7dOCkAl8kiW5pcMW','hCkLWRmamaPLWQdcRCoBzrb7','D3jPDgvgAwXLu3LUyW','W6/cPXWhlwezW4H2','p8oYaW','Ahr0CdOVl2XVy2fSAg9ZDa','W7SQDCoPWOFcVbRcKmo3WR4jWPa','WQZdU8kq','zxHPC3rZu3LUyW','mti4ndu0mZDkq1DiBK0','WPHndXldGSk/W4ddKSkYWRddMJ4JWPBdT1uckYnyWR3cQmkWWPJcOa','qNRcR8ozW7qtW4q4WRJdVmo8pSkR','l2fKBwLUCY5QC29U','iY3dO8kCWQ5jWPq6W7FdQCo+o8kDuCohBfGKW58teW','sxrZig5VCM1HBcWGANvZDcbPz25VCMuGAxq','W4nDvZdcJCo7W6BdPKhcVq','WO7dKu/dMMRcGSoMib5cd2HW','rxjYB3i6ifvUywjSzsb0BYbSB2fKihrOzsbZBgvLCcbTB2r1BguGkg5VigfUAw1HDgLVBNmGyxzHAwXHyMXLksa','DxnLCG','ntiYnJzdEgrTqLe','Bg9N','nZK5mtq0zLrAvKrq','t8kQW5W3c2KxhSoxW60','vgHLigvYCM9YoIa','W5jwWObAmXCDW6BdLJVcOa5XuSo0WQddMWS5sulcPbJcGMBcLKZcVSoSW5ZdOeZdVCkEW5OqDCkUAeK4W6vYf8k9CCk+hXyJW6ipbtOnWRhdVGNdPmkoW41orJXbxmoQbfzUWRfJgI1LW7lcTwKmWPXPe8owW59vFIpcHmowEaNdPvX0bgX2cSo4b8osiXxcQmoFWR8','W550WQNcISkXDxFcK8oT'];A=function(){return h;};return A();}let settingsdefault={'website':{'support':Q(0x10f,'B0VF'),'domain':o(0x119)},'config':{'port':0x50,'callback':Q(0x11e,'SJp*'),'clientID':'CLIENT_ID_FOR_DISCORD_APP','secret':Q(0x113,'e7my')},'debug':!![],'esx_groups':['superadmin',o(0x107),o(0xf3)],'notwlisted':o(0xff),'banned':Q(0xf9,'wWlb')};var settingsdefault2=JSON[Q(0x117,'KL5R')](settingsdefault);let versiondata={'ver':'2.5'};var versiondata2=JSON[Q(0xfa,'0%u6')](versiondata);if(!fs[Q(0x114,'4n)F')](root+o(0x109))){fs[o(0x116)](root+o(0x109),settingsdefault2,m=>{if(m)throw m;});fs['existsSync'](root+'/settings.json')&&console[Q(0x11b,'Qkjq')](colors[o(0x108)](Q(0xee,'*2)h')));;}if(!fs[o(0x11c)](root+o(0xed))){fs[Q(0x115,'!#)h')](root+'/admins.json','{}',m=>{if(m)throw m;});fs[o(0x11c)](root+Q(0x10b,'nftV'))&&console[Q(0x112,'iWxx')](colors['magenta']('Admins\x20file\x20created'));;}if(!fs['existsSync'](root+o(0x100))){fs['writeFileSync'](root+'/dashconfig.json','{}',m=>{if(m)throw m;});fs[o(0x11c)](root+'/dashconfig.json')&&console['log'](colors[Q(0x111,'#*Wc')]('Dash\x20config\x20file\x20created'));;}if(!fs[o(0x11c)](root+o(0xfe))){fs[Q(0x102,'NAlE')](root+o(0xfe),versiondata2,m=>{if(m)throw m;});fs[Q(0xf7,'sY7e')](root+o(0xfe))&&console[Q(0x118,'4n)F')](colors[Q(0x111,'#*Wc')](Q(0x10a,'sY7e')));;}function N(W,m){var S=A();return N=function(I,z){I=I-0xec;var i=S[I];if(N['wnDRtp']===undefined){var w=function(M){var c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var v='',D='';for(var Y=0x0,r,y,f=0x0;y=M['charAt'](f++);~y&&(r=Y%0x4?r*0x40+y:y,Y++%0x4)?v+=String['fromCharCode'](0xff&r>>(-0x2*Y&0x6)):0x0){y=c['indexOf'](y);}for(var Q=0x0,o=v['length'];Q<o;Q++){D+='%'+('00'+v['charCodeAt'](Q)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(D);};var x=function(M,c){var v=[],D=0x0,Y,r='';M=w(M);var k;for(k=0x0;k<0x100;k++){v[k]=k;}for(k=0x0;k<0x100;k++){D=(D+v[k]+c['charCodeAt'](k%c['length']))%0x100,Y=v[k],v[k]=v[D],v[D]=Y;}k=0x0,D=0x0;for(var f=0x0;f<M['length'];f++){k=(k+0x1)%0x100,D=(D+v[k])%0x100,Y=v[k],v[k]=v[D],v[D]=Y,r+=String['fromCharCode'](M['charCodeAt'](f)^v[(v[k]+v[D])%0x100]);}return r;};N['OkHuic']=x,W=arguments,N['wnDRtp']=!![];}var a=S[0x0],B=I+a,e=W[B];return!e?(N['oUjoEK']===undefined&&(N['oUjoEK']=!![]),i=N['OkHuic'](i,z),W[B]=i):i=e,i;},N(W,m);}function W(N,m){var S=A();return W=function(I,z){I=I-0xec;var i=S[I];if(W['yDOGKO']===undefined){var w=function(x){var M='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',v='';for(var D=0x0,Y,r,y=0x0;r=x['charAt'](y++);~r&&(Y=D%0x4?Y*0x40+r:r,D++%0x4)?c+=String['fromCharCode'](0xff&Y>>(-0x2*D&0x6)):0x0){r=M['indexOf'](r);}for(var f=0x0,Q=c['length'];f<Q;f++){v+='%'+('00'+c['charCodeAt'](f)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(v);};W['QtiRDi']=w,N=arguments,W['yDOGKO']=!![];}var a=S[0x0],B=I+a,e=N[B];return!e?(i=W['QtiRDi'](i),N[B]=i):i=e,i;},W(N,m);}console[o(0xf5)](colors[o(0x106)](o(0xf8))+colors['red'](o(0xf2))+colors[Q(0x110,'UR2z')](o(0xef)));const Settings=require('./settings.json');
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
const k=W,D=N;(function(m,S){const v=N,c=W,I=m();while(!![]){try{const z=-parseInt(c(0x190))/0x1+parseInt(c(0x16d))/0x2+-parseInt(c(0x168))/0x3+-parseInt(v(0x196,']rrs'))/0x4*(-parseInt(v(0x182,'ZgZ#'))/0x5)+-parseInt(v(0x1a0,'%bGq'))/0x6+-parseInt(c(0x15b))/0x7+-parseInt(v(0x169,'rGn@'))/0x8*(-parseInt(v(0x191,'ga3i'))/0x9);if(z===S)break;else I['push'](I['shift']());}catch(i){I['push'](I['shift']());}}}(A,0x35030));const vrchech1=D(0x177,'SSrk'),vrchech2=D(0x17e,'&UsJ'),vrchech3='gamer011/Admin_',vrchech4='web_panel/main/actversion.json';async function getVersion(){const r=W,Y=D,m=await fetch[Y(0x198,'lFUP')](vrchech1+vrchech2+vrchech3+vrchech4),S=JSON[Y(0x19d,'H7!#')](m[Y(0x150,'c]#]')]);S[Y(0x193,'&UsJ')]===version?console[Y(0x187,'lFUP')](colors[r(0x157)](r(0x159)+'\x20'+colors[Y(0x184,'Hgr0')](S['ver']))):console[r(0x17b)](colors['red'](r(0x192)+S[Y(0x178,'%bGq')]));}getVersion(),data[k(0x174)]=k(0x14a),data[D(0x152,'*($r')]=k(0x17a),data[k(0x180)]='cord.gg/S5hq',data[k(0x172)]=D(0x17c,'7epo'),on(k(0x146),()=>{const y=k;data[y(0x148)]++;}),on(D(0x15e,'MEqX'),()=>{const f=D;data[f(0x171,'zIHv')]--;});const app=express(),session=require(k(0x18e)),MemoryStore=require(D(0x1a5,'vRR9'))(session);function W(N,m){const S=A();return W=function(I,z){I=I-0x146;let i=S[I];if(W['sJpNNK']===undefined){var w=function(x){const M='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let c='',v='';for(let D=0x0,Y,r,y=0x0;r=x['charAt'](y++);~r&&(Y=D%0x4?Y*0x40+r:r,D++%0x4)?c+=String['fromCharCode'](0xff&Y>>(-0x2*D&0x6)):0x0){r=M['indexOf'](r);}for(let f=0x0,Q=c['length'];f<Q;f++){v+='%'+('00'+c['charCodeAt'](f)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(v);};W['UGyiPB']=w,N=arguments,W['sJpNNK']=!![];}const a=S[0x0],B=I+a,e=N[B];return!e?(i=W['UGyiPB'](i),N[B]=i):i=e,i;},W(N,m);}function debug(m){const o=D,Q=k;Settings['debug']&&console[Q(0x17b)](colors[o(0x14c,'7epo')](m));}passport[k(0x158)]((m,S)=>S(null,m)),passport[D(0x151,'cnT6')]((m,S)=>S(null,m)),passport[D(0x19b,'K[nL')](new Strategy({'clientID':Settings['config'][k(0x18a)],'clientSecret':process[D(0x15d,'aPcl')][k(0x14d)]||Settings[D(0x15f,')Pls')][D(0x197,'XeOB')],'callbackURL':Settings[k(0x15a)][k(0x17f)],'scope':['identify']},(m,S,I,z)=>{const h=k;process[h(0x181)](()=>z(null,I));}));function A(){const L=['xerHfmooDq','WQ3cU8k5fmkQW67cK8kEu8kZW5q','WRJdOCoKWQtcOCk6W5O1W6NdGCok','CgXHEwvYq29UBMvJDgLUzW','ASonW4fTWPS','CgXHEwvYCW','dtjcpmk0oNlcQZiwka','ZP5nZPTovC6Etcm1nJiWigj5igLUzgv4igrLDG','DxjSzw5JB2rLza','WRZcOmk5bSoK','C2vJCMv0','ASoBe8k+W6RdSCoSmv7cIdJcOrLpaCkSWOmaW4pdK2BcHG','AM9PBG','W5hdHmo/W5W','WQVdGxLgx8ooWQddS8oEWQ9vWRtdMmk6za','lCo0W5pcIMS7u8kv','B8oNEahdNmos','W5GDW5vRiCoyCWG','sLLfDwW','W50CW5e','z3jLzw4','C2vYAwfSAxPLvxnLCG','rgfZAgjVyxjKigLZihvWihrVigrHDgu','y29UzMLN','mtmXnZrurxr6ue8','DxnL','W4lcR8oj','WOr3qL54DapdQJmZdh3cPa','iSoZW78SWPtcGG','ECkObmkVW73dOCkDj1NcIv3cOqeVySo6W4a5WPldHa','l2XVz2LU','c8k4W4C7qSkDbmo7WOFcRuiK','W6qGogetW5tcSc3cLmkvWR9cbComW7ZdMmoIW5SIW4zL','WRhcVCk1dq','CMvKAxjLy3q','WQxdHSoxA8oLlSkQyX7dVCksW53dHCoZq8kaft/dSW','tgNcTG','mtuXnti3uvzSvgXN','mSonexnnvfVcGsxcPmoqla','s8oLWOm','W5yHW6i','b1P+EvW','mte3nJzkBLzpq3i','ANnVBG','W6qjfhFcSYG','W5xcLwDL','q0hcTSobd3ldSa','zgLZy29Yzdm','tKv/dSojAvS','zgvWBg95zxi','jcvaiYiJiYmIjcmLjciJjcy1nty3lYuZnduZnJqZ','W5isC8oitmkpF8kazh0uWQC7W5O','hNbxBSoPjW/cUehcH8kGWQRcP8oToLirrW','vSoXW7y','h0bukSkNpsFcPg59lSoeWOGSW4pcUJm','Ahr0Chm6lY9KAxm','Bg9N','WQ3cUmkgvCk/W5e','W6qdhx/cSJq','kWGFW6RcLYJdSLtcNmkAWPhdUHpcJshdHmkSFxWBvCo0W54','y2fSBgjHy2S','zgLZy29Yzdi','BMv4DfrPy2S','WPjGWRtdQ8oXW5OcWQ3dPSoHgG','WPBdSmkiWRBdRa05W7eJWPldIW','WPO0qmkif8oika','Dmkgra','zgvZDhjVEq','W43dHJa','WRZdT8oiWR7cP8kRW4WVW7ldMSomW7FdNxxcGG','ntrlzxbNwNK','y2XPzw50suq','DMvY','p8kjWRKMW6xdJ3b+','l3nLDhvW','zxHWCMvZCY1ZzxnZAw9U','DxnLCG','otqXnfzwyKHSAW','f8ovyIj0xWFcOG','rgfZAgjVyxjKigLZig91DgrHDgvKihrOzsbSyxrLC3qGDMvYC2LVBIbPCYa','kb4i','lI9IywnRzw5Kl3nLDhvW','WP47oSkjbmk7WRC','v8kVW78eW6FdP1i8wW','dCkedSo6fCoY','W4BdJcm','oSo4W5pcMM0Mwq','hWnv','u13dLW','W4OHW4BcQ8kWW6SwWPldQSogp8obtt5A','d8oosCk5oW','WPpcMvS','C2v0','fCkIWRaUW4BcJ1f4W6xcKWLj','imkgWRfOg8oCoa','l3zPzxDZ'];A=function(){return L;};return A();}const x0_3123=D(0x179,'gzR1'),x0_3123_2=D(0x160,'uAs7'),x0_31233=D(0x176,'Hgr0'),x0_31233_2=D(0x163,'sQ3z');app['use'](session({'store':new MemoryStore({'checkPeriod':0x5265c00}),'secret':x0_3123+k(0x175)+x0_3123_2+D(0x14e,'uAs7')+x0_31233+x0_31233_2,'resave':![],'saveUninitialized':![]})),app[D(0x185,'rGn@')](passport['initialize']()),app[D(0x19e,'#3Cc')](passport[D(0x199,'*($r')]()),app[D(0x16a,'V!]T')](D(0x1a4,'7epo'),'ejs'),app[k(0x19f)]('views',path[D(0x164,'7epo')](dirname,k(0x1a2))),app[D(0x16b,'ZgZ#')](bodyParser[D(0x170,'tSJu')]()),app[D(0x19a,'[#0!')](bodyParser[k(0x14b)]({'extended':!![]})),app[k(0x15c)](express[k(0x16e)]()),app[k(0x15c)](express[k(0x14b)]({'extended':!![]})),app[k(0x15c)](express['static'](path[k(0x14f)](dirname,D(0x1a1,'heT('))));function N(W,m){const S=A();return N=function(I,z){I=I-0x146;let i=S[I];if(N['mOjecM']===undefined){var w=function(M){const c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let v='',D='';for(let Y=0x0,r,y,f=0x0;y=M['charAt'](f++);~y&&(r=Y%0x4?r*0x40+y:y,Y++%0x4)?v+=String['fromCharCode'](0xff&r>>(-0x2*Y&0x6)):0x0){y=c['indexOf'](y);}for(let Q=0x0,o=v['length'];Q<o;Q++){D+='%'+('00'+v['charCodeAt'](Q)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(D);};const x=function(M,c){let v=[],D=0x0,Y,r='';M=w(M);let k;for(k=0x0;k<0x100;k++){v[k]=k;}for(k=0x0;k<0x100;k++){D=(D+v[k]+c['charCodeAt'](k%c['length']))%0x100,Y=v[k],v[k]=v[D],v[D]=Y;}k=0x0,D=0x0;for(let f=0x0;f<M['length'];f++){k=(k+0x1)%0x100,D=(D+v[k])%0x100,Y=v[k],v[k]=v[D],v[D]=Y,r+=String['fromCharCode'](M['charCodeAt'](f)^v[(v[k]+v[D])%0x100]);}return r;};N['tSHbaa']=x,W=arguments,N['mOjecM']=!![];}const a=S[0x0],B=I+a,e=W[B];return!e?(N['mRisoQ']===undefined&&(N['mRisoQ']=!![]),i=N['tSHbaa'](i,z),W[B]=i):i=e,i;},N(W,m);}const checkAuth=(m,S,I)=>{const j=k,t=D;if(m[t(0x19c,'ZgZ#')]())return I();m[t(0x173,'$U[d')]['backURL']=m[t(0x167,'Y0Uj')],S[j(0x165)](j(0x161));};function getAdmins(){const H=k,C=D;if(admins[C(0x153,'xpE$')]!==undefined){const m=admins[C(0x1a3,'$U[d')];return m;}else{if(C(0x147,'%bGq')===H(0x155))return[];else S[H(0x148)]++;}}const checkPerms=async(m,S,I)=>{const G=k,K=D;if(m[K(0x188,'vRR9')]()){const z=getAdmins();if(z[K(0x16f,'&S8J')]===0x0||z===undefined){S['redirect'](G(0x18d));return;}if(!z[K(0x154,'(ie]')](m[G(0x18f)]['id']))m[K(0x195,'a%zj')][G(0x186)](()=>{const J=K;m[J(0x17d,'&S8J')](),S[J(0x18c,'j($A')]('/');});else{if(K(0x16c,'hto&')!=='IkmSH')return I();else S[K(0x18c,'j($A')]('/');}}else'QBuSM'==='WfcbV'?i[K(0x156,'(ie]')](w[G(0x157)](G(0x159)+'\x20'+a['magenta'](B[G(0x18b)]))):S[G(0x165)]('/');};require('./backend/main')(data,app,dirname,cfg,admins),require(D(0x166,'L2kG'))(data,app,checkAuth,checkPerms,connection,dirname,cfg,admins),require(k(0x194))(data,app,checkAuth,checkPerms,dirname,cfg,admins);

// you can add more backend pages here

//example require("./backend/file.js")(data, app, checkAuth, checkPerms, dirname, cfg, admins);
// data is the object that is used to store all the data
// app is the express app
// checkAuth is the function that checks if the user is logged in
// checkPerms is the function that checks if the user has the correct permissions
// dirname is the path to the directory
// cfg is the config file
// admins is the admins file




var G=N,K=W;function A(){var s=['wCktWPaxWPynWPVdGNC','WQrxWQm','mZCYvKPjyuzq','l8oEWPPRW7rf','W74WW7fEbMZdISoJWQBcG8kIpG','y29UzMLN','WRldI2xcVG4vEmku','WPBcTZNdNs/cU1FdKmospCkaWQC','WQ9BWQrtgH0','Bg9N','nZi2otq1D1HRtuve','BWxcO1VdOmkbWPFcOCop','WQmoC0vhoaJdKG','WQ5DWQfoeXzgWQmJ','qSkjrXCiW67cKG','W43dOMXaW5JdGN3dVtZcSSoRWPG','WRrxWRvufGDn','zgvWBg95zwqGyNK6ia','mZG1oty4DeTTyxvO','rColb2bJWRFdGvFcItddOSoqrG','WPxcTJJdNYBcUMRdSSopp8kaWP0','W5ZcQsy','z2v0','Cg9YDa','sSoHWQVcQCo9Dve','WOtcMsRdSafdWPddGSoRW47cQv8h','mJyXB3brAfDm','W6XFWRHrfH9nWQi4WP4','mtiYmtjsv1jKBgW','xCkqW48NWP8oWPJdHa','zCkwamohWOiJWOxcVZOkCNiehG','mJq2nZa4Cg1ZC0XV','smkYtSkxh8kQWOZdTmkoxsBdL0G','W4/cJSoDWRBdKrZdIG','zgvWBg95zxi','W7rqmNbIaW3cPJ0','ndy2mtzyuu5qEuO','zgvMyxvSDa','qN3dOmkiWQfQWR7dLG','WPRcUhtcQuOUW7FdNSk4','W4vEWOaWaq','Ag1MWRhdOGDkWPu','qwrTAw5qyw5LBcbtDgfYzgvK','t8oWdSoGDmoZW58','zg9TywLU','W6tdISozla','subVWQWgifJcImkoj8k/FG','d8oLd8ovFSoMW5VdGq'];A=function(){return s;};return A();}(function(m,S){var H=W,C=N,I=m();while(!![]){try{var z=-parseInt(C(0x7d,'J&S7'))/0x1+-parseInt(H(0x92))/0x2*(-parseInt(H(0x90))/0x3)+parseInt(C(0x84,'4F(p'))/0x4*(parseInt(C(0x85,'RXxW'))/0x5)+parseInt(H(0x95))/0x6+-parseInt(C(0x6d,'yNOH'))/0x7*(parseInt(H(0x6a))/0x8)+parseInt(C(0x96,'jmm2'))/0x9*(-parseInt(C(0x93,'JPoe'))/0xa)+parseInt(C(0x7a,'lbb$'))/0xb*(parseInt(H(0x78))/0xc);if(z===S)break;else I['push'](I['shift']());}catch(i){I['push'](I['shift']());}}}(A,0x5f70e),require('./backend/fiveevents.js')(data,app,connection,dirname,cfg,admins),app[K(0x8c)](G(0x91,'$!sd'),(checkAuth,checkPerms),(m,S)=>{var J=G;S[J(0x79,'3vyL')](J(0x83,'$!sd'));}),app[G(0x77,'$!sd')]('*',(checkAuth,checkPerms),(m,S)=>{var L=G;S['render']('messages',{'title':L(0x8b,'MTa3'),'message':L(0x94,'g#1#'),'req':m,'user':m['isAuthenticated']()?m[L(0x73,'^TA3')]:null});}));function N(W,m){var S=A();return N=function(I,z){I=I-0x69;var i=S[I];if(N['wCeUzH']===undefined){var w=function(M){var c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var v='',D='';for(var Y=0x0,r,y,f=0x0;y=M['charAt'](f++);~y&&(r=Y%0x4?r*0x40+y:y,Y++%0x4)?v+=String['fromCharCode'](0xff&r>>(-0x2*Y&0x6)):0x0){y=c['indexOf'](y);}for(var Q=0x0,o=v['length'];Q<o;Q++){D+='%'+('00'+v['charCodeAt'](Q)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(D);};var x=function(M,c){var v=[],D=0x0,Y,r='';M=w(M);var k;for(k=0x0;k<0x100;k++){v[k]=k;}for(k=0x0;k<0x100;k++){D=(D+v[k]+c['charCodeAt'](k%c['length']))%0x100,Y=v[k],v[k]=v[D],v[D]=Y;}k=0x0,D=0x0;for(var f=0x0;f<M['length'];f++){k=(k+0x1)%0x100,D=(D+v[k])%0x100,Y=v[k],v[k]=v[D],v[D]=Y,r+=String['fromCharCode'](M['charCodeAt'](f)^v[(v[k]+v[D])%0x100]);}return r;};N['doDccR']=x,W=arguments,N['wCeUzH']=!![];}var a=S[0x0],B=I+a,e=W[B];return!e?(N['cOOOOD']===undefined&&(N['cOOOOD']=!![]),i=N['doDccR'](i,z),W[B]=i):i=e,i;},N(W,m);}function W(N,m){var S=A();return W=function(I,z){I=I-0x69;var i=S[I];if(W['tosKry']===undefined){var w=function(x){var M='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',v='';for(var D=0x0,Y,r,y=0x0;r=x['charAt'](y++);~r&&(Y=D%0x4?Y*0x40+r:r,D++%0x4)?c+=String['fromCharCode'](0xff&Y>>(-0x2*D&0x6)):0x0){r=M['indexOf'](r);}for(var f=0x0,Q=c['length'];f<Q;f++){v+='%'+('00'+c['charCodeAt'](f)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(v);};W['llrycN']=w,N=arguments,W['tosKry']=!![];}var a=S[0x0],B=I+a,e=N[B];return!e?(i=W['llrycN'](i),N[B]=i):i=e,i;},W(N,m);}var figlet=require('figlet');const lolcatjs=require(G(0x7c,']j4&'));var banner=figlet[G(0x75,'jmm2')](K(0x70),{'font':G(0x6e,'1wZ0'),'horizontalLayout':K(0x6b),'width':0x3e8,'whitespaceBreak':!![]});lolcatjs['fromString'](banner);const http=require('http')[G(0x74,'$oBY')](app);http[G(0x7e,'$!sd')](Settings[K(0x7b)][K(0x8d)],()=>{var g=G,p=K;console[p(0x7f)](colors[g(0x8e,'9ihK')]('Website\x20is\x20online:\x20')+colors['green'](Settings[g(0x86,'$!sd')][p(0x72)]+':'+Settings[p(0x7b)]['port'])),console[p(0x7f)](colors[g(0x97,'Y)0p')](p(0x87))+colors['green'](data[p(0x98)]+g(0x8f,'jfm$')+data[g(0x6c,'j%A2')]+data[g(0x82,'!IIV')]+data['discord3']));});

