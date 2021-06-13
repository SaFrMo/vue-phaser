// gameObject has several different features, so we've split them into separate files
import name from './name'

export default {
    props: {
        ...name.props
    },
    mounted() {
        name.mounted.bind(this)()
    },
    computed: {
        ...name.computed
    }
}