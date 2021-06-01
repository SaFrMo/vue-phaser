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

## To Document

- [ ] All components in `/src/plugin/components/core`
- [ ] `options` prop of `phaser-shape` passes options directly to function - x, y, scale are ignored, since the component uses `movable` and `scalable` mixins

## Contributing

### Adding a New Component

* Add the file in `src/plugin/components`.
* Make sure that file extends `src/plugin/components/common/base.js` (see existing components for examples). 
  * Also make sure to use any relevant mixins in the `src/plugin/mixins` folder - for example, anything movable like a Sprite or Container has several options already available.
* Import the file into `src/plugin/components/index.js`.
* Add the imported component to that file's export.

# License

[NPL 5+](https://git.pixie.town/thufie/NPL/src/branch/master/NPL.txt)