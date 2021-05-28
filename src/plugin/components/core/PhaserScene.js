import SceneExtender from '../../libs/sceneExtender'
import base from '../base'
import Phaser from 'phaser'

export default {
    ...base,
    name: 'phaser-scene',
    props: {
        sceneKey: { type: String, required: true },
        // options: {
        //     type: Object as PropType<Phaser.Types.Scenes.SettingsConfig>,
        //     default: () => ({})
        // }
        init: { type: Function, default: null },
        preload: { type: Function, default: null },
        create: { type: Function, default: null },
        update: { type: Function, default: null },
        autoStart: { type: Boolean, default: false },
        sceneData: { type: Object, default: () => ({}) },
        preloadQueue: { type: Array, default: () => [] }
    },
    data() {
        return {
            _scene: null,
            created: false
        }
    },
    created() {
        const vm = this
        const _init = this.init
        const _preload = this.preload
        const _create = this.create
        const _update = this.update
        const props = this.$props
        const sceneKey = this.sceneKey
        const preloadQueue = this.preloadQueue

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

                preloadQueue.forEach(preload => {
                    if (typeof preload === 'string') {
                        // handle a file url - `/example/test.jpg` loads that URL as sprite with key `test
                        const matches = preload.match(/([^\/]*)\.[^\.]*$/)
                        if (matches && matches[1]) {
                            const key = matches[1]
                            console.log(key, preload)
                            this.load.image(key, preload)
                        }
                    } else {
                        // full options - accepts:
                        // { type?, key, url, options? }
                        this.load[preload.type || 'image'](preload.key, preload.url, preload.options || {})
                    }
                })
            }
            create(data) {
                if (_create) _create(this, data)
                vm.created = true
            }
            update(time, delta) {
                if (_update) _update(this, time, delta)
            }
        }


        this._scene = new MyScene()

        this.$game.scene.add(this.sceneKey, this._scene, this.autoStart, this.sceneData)
    },
    render(h) {
        if (this.created) {
            return h('div', this.$slots.default)
        } else {
            return h('div')
        }
    }
}