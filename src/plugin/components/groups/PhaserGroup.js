import base from '../../common/base'
// import { customProps, depth, gameObject, origin, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-group',
    // mixins: [customProps, depth, gameObject, origin, transform],
    props: {
        // vue-phaser options
        groupKey: {
            type: String,
            required: true
        },

        // config options
        children: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => ({})
        },
        destroyChildren: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.target = this._host = this.$scene.add.group(this.children, this.config)
        this.$groups[this.groupKey] = this.target
    },
    mounted() {
        // set default key if group only has 1 child
        if (this.$children.length === 1) {
            this.target.defaultKey = this.$children[0].spriteKey
        }
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy(this.destroyChildren)
        }
    }
}

