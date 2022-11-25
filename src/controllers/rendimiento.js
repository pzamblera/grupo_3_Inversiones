let x = 500;
let random1 = Math.random()
let signo = 0;   
if(random1 > 0.49){
signo =  1;
}else{
signo = -1;
};
let multiplicador = (Math.random() * (10 - 1)) + 1;
let multiplicador2 = (Math.random() * (30 - 10)) + 1;
let multiplicador3 = (Math.random() * (100 - 1)) + 1;
let rendimiento= x * (multiplicador/100) * signo;
let montofinal= x+rendimiento
console.log(random1);
console.log(signo);
console.log(x);
console.log(multiplicador);
console.log(multiplicador2);
console.log(multiplicador3);
console.log(rendimiento);
console.log(montofinal);
