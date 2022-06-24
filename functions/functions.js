var admins = [];
const log = (description, event, connection) => {

    /**
    *
    * @param {string} description - Description of the event
    * @param {string} event - Event that was triggered
    * @param {object} connection - Connection object
    *  
    * */

    var colors = require('colors/safe');
    // get local time
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // get local date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const date2 = day + "/" + month + "/" + year;

    connection.query("INSERT INTO adminpanel_logs (description, event, date, time) VALUES ('" + description + "', '" + event + "', '" + date2 + "', '" + time + "')", (err, rows, fields) => {
        if (err) throw err;
        const logdate = colors.blue(`[${date}] `);
        const log = colors.cyan(` ${description}   :::   ${event}`)

        console.log(colors.magenta('[PANEL_LOGS] ') + logdate + log);
    }
    );
}

module.exports = {log}
