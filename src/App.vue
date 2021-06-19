<template>
    <div id="app">
        <phaser-game :options="config">
            <phaser-scene
                scene-key="loading"
                auto-start
                :preload-queue="preloadQueue"
            >
                <phaser-pool>
                    <phaser-sprite
                        pool-key="42"
                        sprite-key="42"
                        physics-name="42"
                    />
                </phaser-pool>

                <phaser-sprite
                    pool-key="42"
                    :x="300 + 100 * (i - 1)"
                    :y="300"
                    scale="5"
                    v-for="i in 3"
                    :key="i"
                />

                <player-sprite />
            </phaser-scene>
        </phaser-game>
    </div>
</template>

<script lang="ts">
import PlayerSprite from './PlayerSprite.vue'

import Vue from 'vue'
import VuePhaserPlugin from './plugin'
Vue.use(VuePhaserPlugin)

export default Vue.extend({
    name: 'App',
    components: { PlayerSprite },
    data() {
        return {
            config: {
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: true,
                    },
                },
            },
            preloadQueue: ['space.png', '41.png', '42.png', '43.png'],
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
