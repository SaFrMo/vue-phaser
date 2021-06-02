export default {
    props: {
        physicsKey: {
            type: String,
            default: ''
        },
        overlapWith: {
            default: () => []
        },
        processCallback: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            finalPhysicsKey: ''
        }
    },
    mounted() {
        // add to physics dictionary
        this.finalPhysicsKey = this.physicsKey || `obj${Object.keys(this.$physicsDictionary).length}`
        this.$physicsDictionary[this.finalPhysicsKey] = this.target

        // go through objects we want to overlap
        const overlapQueue = Array.isArray(this.overlapWith) ? this.overlapWith : [this.overlapWith]
        overlapQueue.forEach(key => {
            this.updateOverlapQueue(key)
        })

        // one final check to see if anything has been waiting for us
        this.updateOverlapQueue()
    },
    methods: {
        updateOverlapQueue(otherObjectKey = null) {
            // save a copy of the other physics object, which will either be
            // (a) the already-instantiated other object, pulled directly from the dictionary, or
            // (b) the object that saved itself to this key's name, knowing that we'd eventually spawn
            const otherComponent = this.$physicsDictionary[otherObjectKey] || this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[this.finalPhysicsKey]

            // if the other object is present, run setup
            if (otherComponent) {
                // prep for callback functions
                const { physics } = this.target.scene

                const args = {
                    object1: this.target,
                    object2: otherComponent.target,
                    key: otherObjectKey || this.finalPhysicsKey
                }
                physics.add.overlap(this.target, otherComponent.target,
                    // overlap event
                    () => {
                        this.$emit('overlap', args)
                        otherComponent.$emit('overlap', args)
                    },
                    // process event
                    () => {
                        return (otherComponent.processCallback ? otherComponent.processCallback(args) : true)
                            && (this.processCallback ? this.processCallback(args) : true)
                    }
                )

                delete this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[this.finalPhysicsKey]
            } else if (otherObjectKey !== null) {
                // otherwise, add other object key to queue,
                // knowing that it'll eventually spawn
                this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[otherObjectKey] = this
            }
        }
    }
}