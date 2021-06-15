<template>
    <div id="app">
        <phaser-game>
            <phaser-scene
                scene-key="loading"
                auto-start
                :preload-queue="preloadQueue"
            >
                <phaser-sprite sprite-key="space" x="400" y="300" />
            </phaser-scene>
        </phaser-game>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VuePhaserPlugin from './plugin'
Vue.use(VuePhaserPlugin)

export default Vue.extend({
    name: 'App',
    data() {
        return {
            preloadQueue: ['space.png'],
        }
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
