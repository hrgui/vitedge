# Usage

Once Vitedge is installed, you can use its CLI for develoing and building. See a full example project [here](https://github.com/frandiox/vitedge/tree/master/examples/vue).

## Development

There are 2 ways to run the app locally for development:

- SPA mode: `vitedge dev` command runs Vite directly without any SSR.
- SSR mode: `vitedge dev --ssr` command spins up a local SSR server.

SPA mode will be somewhat faster but the SSR one will have closer behavior to a production environment.

You can pass any Vite's CLI option to this command. E.g. `vitedge dev --open --port 1337`.

## Production

Once the app is ready, run `vitedge build` to create 3 different builds:

- SPA build in `dist/client`.
- SSR build in `dist/ssr`
- API build in `dist/functions`

### Deploying to a Node.js environment

Any Node.js environment, such as a full server or a serverless function (Netlify, Vercel, GCP, AWS...) just need to import the built files and use them. You can find a simple Express.js example [here](https://github.com/frandiox/vitedge/tree/master/examples/node-server/index.js).

### Deploying to Cloudflare Workers

Import Vitedge's webpack configuration in your worker's webpack config file:

```js
module.exports = {
  // Add your own config here if you need
  ...require('vitedge/webpack.cjs')(options),
}
```

It will figure out the project root if this is under a Vite project directory. If it's not, then pass { root: '/path/to/project' }` as the options.

Then, simply import `handleEvent` in your worker entry point:

```js
import { handleEvent } from 'vitedge/worker'

addEventListener('fetch', (event) => {
  try {
    event.respondWith(
      handleEvent(event, {
        http2ServerPush: {
          destinations: ['style'],
        },
        willRequestApi({ url, query }) {
          console.log('API:', url.pathname, query)
        },
      })
    )
  } catch (error) {
    event.respondWith(
      new Response(error.message || error.toString(), {
        status: 500,
      })
    )
  }
})
```

See a full example [here](https://github.com/frandiox/vitedge/tree/master/examples/worker-site/index.js).
