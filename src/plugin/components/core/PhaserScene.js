import base from '../../common/base'
import Phaser from 'phaser'

export default {
    ...base,
    name: 'phaser-scene',
    props: {
        sceneKey: { type: String, required: true },
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
            created: false,
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

        // ***NOTE***
        // `this` in this class refers to the Phaser.Scene extension,
        // NOT the Vue component - that's why we needed to declare the extra vars above
        // We're defining this class in block scope so we can configure it easily
        class VuePhaserScene extends Phaser.Scene {
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

                this.load.on('progress', evt => vm.$emit('load-progress', evt))
                this.load.on('complete', evt => vm.$emit('load-complete', evt))

                preloadQueue.forEach(preload => {
                    if (typeof preload === 'string') {
                        // handle a file url - `/example/test.jpg` loads that URL as sprite with key `test
                        const matches = preload.match(/([^\/]*)\.[^\.]*$/)
                        if (matches && matches[1]) {
                            const key = matches[1]
                            this.load.image(key, preload)
                        }
                    } else {
                        // full options - accepts:
                        // { type?, key, url, options? }
                        const defaultArgs = [preload.key, preload.url, ...(preload.options || [])]
                        this.load[preload.type || 'image'](...(preload.args || defaultArgs))
                    }
                })
            }
            create(data) {
                if (_create) _create(this, data)
                // indicate to the Vue component that we're initialized
                vm.created = true
            }
            update(time, delta) {
                if (_update) _update(this, time, delta)
            }
        }
        // end `this` referring to the class

        this._scene = new VuePhaserScene()

        this.$game.scene.add(this.sceneKey, this._scene, this.autoStart, this.sceneData)
    },
    render(h) {
        // prevent rendering children until we're fully initialized
        if (this.created) {
            return h('div', this.$slots.default)
        } else {
            return h('div')
        }
    }
}