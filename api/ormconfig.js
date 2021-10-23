module.exports = [
  {
    name: "development",
    type: "sqlite",
    database: "database.dev.url-shortener",
    synchronize: true,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  },
  {
    name: "test",
    type: "sqlite",
    database: "database.test.url-shortener",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entities/**/*.ts"],
  },
  {
    name: "production",
    type: "mongo",
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/entities",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber"
    }
  }
];
