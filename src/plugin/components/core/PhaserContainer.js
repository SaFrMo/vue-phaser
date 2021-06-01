import base from '../common/base'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-container',
    mixins: [movable, scalable],
    created() {
        this.target = this._host = this.$scene.add.container()
    },
}

