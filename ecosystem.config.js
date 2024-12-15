module.exports = {
  apps: [
    {
      name: "cms-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
