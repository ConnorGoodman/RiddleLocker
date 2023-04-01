const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Add riddle processed a request.');

    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tableName;
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);

    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    const _username = context.bindingData.query.user;
    const _lockerName = context.bindingData.query.lockername;
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
    context.log(data);
    let result = await client.createEntity(data)
    .catch((error) => {
        // handle any errors
        context.log("Error: " + error)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                error
            }
        };
    });
    context.log(result);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            "url" :  process.env.baseurl
        }
    };
}