import position from './position'
import rotation from './rotation'
import scale from './scale'

export default {
    props: {
        ...position.props,
        ...rotation.props,
        ...scale.props,
    },
    mounted() {
        position.mounted.bind(this)()
        rotation.mounted.bind(this)()
        scale.mounted.bind(this)()
    },
    computed: {
        ...position.computed,
        ...scale.computed,
    },
    methods: {
        ...position.methods,
        ...rotation.methods,
        ...scale.methods,
    },
    watch: {
        ...position.watch,
        ...rotation.watch,
        ...scale.watch,
    },
}
