// TODO: use full events list instead?
// import Phaser from 'phaser'
// console.log(Phaser.Input.Events)


const events = [
    // pointers
    'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    // drag
    'dragstart', 'drag', 'dragend',
    // drop
    'drop', 'dragenter', 'dragover', 'dragleave'
]


export default {
    props: {
        setInteractive: {
            type: [Boolean, Array],
            default: false
        },
        interactiveListeners: {
            type: Array,
            default: () => events
        }
    },
    mounted() {
        if (this.setInteractive) {
            // enable interactivity
            const args = Array.isArray(this.setInteractive) ? this.setInteractive : []
            this.target.setInteractive(...args)
            console.log(this.target)

            // add listeners
            this.interactiveListeners.forEach(evt => {
                this.target.on(evt, () => alert('test'))
                console.log('adding listener for', evt, this.target.on)
            })
        }
    },
    methods: events.reduce((acc, curr) => {
        acc[curr] = (...evtData) => {
            console.log(evtData)
            this.$emit(curr, evtData)
        }
        return acc
    }, {})
}