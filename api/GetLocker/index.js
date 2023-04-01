const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Get riddle processed a request.');
    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tableName;
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);
    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    context.log(context.bindingData.query.user);
    context.log(context.bindingData.query.locker);
    let result = await client.getEntity(context.bindingData.query.user, context.bindingData.query.locker)
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