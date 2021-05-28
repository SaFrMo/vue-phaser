import Phaser from 'phaser'

export default {
    name: 'phaser-game',
    mounted() {
        console.log('game here')
    },
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
    render(h) {
        const game = new Phaser.Game(this.gameOptions)
        console.log('rendering')
        this._game = game
        // this.id = this.$gamesCreated
        // this.$games[this.$gamesCreated] = game
        // this.$gamesCreated++

        // return this.$slots.default as any
        return h('div', this.$slots.default)
    },
    beforeDestroy() {
        // if (this.$games && this.$games[this.id]) {
        //     this.$games[this.id].destroy(true)
        // }
        if (this._game) {
            this._game.destroy(true)
        }
    },
}
