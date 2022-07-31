function printName(name) {
    console.log(name);
    return 'Hello My Name Is' + name;
}

function age(age) {
    console.log(age);
    return 'My Age Is' + age;
}

const nilai = {
    basdat: 'A',
    pemrograman: 'B',
    jaringan: 'C',
    rpl: 'D',
    mtk: 'E'
}

function printNilai(basdat, pemrograman, jaringan, rpl, mtk) {
    console.log(basdat);
    console.log(pemrograman);
    console.log(jaringan);
    console.log(rpl);
    console.log(mtk);
    return 'Nilai Anda Adalah' + nilai.basdat + nilai.pemrograman + nilai.jaringan + nilai.rpl + nilai.mtk;
}



module.exports.printName = printName;
module.exports.age = age;
module.exports.nilai = nilai;
module.exports.printNilai = printNilai;
