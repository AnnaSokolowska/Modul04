const filter = (arr, key, val) => {
    const result = [];
arr.forEach(element => {
  for (key in element) {
    if (element[key] === val) {
        result.push(element);
    }
  }
});
return result;
}

 export default filter;
let objects = [
    { login: 'Maks', email: 'maks@maks.com', company: 'METHED' },
    { login: 'Methed', email: 'info@methed.ru', company: 'METHED' },
    { login: 'Humidor', email: 'tomato@pomodoro.com', company: 'cucumber' }
];
const f = filter(objects, 'email', 'info@methed.ru')
console.log(f);
const a = filter(objects, 'company', 'METHED'); 
console.log(a);