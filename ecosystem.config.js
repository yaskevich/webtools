module.exports = {
  apps : [
      {
        name: "webtools",
        script: "./index.js",
        watch: false,
        instance_var: 'INSTANCE_ID',
        env: {
            "PORT": 7711,
            "NODE_ENV": "production"
        }
      }
  ]
}