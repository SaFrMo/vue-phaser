import base from '../../common/base'
import { crop, customProps, depth, gameObject, origin, physics, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [crop, customProps, depth, gameObject, origin, physics, transform],
    props: {
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
                console.log('created', key)
                this.$emit('created-new', this.target)
            } else {
                this.$emit('used-existing', this.target)
            }
            console.log(this.target)

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
    },
    // render(h) {
    //     // if we have a pool/group key and we're not the reference item,
    //     if (this.poolKey && this.isChildOfGroup) {
    //         if (this.physicsName) {
    //             this.group.name = this.physicsName
    //         }
    //     }
    //     return h('div', this.$slots.default || '')

    //     // // wrap each child in a physics or regular group
    //     // const list = this.$slots.default.filter(s => s.tag).map((element) => {
    //     //     const { propsData } = element.componentOptions
    //     //     const key = propsData.groupKey || propsData.spriteKey || propsData.poolKey

    //     //     if (!key) {
    //     //         console.error('Please provide a sprite-key, group-key, or pool-key prop for each child of a phaser-pool')
    //     //         return
    //     //     }

    //     //     return h('phaser-group', {
    //     //         props: {
    //     //             groupKey: key,
    //     //             physicsName: propsData.physicsName
    //     //         }
    //     //     }, [element])
    //     // });
    //     // return h('div', list)

    // }
}

