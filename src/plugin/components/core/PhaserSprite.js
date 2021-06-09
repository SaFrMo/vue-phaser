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
        }
    },
    created() {
        const factorySource = this.usePhysics && this.$scene.physics ? this.$scene.physics : this.$scene

        this.target = factorySource.add.sprite(this.x, this.y, this.spriteKey)
        if (this.$host) {
            this.$host.add(this.target)
        }
    },
    watch: {
        spriteKey(newVal) {
            this.target.setTexture(newVal)
        }
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

