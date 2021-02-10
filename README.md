# Drink shop e-commerce website

This mono repo is merged from the previously separated repositories
[front](https://github.com/alvyjudy/bbt-shop-frontend),
[back](https://github.com/alvyjudy/bbt-shop-backend),
[file server](https://github.com/alvyjudy/bbt-shop-media)

This is one of those practice projects to hone my web development skills
[demo](https://alvy-drink-shop.herokuapp.com/)

## Architecture

### Techstack

This project utilizes a custom webpack set up instead of
create react app (in order to familiarize myself better with the broad frontend ecosystem). It makes extensive use of SASS to accomplish responsive design
(intentionally avoided UI framework to get a better sense of fundamental
CSS). I also used a low level PostgreSQL driver instead of ORM to learn SQL
the harder way.

UI is designed with React and SCSS (coupled with autoprefixer and css module).
Data is stored in PostgreSQL and the backend is running on Express. Deployment
is done on Heroku, which provisions its own PostgreSQL. Assets & images are
stored in backend code base as of now, but with routes set up that could be
reconfigured for other static file server. The frontend has also integrated
redux. Despite the trend to move away from it, I still felt the need to
at least know how to use it.

### Development & deployment

The project is set up with yarn workspaces. There are three `package.json` files.

```
drink-shop/
  package.json
  client/
    package.json
  server/
    package.json
```

The top level `package.json` specifies the command for deployment, and the
remaining two exposes the commands for development commands.

When developing locally, the scripts set the `NODE_ENV` to `development`. The
following files utilize this flag:

- `server/src/db.js`: set the database connection string based on mode
- `server/index.js`: decide which port to use based on mode
- `client/webpack.config.js`

To start, run `yarn install` in the top level folder. This will install all
the dependencies, managed via yarn workspaces. The following should be run
from the top level folder as well.

To spin up the frontend development server, run
`yarn workspace client run start`. The webpack dev server will start generating a bundle file with the entry point set to `client/src/index.js` and serve
content from
`server/dist/index.html`. To build the front end bundle, run `yarn run build` and webpack will save the generated bundle (`main.js`) inside `server/dist/`

To spin up the backend development server, run
`yarn workspace server run startLocal`. This will invoke the
`server/index.js` with `nodemon`, which watches for file changes and restart the server. Upon starting the server,
it connects to a local PostgreSQL server and reset its content and then
create the necessary relations. The credential is set inside `server/db.js`.
To deploy, run `yarn run start`. The remote database has to be manually set
by running `yarn workspace server run initRemoteDb`.

### Codebase design

The backend is in charge of server all contents, including images and client
side javascript. Its express server instance mounts three middlewares. All
requests starting with `/assets` will be served from `/server/assets/`. All
requests starting with `/api` will be served from the router defined inside
`server/src/api.js` and the remaining (i.e. `main.js` and `index.html`,) will be served from `server/dist`.
