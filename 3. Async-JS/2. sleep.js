// Build a sleep function

function sleep(time){
    const FirstPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
    return FirstPromise;
}

async function testSleep() {
    console.log("Hello...");
    await sleep(2000); // Should pause for 2 seconds
    console.log("...World!");
}

testSleep();