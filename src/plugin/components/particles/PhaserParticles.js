import base from '../common/base'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-particles',
    props: {
        particleKey: {
            type: String,
            required: true
        }
    },
    mixins: [gameObject, movable, scalable],
    created() {
        this.target = this._particles = this.$scene.add.particles(this.particleKey)
        if (this.$host) {
            this.$host.add(this.target)
        }
    },
}

