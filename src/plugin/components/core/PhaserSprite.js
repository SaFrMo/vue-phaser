import base from '../common/base'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [movable, scalable],
    props: {
        spriteKey: {
            type: String,
            required: true
        },
    },
    created() {
        this.target = this.$scene.add.image(this.x, this.y, this.spriteKey)
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

