module.exports = {
    title: 'Vue-Phaser',
    description: 'Vue 2 wrapper for Phaser',
    port: 3000,
    themeConfig: {
        sidebar: [
            ['/', 'Introduction'],
            // {
            //     title: 'Examples',
            //     collapsable: false,
            //     children: [
            //         'examples/sprites'
            //     ]
            // },
            {
                title: 'Components',
                collapsable: false,
                children: [
                    'components/PhaserContainer',
                    'components/PhaserGame',
                    'components/PhaserScene',
                    'components/PhaserShape',
                    'components/PhaserSprite',
                    'components/PhaserText',
                    'components/PhaserVueWrap',
                ],
            },
            {
                title: 'Mixins',
                collapsable: false,
                children: [
                    'mixins/crop',
                    'mixins/customProps',
                    'mixins/depth',
                    'mixins/gameObject',
                    'mixins/origin',
                    'mixins/physics',
                    'mixins/transform',
                ],
            },
        ]
    }
}