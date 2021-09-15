test('hello world', () => {

});

// test('failed one ', () => {
//     throw new Error('failure');
// });


test('Async test demo', (done) => {   // done can be anything but it need to be their and called if using async function 
    // else it will run and give pass as output without waiting for async functions 
    setTimeout(() => {
        except(1).toBe(1);
        done();
    }, 2000)
});