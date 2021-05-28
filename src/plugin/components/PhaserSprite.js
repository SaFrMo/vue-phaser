import base from './base'
import { waitFor } from '../libs/utils'

export default {
    ...base,
    name: 'phaser-sprite',
    props: {
        spriteKey: {
            type: String,
            required: true
        }
    },
    async mounted() {
        this.$scene.add.image(400, 300, this.spriteKey)
    }
}