import base from '../../common/base'
import { gameObject, movable, scalable } from '../../mixins'

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

