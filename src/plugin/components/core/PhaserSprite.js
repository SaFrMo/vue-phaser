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
        spriteFrame: {
            type: [String, Number],
            default: null
        }
        // usePhysics: {
        //     type: Boolean,
        //     default: true
        // }
    },
    created() {
        let addToHost = true
        let args = [this.x, this.y, this.spriteKey, this.spriteFrame]

        if (this.isChildOfGroup) {
            addToHost = false
            // get first available target
            this.target = this.$host.create(...args, false, false)
            this.$host.killAndHide.bind(this.$host)(this.target)

            // if (!this.target) {
            //     // if none ready, make a new one
            //     this.target = this.$host.create(...args)
            // }
            // } else if (this.$host && this.$host.type === 'PhysicsGroup') {
            //     addToHost = false
            //     this.target = this.$host.create(...args)
            //     this.$physics.world.emit('added', this.target)
        } else if (this.usePhysics && this.$scene.physics) {
            this.target = this.$physics.add.sprite(...args)
            this.$physics.world.emit('added', this.target)
        } else {
            this.target = this.$scene.add.sprite(...args)
        }

        if (this.$host && addToHost) {
            this.$host.add(this.target)
        }
    },
    computed: {
        isChildOfGroup() {
            return this.$host && (this.$host.type === 'Group' || this.$host.type === 'PhysicsGroup')
        }
    },
    watch: {
        spriteKey(newVal) {
            this.target.setTexture(newVal)
        }
    },
    beforeDestroy() {
        if (this.$host && this.isChildOfGroup) {
            this.$host.killAndHide.bind(this.$host)(this.target)
            return
        }

        if (this.$host && this.$host.remove) {
            this.$host.remove(this.target)
        }
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

