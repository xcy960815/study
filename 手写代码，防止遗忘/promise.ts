



class MyPromise {
  private resolveCallbacks: Array<Function> = []
  private rejectCallbacks: Array<Function> = []
  private status: "pending" | "resolve" | "reject" = "pending"
  private resolveValue: any
  private rejectValue: any
  constructor(callback: (resolve: (resovleValue: any) => void, reject: (rejectValue: any) => void) => void) {
    callback(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value: any) {
    if (this.status === "pending") {
      this.status = "resolve"
      this.resolveValue = value
      this.resolveCallbacks.forEach(resolveCallback => resolveCallback())
    }

  }
  reject(value: any) {
    if (this.status === "pending") {
      this.status = "reject"
      this.rejectValue = value
      this.rejectCallbacks.forEach(rejectCallback => rejectCallback())
    }
  }
  then<RS = any, RJ = any>(resolveCallback?: (resolveValue: RS) => void, rejectCallback?: (rejectValue: RJ) => void) {
    if (this.status === "resolve" && resolveCallback) {
      resolveCallback(this.resolveValue)
    }
    if (this.status === "reject" && rejectCallback) {
      rejectCallback(this.rejectValue)
    }

    if (this.status == "pending") {
      resolveCallback && this.resolveCallbacks.push(() => resolveCallback(this.resolveValue))
      rejectCallback && this.rejectCallbacks.push(() => rejectCallback(this.rejectValue))
    }
  }

  static all(promiseList: Array<MyPromise>): MyPromise {
    const resultlist: Array<any> = []
    let resolveCount: number = 0
    let hasError = false
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise, index) => {
        promise.then(
          (resolveValue) => {
            resultlist[index] = resolveValue
            resolveCount++
            if (resolveCount === promiseList.length) {
              resolve(resultlist)
            }
          }, (rejectValue) => {
            if (!hasError) {
              reject(rejectValue)
              hasError = true
            }
          })
      })
    })
  }

  static race(promiseList: Array<MyPromise>): MyPromise {
    let hasError = false
    let hasSuccess = false
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise) => {
        promise.then((resolveValue) => {
          if (!hasError && !hasSuccess) {
            resolve(resolveValue)
            hasSuccess = true
          }
        },
          (rejectValue) => {
            if (!hasError) {
              reject(rejectValue)
              hasError = true
            }
          })
      })
    })
  }
}


const myPromise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了-2000")
  }, 2000)
})


const myPromise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了-1000")
  }, 1000)
})

const myPromise3 = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve("成功了-3000")
  // }, 3000)
  setTimeout(() => {
    reject("失败了-3000")
  }, 3000)
})

// MyPromise.all([myPromise1, myPromise2, myPromise3]).then(resolveValue => {
//   console.log("resolveValue", resolveValue);
// }, rejectValue => {
//   console.log("rejectValue", rejectValue);
// })

// MyPromise.race([myPromise1, myPromise2, myPromise3]).then(resolveValue => {
//   console.log("resolveValue", resolveValue);
// }, rejectValue => {
//   console.log("rejectValue", rejectValue);
// })

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     const resolveValue = {
//       code: 200,
//       data: [],
//       message: null
//     }
//     reject(resolveValue)
//   }, 2000)
// }).then((resolveValue: any) => {
//   console.log("resolveValue", resolveValue);

// }, (rejectValue: any) => {
//   console.log("rejectValue", rejectValue);
// })

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了")
  }, 2000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败了")
  }, 3000)
})

Promise.race([promise1, promise2]).then(resolveValue => {
  console.log("resolveValue", resolveValue);

}, rejectValue => {
  console.log("rejectValue", rejectValue);

})