import base from '../../common/base'
import { customProps, gameObject, movable, scalable } from '../../mixins'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [customProps, gameObject, movable, scalable],
    created() {
        this.target = this._host = this.$scene.add.container()
    },
}

