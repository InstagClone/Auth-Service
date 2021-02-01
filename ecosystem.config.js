module.exports = {
  apps : [{
    name: "Auth Server",
    script: 'dist/index.js',
    exec_mode: 'cluster',
    instances: 2,
    watch: true,
  }]
};
