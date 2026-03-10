async function fetchUserData(){
        console.time("SequentialFetchTime");

        //Fetch user 1 details.
        console.log("Fetching User 1...");
        const user1Promise = await fetch('https://jsonplaceholder.typicode.com/users/1'); //300ms
        const response1 = await user1Promise.json();

        //Fetch user 2 details.
        console.log("Fetching User 2...");
        const user2Promise = await fetch('https://jsonplaceholder.typicode.com/users/2'); //300ms
        const response2 = await user2Promise.json();

        //Fetch user 3 details.
        console.log("Fetching User 3...");
        const user3Promise = await fetch('https://jsonplaceholder.typicode.com/users/3'); //300ms
        const response3 = await user3Promise.json();

        console.timeEnd("SequentialFetchTime");

        const allResponse = [response1, response2, response3]
        return allResponse;
} //TOTAL TIME: 757ms

//fetchUserData();


async function fetchMultipleUsers() {
    try {
        console.time("FetchTime"); 

        // 1. fetch() returns a Promise. 
        // By NOT putting 'await' in front, we let them all start running in the background immediately!
        const user1Promise = fetch('htt://jsonplaceholder.typicode.com/user/1');
        const user2Promise = fetch('https://jsonplaceholder.typicode.com/users/2');
        const user3Promise = fetch('https://jsonplaceholder.typicode.com/users/3');
        
        // 2. We pass those 3 pending Promises into Promise.all()
        // Now we use 'await' to pause the function until ALL THREE are done.
        const [response1, response2, response3] = await Promise.allSettled([
            user1Promise, 
            user2Promise, 
            user3Promise
        ]);

        // 3. .json() ALSO returns a Promise! So we can parse all 3 simultaneously.
        const usersData = await Promise.allSettled([
            response1.json(),
            response2.json(),
            response3.json()
        ]);

        console.log("All users fetched:", usersData);
        console.timeEnd("FetchTime"); 

    } catch (error) {
        console.error("One of the fetches failed!", error);
    }
} //440ms

//fetchMultipleUsers();


async function fetchMultipleUsersWithSettled() {
    try {
        console.time("FetchTime"); 

        // 1. fetch() returns a Promise. 
        // By NOT putting 'await' in front, we let them all start running in the background immediately!
        const user1Promise = fetch('https://jsonplaceholder.typicode.com/users/1');
        const user2Promise = fetch('https://jsonplaceholder.typicode.com/users/2');
        const user3Promise = fetch('https://jsonplaceholder.typicode.com/users/3');
        
        // 2. We pass those 3 pending Promises into Promise.all()
        // Now we use 'await' to pause the function until ALL THREE are done.
        const response = await Promise.allSettled([
            user1Promise, 
            user2Promise, 
            user3Promise
        ]);

        // 3. .json() ALSO returns a Promise! So we can parse all 3 simultaneously.
        const successfulResponses = response.filter(result => result.status === 'fulfilled').map(result => result.value.json());

        const finalResponse = await Promise.all(successfulResponses);

        console.log("All users fetched:", finalResponse);
        console.timeEnd("FetchTime"); 

    } catch (error) {
        console.error("One of the fetches failed!", error);
    }
} //421ms

fetchMultipleUsersWithSettled();