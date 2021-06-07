import base from '../common/base'
import customProps from '../../mixins/customProps'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import physics from '../../mixins/physics'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [customProps, gameObject, movable, physics, scalable],
    props: {
        spriteKey: {
            type: String,
            required: true
        },
        usePhysics: {
            type: Boolean,
            default: true
        },
        frame: {
            type: [String, Number],
            default: null
        }
    },
    created() {
        const factorySource = this.usePhysics && this.$scene.physics ? this.$scene.physics : this.$scene

        const args = [this.x, this.y, this.spriteKey]
        if (this.frame !== null) {
            args.push(this.frame)
        }

        this.target = factorySource.add.sprite(...args)
        if (this.$host) {
            this.$host.add(this.target)
        }
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

