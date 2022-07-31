const validator = require('validator');
const readline = require('readline');


// make a function to input a name, number and email with validator in one function
function inputAll(name, number, email) {
    if (validator.isEmpty(name)) {
        console.log('Name is empty');
        return false;
    }
    if (validator.isEmpty(number)) {
        console.log('Number is empty');
        return false;
    }
    if (validator.isEmpty(email)) {
        console.log('Email is empty');
        return false;
    }
    if (!validator.isLength(name, { min: 3, max: 20 })) {
        console.log('Name is not valid');
        return false;
    }
    if (!validator.isLength(number, { min: 10, max: 12 })) {
        console.log('Number is not valid');
        return false;
    }
    if (!validator.isEmail(email)) {
        console.log('Email is not valid');
        return false;
    }
    // return closerl();
    return
    return true;
}


// rl.question('Name: ', (name) => {
//     rl.question('Phone: ', (no) => {
//         const contact = {
//             name: name,
//             no: no
//         }

//         const file = fs.readFileSync('./contacts.json', 'utf8');
//         const data = JSON.parse(file);
        
//         data.push(contact);

//         fs.writeFileSync('./contacts.json', JSON.stringify(data));

//         console.log(`Contact Added!`);

//         console.log(`Hello ${name}, Your Phone Number Is ${no}`);
//         rl.close();
//     }
//     );
// })

module.exports.inputAll = inputAll;