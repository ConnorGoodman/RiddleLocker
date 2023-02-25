const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tableName;
    context.log("key: " + accountkey);
    context.log("name: " + accountname);
    context.log("tablename: " + tablename);
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);
    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    let result = await client.getEntity(context.bindingData.query.user, context.bindingData.query.riddle)
    .catch((error) => {
        // handle any errors
    });
    context.log(result);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            "Riddle" : result.Riddle
        }
    };
}