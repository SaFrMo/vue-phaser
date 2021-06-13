import position from './position'
import scale from './scale'

export default {
    props: {
        ...position.props,
        ...scale.props
    },
    mounted() {
        position.mounted.bind(this)()
        scale.mounted.bind(this)()
    },
    computed: {
        ...position.computed,
        ...scale.computed
    },
    methods: {
        ...position.methods,
        ...scale.methods
    },
    watch: {
        ...position.watch,
        ...scale.watch
    },

}
