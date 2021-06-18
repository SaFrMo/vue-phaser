export default {
    props: {
        depth: { type: [Number, String], default: 0 },
    },
    mounted() {
        this.refreshDepth()
    },
    computed: {
        depthProps() {
            return {
                depth: this.depth
            }
        }
    },
    methods: {
        refreshDepth() {
            if (!this.target) return

            this.target.setDepth(parseFloat(this.depth))
        },
    },
    watch: {
        depth(newVal) {
            if (!this.target) return

            this.target.setDepth(parseFloat(newVal))
        },

    },
}