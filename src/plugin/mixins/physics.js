export default {
    props: {
        bodyScale: {
            type: [String, Number, Object],
            default: 1
        },
        collideWith: {
            default: () => []
        },
        overlapWith: {
            default: () => []
        },
        physicsName: {
            type: String,
            default: null
        },
        processCallback: {
            type: Function,
            default: null
        },
    },
    // data() {
    //     return {
    //         finalPhysicsKey: ''
    //     }
    // },
    mounted() {
        // add to physics dictionary
        // this.finalPhysicsKey = this.physicsName || `obj${Object.keys(this.$physicsDictionary).length}`
        // this.$physicsDictionary[this.finalPhysicsKey] = this.target

        // // go through objects we want to overlap
        // const overlapQueue = Array.isArray(this.overlapWith) ? this.overlapWith : [this.overlapWith]
        // overlapQueue.forEach(key => {
        //     this.updateOverlapQueue(key)
        // })

        // // one final check to see if anything has been waiting for us
        // this.updateOverlapQueue()

        // ignore if no physics
        if (!this.usePhysics) return

        // save name
        this.target.name = this.physicsName

        // processing queue
        const toProcess = [
            { method: 'addCollider', source: this.collideWith },
            { method: 'addOverlap', source: this.overlapWith },
        ]

        // for each kind of interaction we need to process (collision/overlap)...
        toProcess.forEach(({ method, source }) => {
            // ...check each name inside the relevant array
            source.forEach(otherName => {
                // ...listen for when any instances of that name is added to the world...
                this.$physics.world.addListener('added', evt => {
                    // console.log(this.physicsName, 'just saw that', evt, 'was added')
                    // 'evt' will be the newly-added physics body
                    if (evt.name === otherName) {
                        // console.log('trying to add', method, 'listener for', evt)
                        this.addListener(evt, method)
                    }
                })

                // ...and handle any existing instances
                const existingOther = this.$physics.world.bodies.entries.map(body => body.gameObject).find(go => go.name === otherName)
                if (existingOther) {
                    this.addListener(existingOther, method)
                }
            })
        })



        // prep body info
        this.refreshBodySize()

        // flag that we've been added to the world
        this.$physics.world.emit('added', this.target)
    },
    computed: {
        usePhysics() {
            return this.physicsName !== null
        }
    },
    methods: {
        addListener(otherTarget, method = 'addCollider') {
            // in each of these callbacks, the arguments are:
            // * object1: the first object that actually collided/overlapped
            // * object2: the second object that actually collided/overlapped
            // * self: the physics container of one object (can be a sprite, ArcadeSprite, PhysicsGroup, etc)
            // * other: " of the other object

            this.$physics.world[method](this.target, otherTarget,
                // overlap event
                (object1, object2) => {
                    const callbackArgs = { object1, object2, self: this.target, other: otherTarget }
                    this.$emit('overlap', callbackArgs)
                    // otherComponent.$emit('overlap', callbackArgs)
                },
                // process event
                (object1, object2) => {
                    const processArgs = { object1, object2, self: this.target, other: otherTarget }
                    return this.processCallback ? this.processCallback(processArgs) : true
                }
            )
        },
        // updateOverlapQueue(otherObjectKey = null) {
        //     // save a copy of the other physics object, which will either be
        //     // (a) the already-instantiated other object, pulled directly from the dictionary, or
        //     // (b) the object that saved itself to this key's name, knowing that we'd eventually spawn
        //     const otherComponent = this.$physicsDictionary[otherObjectKey] || this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[this.finalPhysicsKey]

        //     // if the other object is present, run setup
        //     if (otherComponent) {
        //         // prep for callback functions
        //         const { physics } = this.target.scene

        //         const args = {
        //             overlap1: this.target,
        //             overlap2: otherComponent.target,
        //             key: otherObjectKey || this.finalPhysicsKey
        //         }
        //         physics.add.overlap(this.target, otherComponent.target,
        //             // overlap event
        //             (object1, object2) => {
        //                 const callbackArgs = { object1, object2, ...args }
        //                 this.$emit('overlap', callbackArgs)
        //                 otherComponent.$emit('overlap', callbackArgs)
        //             },
        //             // process event
        //             (object1, object2) => {
        //                 const processArgs = { object1, object2, ...args }
        //                 return (otherComponent.processCallback ? otherComponent.processCallback(processArgs) : true)
        //                     && (this.processCallback ? this.processCallback(processArgs) : true)
        //             }
        //         )

        //         delete this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[this.finalPhysicsKey]
        //     } else if (otherObjectKey !== null) {
        //         // otherwise, add other object key to queue,
        //         // knowing that it'll eventually spawn
        //         this.$physicsDictionary.OVERLAP_CALLBACK_QUEUE[otherObjectKey] = this
        //     }
        // },
        refreshBodySize() {
            if (!this.target.body) {
                return
            }

            // set up body size
            const width = this.target.body.width * (this.bodyScale.x || this.bodyScale.width || this.bodyScale)
            const height = this.target.body.height * (this.bodyScale.y || this.bodyScale.height || this.bodyScale)
            this.target.body.setSize(width, height)
        }
    },
    watch: {
        bodyScale() {
            this.refreshBodySize()
        }
    }
}