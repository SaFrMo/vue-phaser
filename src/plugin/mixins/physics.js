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
        this.initPhysics()
    },
    computed: {
        usePhysics() {
            return this.physicsName !== null
        }
    },
    methods: {
        initPhysics() {
            if (!this.target) return

            // save name
            this.target.name = this.physicsName

            // processing queue
            const toProcess = [
                { methodName: 'addCollider', source: this.collideWith },
                { methodName: 'addOverlap', source: this.overlapWith },
            ]

            // for each kind of interaction we need to process (collision, overlap, etc?)...
            toProcess.forEach(({ methodName, source }) => {
                // ...check each name inside the relevant array
                source.forEach(otherName => {
                    // ...listen for when any instances of that name is added to the world...
                    this.$physics.world.addListener('added', evt => {
                        // 'evt' will be the newly-added physics body
                        if (evt.name === otherName) {
                            // console.log('trying to add', method, 'listener for', evt)
                            this.createCollider(evt, methodName)
                        }
                    })

                    // ...and handle any existing instances
                    const existingOthers =
                        // individual bodies
                        this.$physics.world.bodies.entries
                            .map(body => body.gameObject)
                            .filter(go => go.name === otherName)

                    // groups
                    const existingGroup = this.$groups[otherName]
                    if (existingGroup && existingGroup.type === "PhysicsGroup") {
                        existingOthers.push(existingGroup)
                    }

                    existingOthers.forEach(other => {
                        this.createCollider(other, methodName)
                    })
                })
            })

            // prep body info
            this.refreshBodySize()

            // flag that we've been added to the world
            this.$physics.world.emit('added', this.target)
        },
        createCollider(otherTarget, methodName = 'addCollider') {
            // in each of these callbacks, the arguments are:
            // * object1: the first object that actually collided/overlapped
            // * object2: the second object that actually collided/overlapped
            // * self: the physics container of one object (can be a sprite, ArcadeSprite, PhysicsGroup, etc)
            // * other: " of the other object

            this.$physics.world[methodName](this.target, otherTarget,
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