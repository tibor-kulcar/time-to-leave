# <img src="https://github.com/tibor-kulcar/time-to-leave/blob/main/public/icons/icon.svg" style="width: 2.8rem; float: left; margin-right: .5rem" /> Time to leave

Some of us struggle to catch public transportation on time :)

This application is simple help to see how much time you have to catch your bus/tram.

Now it works only with Prague-based data.

To run it on your computer, you need to:

- generate you own authorization token at [api.golemio.cz/api-key](https://api.golemio.cz/api-keys)
- create `.env.local` file from `.env.template` and put your auth token there as `API_KEY` value
- install all dependencies by running `npm ci`

Now you should be able to run the app locally using

`npm run dev`

To see app in production build run

`npm run build && npm start`
