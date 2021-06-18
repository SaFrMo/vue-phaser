export default {
    props: {
        x: { type: [Number, String], default: 0 },
        y: { type: [Number, String], default: 0 },
        z: { type: [Number, String], default: 0 },
    },
    mounted() {
        this.refreshPosition()
    },
    computed: {
        positionProps() {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            }
        }
    },
    methods: {
        refreshPosition() {
            if (!this.target) return

            this.target.setX(parseFloat(this.x))
            this.target.setY(parseFloat(this.y))
            this.target.setDepth(parseFloat(this.z))
        },
    },
    watch: {
        x(newVal) {
            if (!this.target) return

            this.target.setX(parseFloat(newVal))
        },
        y(newVal) {
            if (!this.target) return

            this.target.setY(parseFloat(newVal))
        },
        z(newVal) {
            if (!this.target) return

            this.target.setDepth(parseFloat(newVal))
        },

    },
}