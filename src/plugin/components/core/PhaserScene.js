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
                super({ ...props, key: sceneKey })

                if (_init) {
                    this.init = _init
                }
                if (_preload) {
                    this.preload = _preload
                }
                if (_create) {
                    this.create = _create
                }
            }
        }

        this._scene = new MyScene()
        this.$game.scene.add(this.sceneKey, this._scene, this.autoStart, this.sceneData)
        // const _factory = new Phaser.GameObjects.GameObjectFactory(this._scene)
        // this._scene.add = _factory

        // this._scene = SceneExtender(this.sceneKey, {
        //     init: this.init,
        //     preload: this.preload,
        //     create: this.create,
        //     active: this.active
        // })
        // this.$game.scene.add(this.sceneKey, this._scene)
        // this.$game.scene.start(this.sceneKey)
    },
    render(h) {
        return h('div', this.$slots.default)
    }
}