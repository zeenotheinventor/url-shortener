# Atomizer! The Atomic URL Shortener

Welcome to Atomizer! For running applications individually see respective `README.md` files in `./api` and `./client`.

## Available Scripts

### `docker compose up`

This will set up all containers to run the client, api and database. They will be accessible via the following URLs

- Client: Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- API: Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to access it.
- Database: Available at [http://localhost:27017](http://localhost:27017).

## Improvements and Footnotes

This section details changes that would've been done if this were a fully fledged Production application. These improvements were not implemented in interest of conserving the time and scope for this project however I'd like to highlight a number of additions that I would've made.

- `UrlList.tsx` contains table rendering that could be split into a generic Component. would have been split into a generic `Table` or `List` component that handled all the rendering logic for a parameterized number of columns and rows. This would enable a generic styled Table for the entire application.

- The API return type `Url` in hardcoded as an interface in the front end. In a live application, this would better be generated using the apollo-client via a schema generated by the back end.

- General changes to design and UX. The platform could look prettier :-)