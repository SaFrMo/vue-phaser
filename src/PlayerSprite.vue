<template>
    <phaser-sprite
        :x="x"
        :y="y"
        physics-name="player"
        :collide-with="['42']"
        sprite-key="space"
        display-width="50"
        display-height="50"
        collide-world
    />
</template>

<script>
export default {
    data() {
        return {
            x: 400,
            y: 200,

            xSpeed: 0,
            ySpeed: 0,
        }
    },
    mounted() {
        this.update()

        window.addEventListener('keydown', (evt) => {
            if (evt.key === 'w') {
                this.ySpeed = -1
            } else if (evt.key === 's') {
                this.ySpeed = 1
            } else if (evt.key === 'a') {
                this.xSpeed = -1
            } else if (evt.key === 'd') {
                this.xSpeed = 1
            }
        })
        window.addEventListener('keyup', (evt) => {
            if (evt.key === 'w') {
                this.ySpeed = 0
            } else if (evt.key === 's') {
                this.ySpeed = 0
            } else if (evt.key === 'a') {
                this.xSpeed = 0
            } else if (evt.key === 'd') {
                this.xSpeed = 0
            }
        })
    },
    methods: {
        onOverlap(args) {
            console.log(args)
        },
        update() {
            requestAnimationFrame(this.update)

            this.x += this.xSpeed * 0.01666 * 100
            this.y += this.ySpeed * 0.01666 * 100
        },
    },
}
</script>