import Phaser from 'phaser'
import SceneExtender from '../../libs/sceneExtender'

export default {
    name: 'phaser-scene',
    props: {
        sceneKey: {
            type: String,
            required: true
        },
        // options: {
        //     type: Object as PropType<Phaser.Types.Scenes.SettingsConfig>,
        //     default: () => ({})
        // }
        init: {
            type: Function,
            default: null
        },
        preload: {
            type: Function,
            default: null
        },
        create: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            scene: null
        }
    },
    mounted() {
        this.scene = SceneExtender(this.sceneKey, {
            init: this.init,
            preload: this.preload,
            create: this.create
        })
        console.log(this)
        this.$game.scene.add(this.sceneKey, this.scene)
        this.$game.scene.start(this.sceneKey)
    },
    render(h) {
        return h('div', this.$slots.default)
    }
}