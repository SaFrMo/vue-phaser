import base from '../../common/base'
import { customProps, depth, gameObject, origin, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-shape',
    mixins: [customProps, depth, gameObject, origin, transform],
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

        // created
        this.$emit('created', { shape: this.target, target: this.target })
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

