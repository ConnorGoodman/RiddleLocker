const { v4: uuidv4 } = require('uuid');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Get riddle processed a request.');
    const  accountkey =  process.env.accountkey;
    const  accountname = process.env.accountname;
    const  tablename = process.env.tablename;
    const  credential = new  AzureNamedKeyCredential(accountname, accountkey);
    const  client = new  TableClient(`https://${accountname}.table.core.windows.net`, tablename, credential);

    let user = "RiddleLocker"
    
    context.log(context.bindingData.query.locker);
    let isError = false;

    let result = await client.getEntity(user, context.bindingData.query.locker)
    .catch((error) => {
        isError = true
        context.res = {
            // status: 200, /* Defaults to 200 */
            body : {
                error : error.details.odataError.code
            },
            status: error.statusCode
        };
    });
    if (!isError) {
        context.log(result);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            Riddle : result.Riddle
        }
    };
    }
}