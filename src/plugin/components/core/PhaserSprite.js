import base from '../../common/base'
import { crop, customProps, depth, gameObject, origin, physics, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [crop, customProps, depth, gameObject, origin, physics, transform],
    props: {
        spriteKey: {
            type: String,
        },
        usePhysics: {
            type: Boolean,
            default: true
        }
    },
    created() {
        let addToHost = true
        let args = [this.x, this.y, this.spriteKey]

        if (this.$host && this.$host.type === 'Group') {
            addToHost = false
            this.target = this.$host.create(...args, null, null, false)

        } else if (this.usePhysics && this.$scene.physics) {
            this.target = this.$scene.physics.add.sprite(...args)

        } else {
            this.target = this.$scene.add.sprite(...args)
        }

        if (this.$host && addToHost) {
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

