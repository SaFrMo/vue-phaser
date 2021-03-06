export const wait = (time = 1000) => new Promise(res => setTimeout(res, time))

export const waitFor = async function (host, target, opts = {}) {
    const split = target.split('.')
    let latest = host
    for (let i = 0; i < split.length; i++) {
        try {
            latest = await waitForSingle(latest, split[i], opts)
        } catch (err) {
            throw new Error(err)
        }
    }

    return latest
}

export const waitForSingle = async function (host, target, opts = {}) {
    // set defaults
    opts = {
        timeout: 2000,
        interval: 100,
        ...opts
    }

    const lookFor = () => host[target]

    let checker

    const checkerPromise = () =>
        new Promise(res => {
            checker = setInterval(() => {
                const el = lookFor()
                if (el !== undefined) {
                    res(el)
                }
            }, opts.interval)
        })

    const timeout = wait(opts.timeout)

    const el = await Promise.race([checkerPromise(), timeout])

    clearInterval(checker)

    if (el) {
        return el
    } else {
        throw new Error(`couldn't find '${host}.${target}' in ${opts.timeout} ms`)
    }
}

export const arraysAreEqual = (a, b) => {
    return a && b && a.length === b.length && a.every((single, i) => {
        return single === b[i]
    })
}