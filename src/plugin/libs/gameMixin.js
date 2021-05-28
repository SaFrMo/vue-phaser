export default {
    computed: {
        $game() {
            return this.findInAncestor('$game')
        },
        $games() {
            return this.findInAncestor('$games')
        },
        $scene() {
            return this.findInAncestor('$scene')
        }
    },
    methods: {
        findInAncestor(key) {
            let output = null
            let current = this

            while (!output && current && current.$parent) {
                current = current.$parent
                output = current[key.replace(/^\$/, '_')]
            }

            return output
        }
    }
}