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
                // scene: {
                //     preload: this.preload,
                //     create: this.create,
                //     update: this.update
                // },
                ...this.options,
            }
        },
    },
    methods: {
        preload: () => {
        },
        create: () => {
            console.log('create', this)

        },
        update() {

        }
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
