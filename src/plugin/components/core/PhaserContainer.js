import base from '../../common/base'
import customProps from '../../mixins/customProps'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [customProps, gameObject, movable, scalable],
    created() {
        this.target = this._host = this.$scene.add.container()
    },
}

