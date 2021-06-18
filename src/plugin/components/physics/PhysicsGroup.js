import base from '../../common/base'
import { customProps, gameObject, physics } from '../../mixins'

export default {
    ...base,
    name: 'phaser-physics-group',
    mixins: [customProps, gameObject, physics],
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        destroyChildren: {
            type: Boolean,
            default: false
        },
        removeFromScene: {
            type: Boolean,
            default: false
        }
    },
    created() {
        console.log(this, this.$physics)
        this.target = this._host = this.$physics.add.group(this.options)
        this.target.name = this.physicsName
        this.$physics.world.emit('added', this.target)
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy(this.destroyChildren, this.removeFromScene)
        }
    }
}

