import base from '../common/base'

export default {
    ...base,
    name: 'phaser-physics-group',
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        destroyChildren: {
            type: Boolean,
            default: false
        },
        removeFromScene: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.target = this._host = this.$scene.physics.add.group(this.options)
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy(this.destroyChildren, this.removeFromScene)
        }
    }
}

