//Суперпозиция
{
const {
    pow, 
    sqrt,
} = Math;
const add = (a, b) => a + b;
const rem = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const res1 = pow(6 /3, 2) + ((sqrt(49) * 3) -1);
// console.log('res1:', res1);

const res2 = add(pow((div(6, 3)), 2), rem((mul(sqrt(49), 3)), 1));
// console.log('res2', res2);

}
{
const compose = (f, g) => x => f(g(x));
const upperFirst = word => word[0].toUpperCase() + word.slice(1);
const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
const lower = s => s.toLowerCase();

const capitalize = compose(upperCapital, lower);

const str = 'ЛеСкин максим ЭДУАРДОВИЧ';
// console.log(capitalize(str));

}
{
    const compose = (...fns) => x =>  fns.reduceRight((v, f) => f(v), x);

    const upperFirst = word => word[0].toUpperCase() + word.slice(1);
    const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
    const lower = s => s.toLowerCase();
    const trim = s => s.trim();

    const capitalizeTrim = compose(upperCapital, lower, trim);

    const str = '  ЛесКин максим ЭДУАРДОВИЧ  ';
    console.log(capitalizeTrim(str));
}

{
    const compose = (...fns) => x => {
        const last = fns.length - 1;
        let res = x;
        for (let i = last; i >= 0; i--) {
            res = fns[i](res);
        }
        return res;
    };
    const upperFirst = word => word[0].toUpperCase() + word.slice(1);
    const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
    const lower = s => s.toLowerCase();
    const trim = s => s.trim();
    const capitalizeTrim = compose(upperCapital, lower, trim);

    const str = '  ЛесКин максим ЭДУАРДОВИЧ  ';
    console.log(capitalizeTrim(str));
}



{
const upperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const repeat = str => `${str} `.repeat(3);

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const withСompose = compose(
  repeat,
  exclaim,
  upperCase
);

// console.log(withСompose("I love coding"));
}
{
const upperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const repeat = str => `${str} `.repeat(3);

const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const withСompose2 = pipe(
  upperCase,
  exclaim,
  repeat
);

// console.log(withСompose2("I love coding"));
}
{
const map = cb => array => array.map(cb);

const arr = [1, 2, 3, 4, 5];
const double = n => n * 2;

const withDouble = map(double);

// console.log(withDouble(arr)); // [2, 4, 6, 8, 10]
// console.log(withDouble([2, 4, 6, 8, 10]));
}
{
const map = cb => array => array.map(cb);

const prop = key => obj => obj[key];

const getName = prop("name");

const people = [
  { name: "Alex" },
  { name: "Julia" },
  { name: "Leo" },
  { name: "Den" }
];

//console.log(map(getName)(people));
}
{
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const lowerCase = str => str.toLowerCase();
const join = separator => xs => xs.join(separator);
const map = fn => xs => xs.map(fn);
const split = pattern => str => str.split(pattern);

const bookTitles = [
  "JavaScript The Good Parts",
  "You Don’t Know JS",
  "Eloquent JavaScript"
];

const slugify = map(
  compose(
    join("-"),
    split(" "),
    lowerCase
  )
);

const slugs = slugify(bookTitles);

//console.log(slugs);
}

{
    const max = (x, y) => Math.max(x, y);
    const createMax = x => y => max(x, y);// замыкание

    const one = createMax(5);
    const two = createMax(10);

  //  console.log(one(12));
  //  console.log(two(15));
}
{
const max = (x, y) => Math.max(x, y); // стрелочная функция

const one = y => max(10, y);
const two = y => max(12, y);

// console.log(one(12));
// console.log(two(15));

}

{
    const max = (x, y) => Math.max(x, y);// bind
    const one =  max.bind(null, 10);
    const two =  max.bind(null, 12);
    
    //console.log(one(12));
    //console.log(two(15));
     
    
}
{// частичное применение
const partial = (fn, ...rest) => (...args) => fn(...rest, ...args);

const max = (x, y, z) => Math.max(x, y, z);

//const one = partial(max, 15);
//const two = partial(one, 12);
//const three = two(31);
//console.log(three);

//const one = partial(max, 12, 15);
//const two = one(4);
//console.log(two);
//можно передать больше параметров, но тогда они не попадут в функцию
//если меньше трех то будет ошибка
}
{
    //карирование
    /* передаем в функцию чистую функцию и параметры или не передаем параметры 
     return par.length ? curried(...par) : curried;
     тут у нас проверка если нет параметрова то возвращаем curried 
     если есть то передаем их в фунцию curried(...par)  и применяем 
     частичное применение   curry(fn.bind(null, ...args)) но не вызываем функцию 
     проверяем количество аргументов  fn.lengths > args.length
     если их больше, то мы карируем   curry(fn.bind(null, ...args))
     если их меньше то вызываем с меньшим количеством аргументов fn(...args) */
const curry = (fn, ...par) => {
    const curried = (...args) => (
        fn.length > args.length ? 
        curry(fn.bind(null, ...args)) :
        fn(...args)
    );
    return par.length ? curried(...par) : curried;
    };
    const sum = (a, b, c, d) => a + b + c + d;
    const sumCurry = curry(sum);

   // console.log(sumCurry(1, 2, 3, 4));
  //  console.log(sumCurry(1, 2, 3));
   // console.log(sumCurry(1)(2, 3, 4));
  //  console.log(sumCurry(1, 2)(3, 4));
   // console.log(sumCurry(1)(2)(3, 4));
  //  console.log(sumCurry(1)(2)(3)(4));
   // console.log(sumCurry(1, 2, 3)(4));

   const fn = () => {
    console.log('Тестим таймер');
   };

   const timeout = (interval, fn) => setTimeout(fn, interval);

   const timer = curry(timeout);
  // timer(2000)(fn);

   const timer3s = timer(3000);
  // timer3s(fn);
  // timer3s(() => {
 //   console.log('Привет мир');
  // })
}