export default {
    computed: {
        $game() {
            let output = null
            let current = this

            while (!output && current && current.$parent) {
                current = current.$parent
                output = current._game
            }

            return output
        },
        $games() {
            let output = null
            let current = this

            while (!output && current && current.$parent) {
                current = current.$parent
                output = current._games
            }

            return output
        }
    }
}