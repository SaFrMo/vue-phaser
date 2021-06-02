export default {
    props: {
        customProps: {
            type: Object,
            default: null
        }
    },
    mounted() {
        if (this.customProps) {
            Object.keys(this.customProps).forEach(key => {
                this.target[key] = this.customProps[key]
            })
        }
    }
}