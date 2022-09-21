//const {Connection, Request} = require("tedious");

module.exports = async function (context, req, getlist) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    //Calls getlist binding function from function.json file
    context.res = {
        body: getlist
    }

    //
    //The Long Approach
    //

    // let list = [];
    // const config = {
    //     authentication: {
    //         options: {
    //             userName: "arrowhost",
    //             password: "Arrowpass921"
    //         },
    //         type: "default"
    //     },
    //     server: "arrow-game-svr.database.windows.net",
    //     options: {
    //         database: "ArrowgameLeaderboard",
    //         encrypt: true,
    //         trustServerCertificate: true
    //     }
    // }

    // const connection = new Connection(config);

    // connection.on("connect", async err => {
    //     if (err) {
    //         console.error(err.message);
    //     }else {
    //         // attemptToLogin();
    //         await showLeaderboard();

    //         //console.log(UserInfo);
    //         //connection.close();
    //     }
    // });
    // connection.connect();
    // function showLeaderboard() {
    //     const request = new Request('SELECT * FROM [dbo].[User_Info]', () => {
    //         context.res = {
    //             // status: 200, /* Defaults to 200 */
    //             body: list,
    //         }; 
    //         console.log(list); 
    //     });
    //     list = [];
    //     request.on("row", columns => {
    //         data = {};
    //         columns.forEach((column) => {
    //             data[column.metadata.colName] = column.value;
    //         });
    //         list.push(data);
    //         //console.log(Object.keys(UserInfo).length);
    //         //request.on('error',error=>reject(error));// some error happened, reject the promise
    //         //request.on('done',()=>resolve(result)); // resolve the promise with the result rows.
    //     });

    //     connection.execSql(request);
    // }
}