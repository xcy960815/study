onmessage = function (event) {
    //  在worker里面 加载别的js importScripts

    console.log(this);
    let total = 1;
    for (let i = 0; i < 5000000000; i++) {
        // console.log(i);
        total += i;
    }
    postMessage(total);
}