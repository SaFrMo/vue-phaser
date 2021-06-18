import base from '../../common/base'
import Vue from 'vue'
import PhaserGroup from '../groups/PhaserGroup'
import PhaserPhysicsGroup from '../physics/PhysicsGroup'
import globalMixin from '../../globalMixin'

const PhaserGroupClass = Vue.extend({
    ...PhaserGroup,
    mixins: [...PhaserGroup.mixins || [], globalMixin]
})

const PhaserPhysicsGroupClass = Vue.extend({
    ...PhaserPhysicsGroup,
    mixins: [...PhaserPhysicsGroup.mixins || [], globalMixin]
})

export default {
    // ...base,
    name: 'phaser-pool',
    template: ``,
    props: {
    },
    // created() {
    //     this.target = this._host = this.$scene.add.group(this.children, this.config)
    //     this.$groups[this.groupKey] = this.target
    // },
    mounted() {
        // this.$children.forEach(child => {
        //     const propsKeys = Object.keys(child.$props)
        //     const propsData = propsKeys.reduce((acc, curr) => {
        //         acc[curr] = child[curr]
        //         return acc
        //     }, {})

        //     const key = propsData.spriteKey || propsData.groupKey || propsData.poolKey



        //     if (!propsData.groupKey) {
        //         propsData.groupKey = key
        //     }


        //     // physics group
        //     let instance
        //     if (child.usePhysics) {
        //         instance = new PhaserPhysicsGroupClass({
        //             propsData,
        //         })
        //     } else {
        //         // standard group
        //         instance = new PhaserGroupClass({
        //             propsData,
        //         })
        //     }
        //     console.log('instance', instance)
        //     this.$groups[key] = instance

        //     const container = document.createElement('div')
        //     instance.$mount(container)
        //     this.$el.appendChild(container)

        // })
    },
    render(h) {
        // wrap each child in a physics or regular group
        const list = this.$slots.default.map((element) => {
            // console.log(element)
            const { propsData } = element.componentOptions
            const key = propsData.groupKey || propsData.spriteKey || propsData.poolKey

            if (!key) {
                console.error('Please provide a sprite-key, group-key, or pool-key prop for each child of a phaser-pool')
                return
            }

            // console.log(element.componentOptions, element.componentOptions.propsData)

            // element.componentOptions.propsData.groupKey = key

            if (propsData.physicsName) {
                return h('phaser-physics-group', { props: { groupKey: key } }, [element])
            } else {
                return h('phaser-group', { props: { groupKey: key } }, [element])
            }
        });
        return h('div', list)
    }
}

