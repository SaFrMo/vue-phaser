import components from './components'
import gameMixin from './core/gameMixin'

const output = (Vue, opts) => {
    // check for store
    // if (!store) {
    //     throw new Error("Please provide vuex store as a `store` option.")
    // }

    // store.registerModule({ states, mutations, actions });
    Vue.mixin(gameMixin)

    // // prep global vars
    // Vue.game = null
    // Vue.games = {}
    // Vue.gamesCreated = 0

    // register components
    components.forEach((component) => {
        console.log(component)
        Vue.component(component.name, component)
    })
}


export default output