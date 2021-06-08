export default {
    name: 'phaser-vue-wrap',
    render(h) {
        return h('div', this.$slots.default || '')
    }
}