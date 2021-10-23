module.exports = [
  {
    name: "development",
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "url-shortener",
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
    type: "mongodb",
    database: "url-shortener-test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entities/**/*.ts"],
  }
];
