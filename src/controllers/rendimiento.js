let x = 500;
let riesgo = 2;
let random1 = Math.random();
let signo = 0;   
if(random1 > 0.49){
signo =  1;
}else{
signo = -1;
};
let multiplicador = (Math.random() * (5 - 1));
let multiplicador2 = (Math.random() * (30 - 10));
let multiplicador3 = (Math.random() * (100 - 1));
let rendimiento= 0;
if(riesgo == 1){
    rendimiento = x * (multiplicador/100);
}else if(riesgo == 2){
    rendimiento = x * (multiplicador2/100) * signo;
}else{
    rendimiento = x * (multiplicador3/100) * signo;
   }
let montofinal= x+rendimiento
console.log(random1);
console.log(signo);
console.log(x);
console.log(multiplicador);
console.log(multiplicador2);
console.log(multiplicador3);
console.log(rendimiento);
console.log(montofinal);
