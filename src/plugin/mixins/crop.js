import { arraysAreEqual } from "../libs/utils"

export default {
    props: {
        crop: {
            type: Array,
            default: null
        },
    },
    mounted() {
        this.refreshCrop()
    },
    methods: {
        refreshCrop() {
            // ignore if no crop
            if (this.crop === null || !this.target) return

            // if any values are 0<=n<1, treat them as percentages
            const finalCrop = this.crop.map((v, i) => {
                if (v >= 0 && v <= 1) {
                    const reference = i === 0 || i === 2
                        ? this.target.width
                        : this.target.height
                    return reference * v
                }

                return v
            })

            this.target.setCrop(...finalCrop)
        }
    },
    watch: {
        crop(newVal, oldVal) {
            if (!arraysAreEqual(newVal, oldVal)) {
                this.refreshCrop()
            }
        }
    },
}