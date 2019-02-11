React Apollo Starters
=================

[![Build Status](https://travis-ci.org/miloofcroton/react-apollo-starters.svg?branch=master)](https://travis-ci.org/miloofcroton/react-apollo-starters)

About
=================

Starters for a React and GraphQL stack utilizing Apollo on the front and back end.

Note: this project is no longer being maintained. See the new version here, where I commit to Material Design: https://github.com/miloofcroton/react-apollo-starters

Table of contents
=================

<!--ts-->
  - [About](#About)
  - [Table of contents](#Table-of-contents)
  - [Operations](#Operations)
    - [Selecting your version](#Selecting-your-version)
    - [Project setup](#Project-setup)
    - [Deployment](#Deployment)
  - [Philosophy](#Philosophy)
    - [Tech](#Tech)
    - [Full slices](#Full-slices)
    - [Notes](#Notes)
  - [Issues](#Issues)
  - [Goals](#Goals)
<!--te-->

## Operations

### Selecting your version

This project is intended to have a few different options for server and client technologies that should all be interoperable. The only one I won't be updating (for the time being, at least) is the Webpack version of the client. It's just not worth my time to optimize Webpack/Babel at the moment. However, it was the original client target that I had, so it should mostly work.

Anyways, the React client based on CRA (create-react-app) is tested to work, and all the database options are tested to work. After cloning or downloading the repo, pick your combo and delete the others in the file directory (or ignore them). Rename your primary client and server as simply `client` and `server` for the monorepo CI/CD scripts to work (which I still have to test, but I used the same setup on another project).

On the short-term roadmap is Neo4j, but I probably won't create more database options after that, except perhaps with a Prisma integration to my existing options.

### Project setup

These instructions assume you chose CRA React and MongoDB, but there should be minimal differences for other options.

- Make sure MongoDB is running. This project assumes you've set it up as a native daemon to your OS or otherwise have it running on port 27017. If you know what port your MongoDB is on, you should be smart enough to change this port in the `.env`.
- fill out *.env file in `/server/` (see `.env.example`)
- Run `npm install` in `/server` and `/client` to install packages.
- Run `npm run start:watch` in `/server` and `/client` to get going with hot reloading.
- Visit `http://localhost:7890/graphql` for GraphQL playground
- Visit `http://localhost:3000` for React dev server
- Run `npm run test:watch` in both of these places to get tests running (in watch mode too)

### Deployment

Options:

1. Use the scripts in the root package.json and use this as a monorepo.
2. Use the client and server in separate repos, deploy separately.

I will fill this out more in the near future. It should be a near turnkey CI/CD solution.

## Philosophy

### support

platforms

|react|react native|
|---|---|
|✔||

build tools

|CRA|Webpack|
|---|---|
|✔|✔|

databases

|mongo|postgres|neo4j|
|---|---|---|
|✔|✔| |

### Tech

- Languages:
  - Javascript: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - CSS:
    - [w3schools](https://www.w3schools.com/css/)
    - [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
    - [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Server:
  - [Node](https://nodejs.org/api/)
  - [Express](https://expressjs.com/en/4x/api.html)
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- Data
  - Mongo version:
    - DB: [MongoDB](https://docs.mongodb.com/)
      - Visualization softare: [Robo3t](https://robomongo.org/)
    - ORM: [Mongoose](https://mongoosejs.com/docs/)
  - Postgres version:
    - DB: [PostgresSQL](https://www.postgresql.org/docs/)
      - inspecting via CLI:
        - `sudo -u postgres i`
        - `psql <database_name>` (then use the password for the `postgres` user)
    - ORM: [Sequelize](http://docs.sequelizejs.com/)
  - API design:
    - [GraphQL](https://graphql.org/learn/)
    - Code-First philosophy
      - https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3
    - Modular philosophy
  - Client:
    - [Apollo Client](https://www.apollographql.com/docs/react/)
      - Store: [Apollo Cache](https://www.apollographql.com/docs/react/advanced/caching.html)
      - Reactivity: [Subscriptions](https://www.apollographql.com/docs/react/advanced/subscriptions.html)
      - [cursor-based Pagination](https://www.apollographql.com/docs/react/features/pagination.html)
      - [Fragments](https://www.apollographql.com/docs/react/advanced/fragments.html)
      - [Normalization](https://www.apollographql.com/docs/react/advanced/caching.html#normalization)
      - [SSR](https://www.apollographql.com/docs/react/features/server-side-rendering.html)
      - [Dev Tools](https://www.apollographql.com/docs/react/features/developer-tooling.html)
    - [Axios](https://github.com/axios/axios)
- Views
  - Components: [React](https://reactjs.org/docs/getting-started.html)
  - CSS in JS: Styled-components
    - add `vscode-styled-components` in VS Code to get syntax highlighting
    - https://alligator.io/react/styled-components/
    - https://www.styled-components.com/docs/basics#getting-started
    - https://medium.com/styled-components/css-prop-support-for-create-react-app-37e8c5d96861
  - Routing: [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
  - Head: [React Helmet](https://github.com/nfl/react-helmet)
- Authentication/Authorization
  - powered by JWT and local storage
  - protected endpoint (e.g. verify valid session)
  - protected resolvers (e.g. e.g. session-based, role-based)
  - protected routes (e.g. session-based, role-based)
  - https://levelup.gitconnected.com/protecting-your-react-graphql-application-with-jwt-authentication-3c03db9530cb
  - https://blog.pusher.com/handling-authentication-in-graphql-jwt/
  - https://en.wikipedia.org/wiki/Bcrypt
- Testing:
  - [Jest](https://jestjs.io/docs/en/getting-started)
  - [Enzyme](https://airbnb.io/enzyme/)
  - [Chance](http://chancejs.com/index.html)
- Build Tools
  - [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
    - snippet for customization:
      ```
      "scripts": {
        "start": "REACT_APP_S3ENV=development REACT_APP_BUILDDATE=$(date '+%m-%d-%y, %H:%M') PORT=3001 NODE_PATH=./src react-scripts start",
        "build": "REACT_APP_BUILDDATE=$(date '+%m-%d-%y, %H:%M') NODE_PATH=./src react-scripts build"
      }
      ```
      - access the env variables in your code like `process.env.REACT_APP_BUILDDATE`
      - `NODE_PATH=./src` helps to get absolute pathing on your imports
  - [Webpack](https://webpack.js.org/guides/getting-started/)
  - [Babel](https://babeljs.io/docs/en/)
- Dev Tools
  - Linting: [ESLint](https://eslint.org/docs/user-guide/getting-started)
  - Formatting: [Prettier](https://prettier.io/docs/en/install.html)
  - Editor settings: [editorconfig](https://editorconfig.org/)
- Typing
  - [prop-types](https://www.npmjs.com/package/prop-types)
- Deployment:
  - [Heroku](https://devcenter.heroku.com/categories/nodejs-support)
    - https://blog.heroku.com/deploying-react-with-zero-configuration
- CI/CD:
  - [Travis CI](https://docs.travis-ci.com/user/deployment/heroku/)

### Full slices

- back end:
  - a folder in /server/src/resources with the following:
    - `REQUIRED`: `model.js`
    - `REQUIRED`: `queries.js`
    - `OPTIONAL`: `mutations.js`
    - `OPTIONAL`: `subscriptions.js`
    - `OPTIONAL`: `loaders.js`
    - `OPTIONAL`: `methods.js`
    - `OPTIONAL`: `/tests` - It's good practice to test your code but technically not required to get it to work or test something out.
      - `model.test.js`
      - `schema.test.js`
      - `resolvers.test.js`
      - `api.test.js`
      - `OPTIONAL`: `fixtures.js` or `helpers.js` to help with testing
  - `REQUIRED`: Update `/server/resources/index.js` with the new files from previous step
  - `OPTIONAL`: files in `/server/src/scripts` under to seed the database
- front end:
  - a folder in `/client/src/data/resources` with the following:
    - `REQUIRED`: `queries.js`
    - `OPTIONAL`: `mutations.js`
    - `OPTIONAL`: `subscriptions.js`
    - `OPTIONAL`: `fixtures.js`
    - `OPTIONAL`: `objects.js` or `methods.js` ?? (not sure yet if either is needed)
  - a folder at /client/src/views/content/`<resource name>` with the following inside:
    - `REQUIRED`: `app.js`
    - `REQUIRED`: `routes.js`
    - `OPTIONAL`: `styles.js`
    - `OPTIONAL`: `/components` with any necessary additional components
  - update `ROUTES` in /client/views/layout/router/routes.js with new routes
    - note: nav, order, and true are optional and add a link to the default header

### Notes

- Any tests are placed in `tests` for the folder of the file that you are testing (this keeps directories clean)
- when semantically useful, using the ES6 feature of implicitly importing index.js from any folder that is itself imported. In other words, `import App from 'components/App'` is equivalent to `import App from 'components/App/index.js'`
  - https://alligator.io/react/index-js-public-interfaces/

## Issues

Any known issues will be listed here.

  - fix the read/write to the apollo cache on a mutation
  - memory leak error:
    ```
    index.js:1446 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in SignInForm (at SignIn.js:21)
    in div (at SignIn.js:19)
    in SignInPage (created by Route)
    in Route (created by withRouter(SignInPage))
    in withRouter(SignInPage) (at switches/index.js:21)
    in component (created by Route)
    ```
  - when testing, sometimes you need to clear the site data under Chrome Dev Tools > Application to get data from the server to load

