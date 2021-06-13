// gameObject has several different features, so we've split them into separate files
import name from './name'
import interactive from './interactive'

export default {
    props: {
        ...name.props,
        ...interactive.props
    },
    mounted() {
        name.mounted.bind(this)()
        interactive.mounted.bind(this)()
    },
    computed: {
        ...name.computed,
        ...interactive.computed
    },
    methods: {
        ...interactive.methods
    }
}