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
            required: true
        },
    },
    computed: {
        group() {
            return this.$groups[this.groupKey]
        }
    },
    created() {
        this.target = this.group.get(
            this.x,
            this.y,
            this.spriteKey || group.defaultKey,
        )

        this.target.setActive(true)
        this.target.setVisible(true)
        this.$emit('activated', { item: this.target })

        if (this.$host) {
            this.$host.add(this.target)
        }
    },
    beforeDestroy() {
        if (this.group && this.group.killAndHide && this.target) {
            // SOMETHING NOT WORKING HERE
            const t = this.target
            this.group.killAndHide.bind(this.group)(t)
        }

        // if (this.target && this.target.ki) {
        //     this.target.destroy(this.destroyChildren)
        // }
    }
}

