import Phaser from 'phaser'
import base from '../../common/base'
import { waitFor } from '../../libs/utils'

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
                parent: null,
                ...this.options,
            }
        },
    },
    created() {
        const game = new Phaser.Game(this.gameOptions)
        this._game = game

        // physics metadata
        this._physicsDictionary = {
            OVERLAP_CALLBACK_QUEUE: {}
        }
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
