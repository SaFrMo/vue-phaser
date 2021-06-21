# PhaserScene

A PhaserScene corresponds directly with a Phaser [Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html). You can use a PhaserScene to preload assets or for actual gameplay.

```html
<template>
    <phaser-game ref="game">
        <!-- Example preload scene -->
        <phaser-scene 
            :preload-queue="[ /* ... */ ]"
            auto-start
            scene-key="preload"
            @load-progress="/* ... */"
            @load-complete="startGame">
            <!-- Simple loading state information here -->
        </phaser-scene>

        <!-- Example gameplay wrapper -->
        <phaser-scene scene-key="gameplay">
            <!-- Phaser sprites, containers, groups, etc all live here -->
        </phaser-scene>
    </phaser-game>
</template>

<script>
export default {
    methods: {
        startGame(){
            const gameComponent = this.$refs.game
            const phaserGame = gameComponent.$game
            phaserGame.scene.start('gameplay')
        }
    }
}
</script>
```

## Props (TODO)

| Name | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |

## Events (TODO)

| Name | Arguments |
| ---- | --------- |
