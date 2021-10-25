# Atomizer URL Shortener API

## Quick Start

Simply running `docker compose up` in the parent directory (`../`). This will run the application in a pre-configured container at [http://localhost:4000/graphql](http://localhost:4000/graphql).

You can then run tests via `yarn install && yarn start`.

Keep reading if you would like to configure and run the application manually.

## Pre-requisites

You need to have the following installed.

- yarn
- mongodb running on port `27017`
- A free port on port `4000`

Add the following environment variables to your machine.

```
SHORTENER_DOMAIN=https://pbid.io
DB_HOST=localhost
```

## How to Run Manually

### `yarn start`

Begins the application. It will be accessible via [http://localhost:4000/graphql](http://localhost:4000/graphql)

### `yarn test`

Launches all tests
