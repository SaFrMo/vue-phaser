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
        const image = await waitFor(this, '$scene.add.image')
        console.log(image())
        // if (image) {
        //     image(400, 300, this.spriteKey)
        // }
    }
}