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
- [ ] Move `mixins/gameMixin` to more universal folder
- [ ] Document `xProps` computed property convention on `mixins/*` files (example usage: PhaserParticleEmitter)

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

    ```
    import VuePhaser from 'vue-phaser'
    Vue.use(VuePhaser)
    ```

## Setup

Here's a very basic vue-phaser setup:

```html
<template>
  <!-- phaser-game wraps the game -->
  <phaser-game>
    <!-- phaser-scene wraps a single scene -->
    <!-- scene-key is required -->
    <!-- preload-queue is a list of files to load (example assumes you have a tilemap.png file available) -->
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

### `phaser-scene`

Wrapper for a single Phaser scene.

| Prop           | Type     | Default | Notes                                                                                                                               |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `sceneKey`     | String   |         | **Required**                                                                                                                        |
| `init`         | Function |         | Scene init function                                                                                                                 |
| `preload`      | Function |         | Scene preload function                                                                                                              |
| `create`       | Function |         | Scene create function                                                                                                               |
| `update`       | Function |         | Scene update function                                                                                                               |
| `autoStart`    | Boolean  | `false` | Whether or not to start on this Scene.                                                                                              |
| `sceneData`    | Object   | `{}`    | Optional data to pass to scene. See [docs](https://photonstorm.github.io/phaser3-docs/Phaser.Scenes.SceneManager.html#add__anchor). |
| `preloadQueue` | Array    | `[]`    | Array of items to preload. See below.                                                                                               |

| Event           | Arguments                               | Notes                           |
| --------------- | --------------------------------------- | ------------------------------- |
| `load-progress` | Number representing percentage complete | `preload()` load progress       |
| `load-complete` | Loader                                  | All items in `preload()` loaded |

You can quickly load sprites in the `preloadQueue` with strings: 
  `['example1.png', '/another/example2.png']`
  
In this case, the filename minus the path and extension will be the sprite key (`example1` and `example2` above).

You can also pass objects to the queue (or mix and match strings and objects):

```
[{ url: '/more/examples/example3.png', key: 'my-key' }]
```
  
`url` and `key` properties are required, while `type` and `options` are allowed:

```
[{ 
  url: '/my/example4.png', 
  key: 'my-key-2', 
  type: 'spritesheet', 
  options: [{
      frameWidth: 32,
      frameHeight: 38,
      startFrame: 0,
      endFrame: 8
  }] 
}]
```                      

`type` is the method on `load` to run (see [docs](https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#toc24__anchor)), while `options` is an array of options that will be spread and passed to the load method.

You can also pass a `type` string and `args` array for completely custom load method usage:

```
[{
  type: 'on',
  args: ['progress', console.log]
}]
```

`type` is still the method on `load` to run, while the `args` array is spread into the `type` method as its arguments. This is the equivalent to calling `this.load.on('progress', console.log)` in your scene's `preload` function.

  ### `phaser-sprite`

  TODO