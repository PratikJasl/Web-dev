async function getUserData(){
    try {
        console.log("Fetching user data...");

        const response = await fetch('https://jsonplaceholder.typicode.com/user/1');

        if(!response.ok){
            throw new Error("HTTP error! Status:", response.status);
        }

        const userData = await response.json();
        console.log("User Data Fetched:", userData);
        return userData;
    } catch (error) {
        console.error("failed to fetch user data, with error:", error.message);
    }
}

getUserData();