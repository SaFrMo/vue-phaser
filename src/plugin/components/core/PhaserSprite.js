import base from '../common/base'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'
import physics from '../../mixins/physics'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [movable, scalable, physics],
    props: {
        spriteKey: {
            type: String,
            required: true
        },
        usePhysics: {
            type: Boolean,
            default: true
        }
    },
    created() {
        const factorySource = this.usePhysics ? (this.$scene.physics || this.$scene) : this.$scene

        this.target = factorySource.add.sprite(this.x, this.y, this.spriteKey)
        if (this.$host) {
            this.$host.add(this.target)
        }
        this.refreshScale()
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

