import base from '../../common/base'

export default {
    ...base,
    name: 'phaser-particle-emitter',
    props: {
        config: {
            type: Object,
            default: () => ({})
        }
    },
    created() {
        if (!this.$particles) {
            console.warn('no particle emitter')
            return
        }

        this.target = this.$particles.createEmitter({
            ...this.config
        })
    },
}

