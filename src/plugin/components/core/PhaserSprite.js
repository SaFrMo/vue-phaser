import base from '../common/base'
import movable from '../../mixins/movable'

export default {
    ...base,
    name: 'phaser-sprite',
    mixins: [movable],
    props: {
        spriteKey: {
            type: String,
            required: true
        },
    },
    created() {
        this.target = this.$scene.add.image(this.x, this.y, this.spriteKey)
        this.refreshScale()
    },
    methods: {

    },


}

