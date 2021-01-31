module.exports = {
  apps : [{
    name: "Auth Server",
    script: 'dist/index.js',
    exec_mode: 'cluster',
    instances: 4,
    watch: true,
  }]
};
