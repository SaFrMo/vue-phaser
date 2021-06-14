<template>
    <div id="app">
        <phaser-game>
            <phaser-scene
                scene-key="loading"
                auto-start
                :preload-queue="preloadQueue"
            >
                <phaser-group ref="group" group-key="sprites">
                    <phaser-sprite sprite-key="space" />
                </phaser-group>

                <phaser-group-child
                    group-key="sprites"
                    sprite-key="space"
                    :x="item.x"
                    :y="item.y"
                    scale="0.2"
                    :key="item.id"
                    v-for="item in items"
                />

                <phaser-text :text="count" x="10" y="10" z="100" />
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
            items: [],
            lowBound: 0,
            y: 300,
            count: 0,
        }
    },
    mounted() {
        // this.update()
        setInterval(() => {
            this.items.push({
                id: Date.now(),
                y: Math.random() * 400,
                x: Math.random() * 600,
            })
            if (this.items.length > 10) {
                this.items.unshift()
            }

            // TODO: check why group isn't instantiating properly

            this.count = this.$refs.group.target.countActive()
        }, 300)
    },
    methods: {
        update() {
            this.y = Math.sin(Date.now() * 0.001) * 100 + 300
            requestAnimationFrame(this.update)
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
