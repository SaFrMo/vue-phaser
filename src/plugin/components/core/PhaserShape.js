import base from '../../common/base'
import customProps from '../../mixins/customProps'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-shape',
    mixins: [customProps, gameObject, movable, scalable],
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
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

