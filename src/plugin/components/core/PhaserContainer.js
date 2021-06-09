import base from '../../common/base'
import { customProps, depth, gameObject, movable, scalable } from '../../mixins'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [customProps, depth, gameObject, movable, scalable],
    created() {
        this.target = this._host = this.$scene.add.container()
    },
}

