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

## TODO

- [ ] Create PhaserGroup component in Core
- [ ] Destroy children prop on PhaserContainer
- [ ] Collide events mimicking Overlap events in physics mixin

## To Document

- [ ] All components in `/src/plugin/components/core`
- [ ] `options` prop of `phaser-shape` passes options directly to function - x, y, scale are ignored, since the component uses `movable` and `scalable` mixins
- [ ] Destroy children/remove from scene props in PhaserPhysicsGroup
- [ ] gameMixin registerd globally

### Dev To Document

- [ ] `_` and `$` lookup conventions
- [ ] `$scene`, `$game`, `$host`, `target` conventions

## Contributing

### Adding a New Component

* Add the file in `src/plugin/components`.
* Make sure that file extends `src/plugin/components/common/base.js` (see existing components for examples). 
  * Also make sure to use any relevant mixins in the `src/plugin/mixins` folder - for example, anything movable like a Sprite or Container has several options already available.
* Import the file into `src/plugin/components/index.js`.
* Add the imported component to that file's export.

# License

[NPL 5+](https://git.pixie.town/thufie/NPL/src/branch/master/NPL.txt)

# Docs

vue-phaser is a Vue plugin for [Phaser](https://phaser.io/). You can use vue-phaser to quickly build browser games.

## Installation

1. `npm install vue-phaser`
2. Register the plugin:

    import VuePhaser from 'vue-phaser'
    Vue.use(VuePhaser)

## Setup

Here's a very basic vue-phaser setup:

```html
<template>
  <!-- phaser-game wraps the game -->
  <phaser-game>
    <!-- phaser-scene wraps a single scene -->
    <!-- scene-key is required -->
    <!-- preload-queue is a list of files to load -->
    <!-- auto-start starts the game on this scene -->
    <phaser-scene
      scene-key="game"
      :preload-queue="['tilemap.png']"
      auto-start
    >
      <!-- sprite-key is required -->
      <phaser-sprite sprite-key="tilemap" x="400" y="300" />
    </phaser-scene>
  </phaser-game>
</template>
```

## Core Components 

### `phaser-game`

Wrapper for an entire Phaser game.

| Prop      | Type                                                                                                       | Default | Notes                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `options` | Object: [Phaser.GameConfig](https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig) | `{}`    | Game options to pass directly to the [Phaser.Game](https://photonstorm.github.io/phaser3-docs/Phaser.Game.html) constructor. |

