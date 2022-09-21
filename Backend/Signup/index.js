module.exports = async function (context, req, findAccount) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let accountmade = false;
    let data = findAccount;

    //makes account if username doesnt exist
    if(data.length == 0){
        let account = {
            "Username":req.body.Username,
            "Userpass":req.body.Password,
            "HighestScore":req.body.HighestScore
        }
        context.bindings.makeAccount = account;
        accountmade =  true;
    }

    //Returns True or False for Frontend Function
    context.res = {
        body: accountmade,
    }
}