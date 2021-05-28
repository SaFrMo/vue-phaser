import Phaser from 'phaser'

function SceneExtender(key, options = {}) {
    class ExtendedScene extends Phaser.Scene {
        constructor() {
            super(key)
        }

        init(data) {
            if (options.init) {
                options.init(this, data)
            }
        }

        preload() {
            if (options.preload) {
                options.preload(this)
            }

            this.load.image('space', '/space.png')
        }

        create(data) {
            if (options.create) {
                options.create(this, data)
            }
        }

        // update(time?: number, delta?: number) {
        //     if (options.update) {
        //         options.update(this, time, delta)
        //     }
        // }
    }

    return new ExtendedScene()
}

export default SceneExtender