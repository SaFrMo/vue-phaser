import SceneExtender from '../../libs/sceneExtender'
import base from '../base'

export default {
    ...base,
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
            _scene: null
        }
    },
    created() {
        this._scene = SceneExtender(this.sceneKey, {
            init: this.init,
            preload: this.preload,
            create: this.create
        })
        this.$game.scene.add(this.sceneKey, this._scene)
        this.$game.scene.start(this.sceneKey)
    },
    render(h) {
        return h('div', this.$slots.default)
    }
}