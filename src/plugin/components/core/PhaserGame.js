import Phaser from 'phaser'
import base from '../../common/base'
import { waitFor } from '../../libs/utils'

export default {
    ...base,
    name: 'phaser-game',
    data() {
        return {
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
                parent: null,
                ...this.options,
            }
        },
    },
    created() {
        const game = new Phaser.Game(this.gameOptions)
        this._game = game

        // group metadata
        this._groups = {}

        // created
        this.$emit('created', { game: this._game, target: this._game })
    },
    async mounted() {
        if (!this.gameOptions.parent) {
            const canvas = await waitFor(this.$game, 'canvas')
            if (canvas) {
                this.$el.append(canvas)
            } else {
                console.error('no canvas found')
            }
        }
    },
    beforeDestroy() {
        if (this.$game) {
            this.$game.destroy(true)
        }
    },
}
