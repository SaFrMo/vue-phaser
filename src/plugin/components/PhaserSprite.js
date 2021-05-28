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
        y: { type: Number, default: 0 },
        scale: { type: Number, default: null },
        scaleX: { type: Number, default: 1 },
        scaleY: { type: Number, default: 1 }
    },
    created() {
        this.sprite = this.$scene.add.image(this.x, this.y, this.spriteKey)
        this.refreshScale()
    },
    methods: {
        refreshScale() {
            this.sprite.setScale(this.scale === null ? this.scaleX : this.scale, this.scale === null ? this.scaleY : this.scale)
        }
    },
    watch: {
        x(newVal) {
            this.sprite.setX(newVal)
        },
        y(newVal) {
            this.sprite.setY(newVal)
        },
        scale: {
            handler: function (newVal) {
                const x = newVal === null ? this.scaleX : newVal
                const y = newVal === null ? this.scaleY : newVal
                this.sprite.setScale(x, y)
            },
        },
        scaleX(newVal) {
            this.sprite.setScale(newVal)
        },
        scaleY(newVal) {
            this.sprite.setScale(this.scale === null ? this.scaleX : this.scale, newVal)
        },
    },

}

