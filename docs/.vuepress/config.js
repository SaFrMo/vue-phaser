module.exports = {
    title: 'Vue-Phaser',
    description: 'Vue 2 wrapper for Phaser',
    port: 3000,
    themeConfig: {
        sidebar: [
            ['/', 'Introduction'],
            {
                title: 'Examples',
                collapsable: false,
                children: [
                    'examples/sprites'
                ]
            },
            // {
            //     title: 'Components',
            //     collapsable: false,
            //     children: [
            //         'components/PhaserGame'
            //     ],
            // },
        ]
    }
}