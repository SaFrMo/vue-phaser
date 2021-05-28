import Phaser from 'phaser'
import base from '../base'

export default {
    ...base,
    name: 'phaser-game',
    data() {
        return {
            id: -1,
            _game: null,
        }
    },
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        gameOptions() {
            return {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 },
                    },
                },
                // scene: {
                //     preload: this.preload as Phaser.Types.Scenes.ScenePreloadCallback,
                //     create: this.create as Phaser.Types.Scenes.SceneCreateCallback,
                // },
                ...this.options,
            }
        },
    },
    created() {
        const game = new Phaser.Game(this.gameOptions)
        this._game = game
    },
    beforeDestroy() {
        if (this.$game) {
            this.$game.destroy(true)
        }
    },
}
