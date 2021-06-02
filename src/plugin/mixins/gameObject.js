export default {
    props: {
        name: {
            type: String,
            default: null
        }
    },
    mounted() {
        if (this.name !== null) {
            this.target.name = this.name
        }
    }
}