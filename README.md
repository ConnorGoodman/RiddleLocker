# Riddle Locker!

Riddle Locker is a side project I'm working on! It lets users lock text behind "Riddles"

Riddles are prompts other users must solve to gain access to the locked text. Head over to [here](https://www.riddlelocker.com) to try it out!

I built this using Azure Static Web apps. It has a React frontend and an Azure Function backend. Data is stored in Azure Table Storage.

Thanks for trying it out!

## Installation

### Prerequisites
* Node JS
* Visual Studio Code (Optional)
* Azure Static Web Apps Extension for Visual Studio Code (Optional)

### Steps
1. Clone the Riddle Locker repository. `git clone https://github.com/ConnorGoodman/RiddleLock.git`
2. Open the Riddle Lock folder in your code editor.
3. Run `npm install -g @azure/static-web-apps-cli` in the terminal.
4. Run `npm install`
5. Run `npm run build`
6. Update secrets. TODO - More detailed instructions on secrets.
7. Finally, to emulate Azure Static Web Apps locally, run `swa start build --api-location api`. The first time this is ran, Function Core Tools will be automatically installed.
8. Configure app secrets. In the api folder, create a file called `local.settings.json`. Then, fill in the secrets. Here is an exanple:
`{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "accountkey": "",
        "accountname": "",
        "baseurl":"http://localhost:4280/",
        "tablename":""
    }
}`

### Troubleshooting
* If there is an error that looks like `swa cannot be loaded because running 
scripts is disabled on this system.`, open up PowerShell as an administrator and run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted`
* If there is an error saying that the version of Windows in incompatible, download Azure Functions Core Tools here: https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cportal%2Cbash&pivots=programming-language-csharp

### Resources
https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=react \
https://learn.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=react
