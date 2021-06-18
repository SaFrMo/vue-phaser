export default {
    props: {
        customProps: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.refreshCustomProps()
    },
    methods: {
        refreshCustomProps() {
            if (this.customProps && this.target) {
                Object.keys(this.customProps).forEach(key => {
                    this.target[key] = this.customProps[key]
                })
            }
        }
    }
}