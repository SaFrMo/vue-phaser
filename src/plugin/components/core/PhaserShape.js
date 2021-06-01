import base from '../common/base'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-shape',
    mixins: [movable, scalable],
    props: {
        shape: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    created() {
        this.target = this.$scene.add[this.shape](...this.options)
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

