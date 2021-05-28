export default {
    props: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        scale: { type: Number, default: null },
        scaleX: { type: Number, default: 1 },
        scaleY: { type: Number, default: 1 }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            this.refreshPosition()
            this.refreshScale()
        },
        refreshPosition() {
            this.target.setX(this.x)
            console.log(this.x)
            this.target.setY(this.y)
        },
        refreshScale() {
            this.target.setScale(this.scale === null ? this.scaleX : this.scale, this.scale === null ? this.scaleY : this.scale)
        }
    },
    watch: {
        x(newVal) {
            this.target.setX(newVal)
        },
        y(newVal) {
            this.target.setY(newVal)
        },
        scale: {
            handler: function (newVal) {
                const x = newVal === null ? this.scaleX : newVal
                const y = newVal === null ? this.scaleY : newVal
                this.target.setScale(x, y)
            },
        },
        scaleX(newVal) {
            this.target.setScale(newVal)
        },
        scaleY(newVal) {
            this.target.setScale(this.scale === null ? this.scaleX : this.scale, newVal)
        },
    },
}