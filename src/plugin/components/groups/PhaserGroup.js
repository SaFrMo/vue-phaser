import base from '../../common/base'
// import { customProps, depth, gameObject, origin, transform } from '../../mixins'
import { physics } from '../../mixins'

export default {
    ...base,
    name: 'phaser-group',
    mixins: [physics],
    // mixins: [customProps, depth, gameObject, origin, transform],
    props: {
        // vue-phaser options
        groupKey: {
            type: String,
            default: null,
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
        if (this.groupKey === null && this.physicsName === null) {
            console.error('Must provide either a group-key or a physics-name to PhaserGroup.')
            return
        }

        const key = this.groupKey || this.physicsName

        if (this.physicsName) {
            this.target = this._host = this.$physics.add.group(this.config)
            this.target.name = this.physicsName
            this.$physics.world.emit('added', this.target)
        } else {
            this.target = this._host = this.$scene.add.group(this.children, this.config)
        }

        this.$groups[key] = this.target

        this.$emit('created', { target: this.target, group: this.target })
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

