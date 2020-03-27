/*
*Creating a promise already resolved promises
mostly used when writing a unit test
*/
//Calling the resolve method
        // const p = Promise.resolve({id:1});
        // p.then((result) =>{
        // console.log(result);
        // });
//Call reject method
const p = Promise.reject(new Error('Reason for the rejection'));
p.catch((error) =>{
console.log(error);
});






