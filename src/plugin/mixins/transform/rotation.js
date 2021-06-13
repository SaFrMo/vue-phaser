export default {
    props: {
        angle: {
            type: Number,
            default: null
        },
        rotation: {
            type: Number,
            default: null
        }
    },
    mounted() {
        this.refreshRotation()
    },
    methods: {
        refreshRotation() {
            if (this.rotation !== null) {
                this.target.setRotation(this.rotation)
            } else if (this.angle !== null) {
                this.target.setAngle(this.angle)
            }
        }
    },
    watch: {
        angle() {
            this.refreshRotation()
        },
        rotation() {
            this.refreshRotation()
        }
    }
}