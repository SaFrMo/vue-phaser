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
            this.target.setX(parseFloat(this.x))
            this.target.setY(parseFloat(this.y))
            this.target.setDepth(parseFloat(this.z))

            if (this.spriteKey && this.spriteKey === 'billboard1') {
                console.log(this.target)
            }
        },
    },
    watch: {
        x(newVal) {
            this.target.setX(parseFloat(newVal))
        },
        y(newVal) {
            this.target.setY(parseFloat(newVal))
        },
        z(newVal) {
            this.target.setDepth(parseFloat(newVal))
        },

    },
}