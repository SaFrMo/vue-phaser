import base from '../common/base'
import customProps from '../../mixins/customProps'
import gameObject from '../../mixins/gameObject'
import movable from '../../mixins/movable'
import scalable from '../../mixins/scalable'

export default {
    ...base,
    name: 'phaser-text',
    mixins: [customProps, gameObject, movable, scalable],
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

