import components from './components'
import gameMixin from './core/gameMixin'

const output = (Vue, opts = {}) => {
    // register mixins
    Vue.mixin(gameMixin)

    // register components
    components.forEach((component) => {
        console.log(component)
        Vue.component(component.name, component)
    })
}


export default output