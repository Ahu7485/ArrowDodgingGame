const {Connection, Request} = require("tedious");
var TYPES = require("tedious").TYPES;

module.exports = async function (context, req, getinfo) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //context.bindings.update = req.body;
    let data = getinfo;

    // if(data.length != 0 && req.body.Password == data[0]["Userpass"]){
        
    //     //
    //     //The Long Approach
    //     //

    //     const score = req.body.HighestScore;
    //     const username = req.body.Username;
    //     console.log(score);
    //     console.log(username);
    //     const request = new Request('UPDATE [dbo].[User_Info] SET HighestScore=@score WHERE Username=@username', () => {});
    //     request.addParameter('Username', TYPES.Varchar, username);
    //     request.addParameter('HighestScore', TYPES.Int, score);

    //     // let list = [];
    //     const config = {
    //         authentication: {
    //             options: {
    //                 userName: "arrowhost",
    //                 password: "Arrowpass921"
    //             },
    //             type: "default"
    //         },
    //         server: "arrow-game-svr.database.windows.net",
    //         options: {
    //             database: "ArrowgameLeaderboard",
    //             encrypt: true,
    //             trustServerCertificate: true
    //         }
    //     }

    //     const connection = new Connection(config);

    //     connection.on("connect", async err => {
    //         if (err) {
    //             console.error(err.message);
    //         }else {
    //             await update();
    //         }
    //         connection.connect();
    // });
    // async function update() {
    //     var complete = false;
    //     await connection.execSql(request);
    //     while(!complete){
            
    //     }
    //}
    //}
    context.res = {
        body: (data.length != 0 && req.body.Password == data[0]["Userpass"])
    }
}