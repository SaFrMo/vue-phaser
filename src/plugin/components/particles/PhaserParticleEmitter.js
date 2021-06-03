import base from '../common/base'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-particle-emitter',
    props: {
        config: {
            type: Object,
            default: () => ({})
        }
    },
    // mixins: [gameObject, movable, scalable],
    created() {
        if (!this.$particles) {
            console.warn('no particle emitter')
            return
        }

        this.target = this.$particles.createEmitter({
            // ...this.movableProps,
            // ...this.scalableProps,
            // ...this.gameObjectProps,
            ...this.config
        })
    },
}

