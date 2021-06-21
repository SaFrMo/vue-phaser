import base from '../../common/base'
import { crop, customProps, depth, gameObject, origin, physics, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [crop, customProps, depth, gameObject, origin, physics, transform],
    props: {
        collideWorld: {
            type: Boolean,
            default: false
        },
        groupKey: {
            type: String,
            default: null,
        },
        poolKey: {
            type: String,
            default: null,
        },
        spriteFrame: {
            type: [String, Number],
            default: null
        },
        spriteKey: {
            type: String,
        },
    },
    created() {
        let addToHost = true
        const key = this.spriteKey || this.groupKey || this.poolKey
        const args = [this.x, this.y, key, this.spriteFrame]

        if (this.isChildOfGroup) {
            addToHost = false
            // add instance to group and hide
            this.target = this.$host.create(...args, false, false)
            this.$host.killAndHide.bind(this.$host)(this.target)
        } else if (this.groupKey !== null || this.poolKey !== null) {
            // get or create group instance
            this.target = this.group.getFirstDead(false, ...args)

            // if none ready, make a new one
            if (!this.target) {
                this.target = this.group.create(...args)
                this.$emit('created-new', this.target)
            } else {
                this.$emit('used-existing', this.target)
            }

            this.target.setActive(true)
            this.target.setVisible(true)
            this.refreshCustomProps()
            this.$emit('activated', { item: this.target })
        } else if (this.usePhysics && this.$scene.physics) {
            // create single physics instance
            this.target = this.$physics.add.sprite(...args)
            this.$physics.world.emit('added', this.target)
        } else {
            // create standard sprite
            this.target = this.$scene.add.sprite(...args)
        }

        // body setup
        if (this.target.body) {
            this.target.body.collideWorldBounds = this.collideWorld
        }

        // add to host if needed
        if (this.$host && addToHost) {
            this.$host.add(this.target)
        }
    },
    computed: {
        group() {
            return this.$groups[this.groupKey || this.poolKey]
        },
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
        if (this && this.target && this.$host && this.isChildOfGroup) {
            this.$host.killAndHide.bind(this.$host)(this.target)
            return
        }

        if (this.$host && this.$host.remove) {
            this.$host.remove(this.target)
        }
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    },
}

