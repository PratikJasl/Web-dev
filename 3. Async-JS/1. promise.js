const myFristPromise = new Promise((resolve, reject)=>{
    setTimeout(() => {
       resolve("order ready");
    }, 2000);
});

async function checkOrder(){
    try {
        const result = await myFristPromise;
        console.log(result);
        console.log("Is order ready?");
    } catch (error) {
        console.log(error);
    }
}

checkOrder();