# vue-phaser

⚠️  **This project is in active development! Expect breaking changes!** ⚠️ 

vue-phaser is a Vue plugin for [Phaser](https://phaser.io/). You can use vue-phaser to quickly build browser games.

## Installation

1. `npm install vue-phaser`
2. Register the plugin:

```js
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