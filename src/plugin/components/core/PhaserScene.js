import SceneExtender from '../../libs/sceneExtender'
import base from '../base'
import Phaser from 'phaser'

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
        },
        autoStart: {
            type: Boolean, default: false
        },
        sceneData: {
            type: Object, default: () => ({})
        }
    },
    data() {
        return {
            _scene: null
        }
    },
    created() {
        const _init = this.init
        const _preload = this.preload
        const _create = this.create
        const props = this.$props
        const sceneKey = this.sceneKey

        class MyScene extends Phaser.Scene {
            constructor() {
                super({
                    key: sceneKey,
                    ...props
                })
            }
            init(data) {
                if (_init) _init(this, data)
            }
            preload(data) {
                if (_preload) _preload(this, data)
            }
            create(data) {
                if (_create) _create(this, data)
            }
            // update(data){
            //     if (_update) _update(data)
            // }
        }


        this._scene = new MyScene()

        this.$game.scene.add(this.sceneKey, this._scene, this.autoStart, this.sceneData)
    },
    render(h) {
        return h('div', this.$slots.default)
    }
}