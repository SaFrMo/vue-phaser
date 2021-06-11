export default {
    props: {
        origin: {
            type: [Number, String, Array],
            default: 0.5
        }
    },
    mounted() {
        this.refreshOrigin()
    },
    methods: {
        refreshOrigin() {
            this.target.setOrigin(...(Array.isArray(this.origin) ? this.origin : [this.origin]))
        }
    },
    watch: {
        origin() {
            this.refreshOrigin()
        }
    }
}