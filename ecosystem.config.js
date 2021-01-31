// eslint-disable-next-line no-undef
module.exports = {
  apps : [{
    name: "url-shortener-song",
    script: 'dist/index.js',
    exec_mode: 'cluster',
    instances: 4,
    watch: true,
  }]
};
