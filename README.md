# # Time to leave

Some of us struggle to catch public transportation on time :)

This react-native application is simple help to see how much time you have to chatch your bus/tram.

Now it works only with Prague-based data.

To run it on your computer, you need to:

- generate you own authorization token at [api.golemio.cz/api-key](https://api.golemio.cz/api-keys)
- create `.env.local` file from `.env.template` and put yout auth token there as `API_KEY` value
- install all dependencies by running `npm ci`

Now you should be able to run the app locally using

`npm run dev`

To see app in producition build run

`npm run build && npm start`
