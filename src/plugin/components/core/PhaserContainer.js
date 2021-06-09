import base from '../../common/base'
import { customProps, depth, gameObject, movable, scalable } from '../../mixins'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [customProps, depth, gameObject, movable, scalable],
    props: {
        keepChildren: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.target = this._host = this.$scene.add.container()
    },
    beforeDestroy() {
        const destroyChildren = !this.keepChildren
        this.target.removeAll(destroyChildren)

        this.target.destroy()
    }
}

