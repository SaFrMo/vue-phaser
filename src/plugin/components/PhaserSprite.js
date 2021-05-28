import base from './base'

export default {
    ...base,
    name: 'phaser-sprite',
    mounted() {
        console.log(this)
        this.$scene.add.image(400, 300, 'space')
    }
}