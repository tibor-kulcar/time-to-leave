# Time to leave

Some of us struggle to catch public transportation on time :)

This react-native application is simple help to see how much time you have to chatch your bus/tram.

Now it works only with Prague-based data.

To run it on your computer, you need to:
- generate you own authorization token at [api.golemio.cz/api-key](https://api.golemio.cz/api-keys)
- create `.env` file from `.env.template` and put yout auth token there as `REACT_APP_API_KEY` value
- install all dependencies by running `npm ci`

Now you should be able to run the app locally using

`npm run web` to run it as website

`npm run ios` to run it on ios simulator

`npm run android` to run it as android device

or you can `npm start` to run basic `expo start` command with interactive cli navigation.