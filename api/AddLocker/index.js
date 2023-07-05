const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

// Adds a locker to the database
// Requires a username, locker name, riddle,
// answer, and secret.
module.exports = async function (context, req) {
    context.log('Add riddle processed a request.');

    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tablename;
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);

    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    const _username = context.bindingData.query.user;
    const _lockerName = context.bindingData.query.lockername.toLowerCase();
    const _riddle = context.bindingData.query.riddle;
    const _answer =  context.bindingData.query.answer;
    const _secret =  context.bindingData.query.secret;

    const data = {
        PartitionKey : _username,
        RowKey : _lockerName,
        Riddle: _riddle,
        Answer: _answer,
        Secret: _secret
    }

    let isValid = validateData(data)

    if (isValid) {
        context.log("Data is valid");
        context.log(data);
        let isError = false;
        let result = await client.createEntity(data)
        .catch((error) => {
            // handle any errors
            isError = true
            context.log("Error: " + error)

            context.res = {
                body : {
                    error : error.details.odataError.code
                },
                status: error.statusCode
            };
        });
        if (!isError) {
            context.log("Locker successfully added");
            context.res = {
                body: {
                    "url" :  process.env.baseurl + "viewriddle?locker=" + _lockerName
                }
            };
        }
        context.log(result);
    }
    else {
        context.log("Invalid Data");
        context.log(data);
        context.res = {
            body: {
                error :  "InvalidData"
            },
            status: 422
        };
    }

}

function isValidQueryParameter(str) {
    if (!str) {
      return false;
    }
  
    const forbiddenChars = ['&', '=', '?', '#'];
    if (forbiddenChars.some(char => str.includes(char))) {
      return false;
    }
  
    const firstChar = str.charAt(0);
    if (!/[a-zA-Z_]/.test(firstChar)) {
      return false;
    }
  
    const allowedChars = /[a-zA-Z0-9\-_.~]/;
    for (let i = 1; i < str.length; i++) {
      if (!allowedChars.test(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

function validateData(data) {
    // locker name and username can not contain spaces
    if (data.RowKey.includes(' ') || data.PartitionKey.includes(' ')) {
        return false;
    }
    // each field must have a length greater than 0
    else if (data.RowKey.length == 0 || data.Answer.length == 0 || data.PartitionKey.length == 0 || data.Riddle.length == 0 ||  data.Answer.length == 0 ||  data.Answer.secret == 0) {
        return false;
    }
    // locker name must have length less than 21
    else if (data.RowKey.length > 30) {
        return false;
    }
    return true;
}