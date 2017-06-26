var promises = [1, 2, 3, 4, 5].map((val) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(val)
            resolve(val)
        }, val * 1000)
    })
})

Promise.all(promises).then(() => {
    console.log('compelete!')
})