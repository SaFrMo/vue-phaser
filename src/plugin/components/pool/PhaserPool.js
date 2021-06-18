
export default {
    name: 'phaser-pool',
    render(h) {
        // wrap each child in a physics or regular group
        const list = this.$slots.default.filter(s => s.tag).map((element) => {
            const { propsData } = element.componentOptions
            const key = propsData.groupKey || propsData.spriteKey || propsData.poolKey

            if (!key) {
                console.error('Please provide a sprite-key, group-key, or pool-key prop for each child of a phaser-pool')
                return
            }

            return h('phaser-group', {
                props: {
                    groupKey: key,
                    physicsName: propsData.physicsName
                }
            }, [element])
        });
        return h('div', list)
    }
}

