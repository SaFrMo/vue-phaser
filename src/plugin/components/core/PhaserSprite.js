import base from '../../common/base'
import { crop, customProps, depth, gameObject, origin, physics, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [crop, customProps, depth, gameObject, origin, physics, transform],
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
        let factory
        let addToHost = true
        let args = []

        switch (true) {
            case this.$host && this.$host.type === 'Group':
                factory = this.$host.create.bind(this.$host)
                addToHost = false
                args = [null, null, false]
                break
            case this.usePhysics && this.$scene.physics:
                factory = this.$scene.physics.add.sprite
                break
            default:
                factory = this.$scene.add.sprite
                break
        }

        this.target = factory(this.x, this.y, this.spriteKey, ...args)
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

