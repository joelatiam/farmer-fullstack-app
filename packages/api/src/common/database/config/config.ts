export const config = {
  development: {
      logging: true,
      dialect: "postgres",
      use_env_variable: "DATABASE_URL",
    },
    production: {
      logging: false,
      dialect: "postgres",
      use_env_variable: "DATABASE_URL",
    }
};
