export default {
    props: {
        scale: { type: [Number, String], default: null },
        scaleX: { type: [Number, String], default: 1 },
        scaleY: { type: [Number, String], default: 1 },
        displayWidth: { type: [Number, String], default: null },
        displayHeight: { type: [Number, String], default: null }
    },
    mounted() {
        this.refreshScale()
    },
    methods: {
        refreshScale() {
            if (this.displayWidth === null && this.displayHeight === null) {
                // using scale values if no display sizes set
                const targetScaleX = this.scale === null ? this.scaleX : this.scale
                const targetScaleY = this.scale === null ? this.scaleY : this.scale

                this.target.setScale(targetScaleX, targetScaleY)
            } else {
                // use display sizes if available
                if (this.displayWidth !== null) {
                    this.target.displayWidth = this.displayWidth
                }
                if (this.displayHeight !== null) {
                    this.target.displayHeight = this.displayHeight
                }
            }
        }
    },
    watch: {
        scale(newVal) {
            const x = newVal === null ? this.scaleX : newVal
            const y = newVal === null ? this.scaleY : newVal
            this.target.setScale(x, y)
        },
        scaleX(newVal) {
            this.target.setScale(newVal)
        },
        scaleY(newVal) {
            this.target.setScale(this.scale === null ? this.scaleX : this.scale, newVal)
        },
    }
}