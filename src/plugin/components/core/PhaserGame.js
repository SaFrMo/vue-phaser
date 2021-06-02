import Phaser from 'phaser'
import base from '../common/base'

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
    beforeDestroy() {
        if (this.$game) {
            this.$game.destroy(true)
        }
    },
}
