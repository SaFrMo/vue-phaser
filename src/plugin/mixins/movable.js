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
        movableProps() {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            }
        }
    },
    methods: {
        refreshPosition() {
            this.target.setX(this.x)
            this.target.setY(this.y)
            this.target.setZ(this.z)
        },
    },
    watch: {
        x(newVal) {
            this.target.setX(newVal)
        },
        y(newVal) {
            this.target.setY(newVal)
        },
        z(newVal) {
            this.target.setZ(newVal)
        },

    },
}