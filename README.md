# vue-phaser

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributing

### Adding a New Component

* Add the file in `src/plugin/components`.
* Make sure that file extends `src/plugin/components.base.js` (see existing components for examples).
* Import the file into `src/plugin/components/index.js`.
* Add the imported component to that file's export.