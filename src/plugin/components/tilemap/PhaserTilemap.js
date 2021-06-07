import base from '../common/base'
import gameObject from '../../mixins/gameObject'

export default {
    ...base,
    name: 'phaser-tilemap',
    mixins: [gameObject],
    props: {
        mapKey: {
            type: String,
            required: true
        },
        tilesetName: {
            type: String,
            required: true
        },
        tilesetKey: {
            type: String
        }
    },
    created() {
        this.target = this.$scene.add.tilemap({ key: this.mapKey })
        // const tileset = this.target.addTilesetImage(this.tilesetName, this.tilesetKey)
        // this.target.createStaticLayer('Tile Layer 1', tileset)
    },
}

