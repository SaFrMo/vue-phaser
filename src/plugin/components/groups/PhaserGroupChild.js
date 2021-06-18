import base from '../../common/base'
import { customProps, depth, gameObject, origin, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-group-child',
    mixins: [customProps, depth, gameObject, origin, transform],
    props: {
        // vue-phaser options
        groupKey: {
            type: String,
            required: true
        },
        spriteKey: {
            type: String,
        },
        spriteFrame: {
            type: [String, Number],
            default: null
        }
    },
    computed: {
        group() {
            return this.$groups[this.groupKey]
        }
    },
    mounted() {
        if (!this.group) {
            console.error(`Missing group ${this.groupKey}`)
            return
        }

        const key = this.spriteKey || this.group.defaultKey

        // get first available group instance
        this.target = this.group.getFirstDead(
            false,
            this.x,
            this.y,
            key,
            this.spriteFrame
        )

        // if none ready, make a new one
        if (!this.target) {
            this.target = this.group.create(
                this.x,
                this.y,
                key,
                this.spriteFrame
            )
            this.$emit('created-new', this.target)
        } else {
            this.$emit('used-existing', this.target)
        }


        this.target.setActive(true)
        this.target.setVisible(true)
        this.refreshCustomProps()
        this.$emit('activated', { item: this.target })

        if (this.$host) {
            this.$host.add(this.target)
        }
        this.refreshScale()
    },
    beforeDestroy() {
        if (this && this.group && this.group.killAndHide && this.target) {
            this.group.killAndHide.bind(this.group)(this.target)
        }

        // if (this.target && this.target.ki) {
        //     this.target.destroy(this.destroyChildren)
        // }
    }
}

