const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Get riddle processed a request.');
    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tablename;
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);
    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    // TODO - add user system. For now, everyone is user RiddleLocker
    let user = "RiddleLocker"
    let lockerName = context.bindingData.query.locker;
    context.log(lockerName);
    let isError = false;

    let isValid = validateData(lockerName)

    if (isValid) {
        let result = await client.getEntity(user, lockerName)
        .catch((error) => {
            context.log("Error retrieving locker " + lockerName)
            context.log(error)
            isError = true
            context.res = {
                body : {
                    error : error.details.odataError.code
                },
                status: error.statusCode
            };
        });
        if (!isError) {
            context.log("Success retrieving locker")
            context.log(result);

        context.res = {
            // status: 200
            body: {
                Riddle : result.Riddle
            }
        };
        }
    }
    else {
        context.log("Invalid Data");
        context.log(lockerName);
        context.res = {
            body: {
                error :  "InvalidData"
            },
            status: 422
        };
    }
    

    function validateData(lockerName) {
        // locker name and username can not contain spaces
        if (lockerName.includes(' ')) {
            return false;
        }
        // each field must have a length greater than 0
        else if (lockerName.length < 1) {
            return false;
        }
        return true
    }
}