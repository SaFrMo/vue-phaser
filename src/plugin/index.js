import components from './components'
import gameMixin from './mixins/gameMixin'

const output = (Vue, opts = {}) => {
    // register mixins
    Vue.mixin(gameMixin)

    // register components
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}


export default output