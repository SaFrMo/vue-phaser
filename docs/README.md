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

Here's a basic vue-phaser setup:

```html
<phaser-game>
    <phaser-scene
    scene-key="game"
    :preload-queue="['tilemap.png']"
    auto-start
    >
        <phaser-sprite sprite-key="tilemap" x="400" y="300" />
    </phaser-scene>
</phaser-game>
```

`phaser-game` wraps one or more `phaser-scene`s. A `phaser-scene` can contain assets to preload, GameObjects and groups to render, and more; one example of a GameObject is the `phaser-sprite`, which draws and places an image on the screen.

## Phaser Workflow

Here's a sample vue-phaser template implementing some more complex Phaser concepts:

```html
<template>
    <phaser-game :options="options">
        <phaser-scene
            scene-key="loading"
            auto-start
            :preload-queue="preloadQueue"
        >
            <!-- A Phaser Physics Group serving as an object pool -->
            <phaser-group physics-name="blocks">
                <phaser-sprite sprite-key="block" />
            </phaser-group>

            <!-- Instantiated children of the above Group -->
            <phaser-sprite
                group-key="blocks"
                :x="300 + 100 * (i - 1)"
                :y="300"
                scale="5"
                v-for="i in 3"
                :key="i"
                collide-world
            />

            <!-- Player sprite - collides with world bounds and previous blocks -->
            <phaser-sprite
                :x="400"
                :y="100"
                physics-name="player"
                :collide-with="['blocks']"
                sprite-key="player"
                collide-world
            />
        </phaser-scene>
    </phaser-game>
</template>

<script>
// game options, passed directly to `new Phaser.Game`
const options = {
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 300,
            },
        },
    },
}

// preload queue - assets for scene to load
const preloadQueue = ['player.png', 'block.png'],

export default {
    data(){
        return {
            options,
            preloadQueue
        }
    }
}
</script>
```
