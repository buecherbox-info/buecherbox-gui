module.exports = {
  chainWebpack: config => {
    config
      .plugin('provide')
      .use(require('webpack').ProvidePlugin, [{
        mapboxgl: 'mapbox-gl'
      }])
  }
};
