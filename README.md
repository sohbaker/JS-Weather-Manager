# JS-Weather-Manager

Completed project can be viewed at https://weather-manager.herokuapp.com/

## Task

This project was to connect to the OpenWeatherMap API and retrieve data about the current weather conditions for a particular city, as well as the overall forecast for the next 5 days.

Core Goals

- [x] Get London's weather to display on a website using the Open Weather Map API
- [x] Show London's 5 day forecast on the page
- [x] Abstract away API call logic into it's own class
- [x] Stub out API calls in tests ([Jest](https://jestjs.io/docs/en/tutorial-async) will help you here)
- [x] Deploy to Heroku

Stretch Goals

- Select a city from a list, and display the weather for it
- Have a user type in a city, and display the weather for it
- [x] Make it look pretty

## Screenshot

<img width="1597" alt="screenshot 2019-02-13 at 10 32 09" src="https://user-images.githubusercontent.com/18250108/52706080-6c3e8e80-2f7c-11e9-8d41-b4c902631145.png">

## Language

This application is written in Javascript ES6 (Vanilla) and uses Node.js.

## To get started

1. Clone this repository to your local machine as explained [here](https://help.github.com/articles/cloning-a-repository/)
2. Install NPM packages needed to run the files by typing `$ npm install` in terminal ([Documentation](https://docs.npmjs.com/cli/install))
3. Visit [Open Weather Map](https://openweathermap.org/api) annd click "Sign Up" at the top of the page to create your own subscription and generate an API Key.
4. Create a `.env` file locally and store your API key here, i.e `API_KEY=placeKeyHere`. Make sure to check that .env is listed in your `.gitignore` file so that your key doesn't get pushed to GitHub.  
   _This key is what gets plugged in to_`process.env.API_KEY` \_in api_request.js\_\_
5. In a separate terminal window, use Webpack to watch your files whilst you work on them with `$ npm run watch`. This will build each time you make a change and note any issues in red.
6. Once built, you can open a browser window showing the app with `$ open dist/index.html`. Make sure to do this in a different terminal window to your npm run watch.
7. Each time you make a change, you'll need to refresh the browser window to view it. You won't need to do anything else in the terminal. Once you're happy with the changes, push to GitHub as usual.

## Testing

Run your tests using the command `$ npm run test`  
Tests are run in [JEST](https://www.npmjs.com/package/jest) and are found in the `__tests__/` folder.

## Linting

Lint is a style guide for how to neatly display JavaScript code. You can lint your code with `$ npm run lint`  
This setup uses [AirBnB's defaults](https://github.com/airbnb/javascript). Feel free to change to another lint default by amending the `.eslintrc.js` file

## Browser

The app entry point is [`dist/index.html`](dist/index.html). Here you can write HTML directly.  
The JavaScript entry point is [`src/index.js`](src/index.js). Here you can tell your app what to do and how to change.  
The _actual_ JavaScript that the browser reads is automatically generated, and is in `dist/main.js`. Don't make changes to this directly, you can just change the JavaScript in your `src/` folder!
