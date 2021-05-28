import base from './base'

export default {
    ...base,
    name: 'phaser-sprite',
    props: {
        spriteKey: {
            type: String,
            required: true
        },
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 }
    },
    async mounted() {
        this._sprite = this.$scene.add.image(this.x, this.y, this.spriteKey)
    },
    watch: {
        x(newVal) {
            this._sprite.setX(newVal)
        },
        y(newVal) {
            this._sprite.setY(newVal)
        }
    }
}