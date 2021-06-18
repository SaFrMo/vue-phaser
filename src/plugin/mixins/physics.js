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
    mounted() {
        // ignore if no physics
        if (!this.usePhysics) return

        // init physics
    },
    computed: {
        usePhysics() {
            return this.physicsName !== null
        }
    },
    methods: {
        initPhysics() {
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