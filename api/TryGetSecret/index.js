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
    const _answer =  context.bindingData.query.answer;
    let isError = false;

    let result = await client.getEntity(user, context.bindingData.query.locker)
    .catch((error) => {
        isError = true
        context.res = {
            body : {
                error : error.details.odataError.code
            },
            status: error.statusCode
        };
    });
    if (!isError) {
        context.log(result);

        // check if the secret is correct
        context.log(result.Answer)
        context.log(_answer)
        context.log(result.Secret)
        if (result.Answer.toLowerCase() == _answer.toLowerCase()) {
            context.res = {
                body: {
                    isCorrect : true,
                    Secret : result.Secret
                }
            };
        }
        else {
            context.res = {
                body: {
                    isCorrect : false
                }
            };
        }
        
    }
}