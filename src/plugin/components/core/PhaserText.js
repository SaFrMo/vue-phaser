import base from '../../common/base'
import { customProps, depth, gameObject, origin, transform } from '../../mixins'

export default {
    ...base,
    name: 'phaser-text',
    mixins: [customProps, depth, gameObject, origin, transform],
    props: {
        textStyle: {
            type: Object,
            default: () => ({})
        },
        text: {
            default: ''
        }
    },
    created() {
        this.target = this.$scene.add.text(this.x, this.y, this.text.toString(), this.textStyle)
        if (this.$host) {
            this.$host.add(this.target)
        }

        // created
        this.$emit('created', { text: this.target, target: this.target })
    },
    watch: {
        text(newVal) {
            this.target.setText(newVal)
        }
    },
    beforeDestroy() {
        if (this.target && this.target.destroy) {
            this.target.destroy()
        }
    }
}

