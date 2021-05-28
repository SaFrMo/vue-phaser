<template>
    <div id="app">
        <phaser-game>
            <phaser-scene scene-key="loading" :init="init" :create="create" />
        </phaser-game>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VuePhaserPlugin from './plugin'
Vue.use(VuePhaserPlugin)

export default Vue.extend({
    name: 'App',
    methods: {
        init(scene) {
            scene.load.image('space', '/space.png')
        },
        create(scene) {
            scene.add.image(400, 300, 'space')
        },
    },
})
</script>

<style lang="scss">
body,
html {
    margin: 0;
    text-align: center;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
}
</style>
