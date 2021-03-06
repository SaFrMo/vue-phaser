export default {
    computed: {
        $game() {
            return this.findInAncestor('_game')
        },
        $games() {
            return this.findInAncestor('_games')
        },
        $groups() {
            return this.findInAncestor('_groups')
        },
        $host() {
            return this.findInAncestor('_host')
        },
        $particles() {
            return this.findInAncestor('_particles')
        },
        $physics() {
            return this.$scene ? this.$scene.physics : null
        },
        // $physicsDictionary() {
        //     return this.findInAncestor('_physicsDictionary')
        // },
        $scene() {
            return this.findInAncestor('_scene')
        },
    },
    methods: {
        findInAncestor(key) {
            let output = null
            let current = this

            output = current[key]

            while (!output && current && current.$parent) {
                current = current.$parent
                output = current[key]
            }

            return output
        }
    }
}