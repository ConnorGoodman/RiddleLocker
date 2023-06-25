# Riddle Locker!

Riddle Locker is a side project I'm working on! It lets users lock text behind "Riddles"

Riddles are prompts other users must solve to gain access to the locked text. Head over to [here](http://riddlelocker.com) to try it out!

I built this using Azure Static Web apps. It has a React frontend and an Azure Function backend. Data is stored in Azure Table Storage.

Thanks for trying it out!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
7. Finally, to emulate Azure Static Web Apps locally, run `swa start build --api-location api`

### Resources
https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=react
https://learn.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=react
