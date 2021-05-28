import base from '../common/base'
import movable from '../../mixins/movable'


export default {
    ...base,
    name: 'phaser-container',
    mixins: [movable],
    created() {
        this.target = this._host = this.$scene.add.container()
        console.log(this.target)
    },
}

