// use validator
// const func = require('./functions.js');
const fs = require('fs');
const readline = require('readline');
const input = require('./insert.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// console.log(func.printName('John'));
// console.log(func.age('12'));

// console.log(func.printNilai(func.nilai.basdat, func.nilai.pemrograman, func.nilai.jaringan, func.nilai.rpl, func.nilai.mtk));

// run rl.question
// console.log(readline.rl.question());
// run inputAll()

// make input name, number and email with rl
rl.question('Name: ', (name) => {
    rl.question('Phone: ', (no) => {
        rl.question('Email: ', (email) => {
            const contact = {
                name: name,
                no: no,
                email: email
            }

            input.inputAll(name, no, email)

            const file = fs.readFileSync('./contacts.json', 'utf8');
            const data = JSON.parse(file);

            data.push(contact);

            fs.writeFileSync('./contacts.json', JSON.stringify(data));

            console.log(`Contact Added!`);

            console.log(`Hello ${name}, Your Phone Number Is ${no} And Your Email Is ${email}`);
            rl.close();
            return;
        }
        );
    }
    );
}
);
