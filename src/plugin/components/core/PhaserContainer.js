import base from '../../common/base'
import { customProps, depth, gameObject, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [customProps, depth, gameObject, transform],
    props: {
        keepChildren: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.target = this._host = this.$scene.add.container()

        // created
        this.$emit('created', { container: this.target, target: this.target })
    },
    beforeDestroy() {
        const destroyChildren = !this.keepChildren
        this.target.removeAll(destroyChildren)

        this.target.destroy()
    }
}

