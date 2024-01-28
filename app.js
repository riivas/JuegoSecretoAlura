let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 0;
let listaNumSorteados = [];
let numeroMaximo = 0;
let nivel = 0;
let nivelAnterior = 0;

function activarBotones(elemento){
    document.getElementById(elemento).removeAttribute('disabled');
}

function desactivarBotones(elemento){
    document.getElementById(elemento).setAttribute('disabled', true);
}

function escogerDificultad(){
    nivel = parseInt(prompt('Escoge la dificultad del juego: \n1. Fácil \n2. Medio \n3. Difícil'));

    if(nivelAnterior != nivel){
        listaNumSorteados = [];
    }

    switch(nivel){
        case 1:
            intentosMaximos = 4;
            numeroMaximo = 10;
            break;
        case 2:
            intentosMaximos = 7;
            numeroMaximo = 100;
            break;
        case 3:
            intentosMaximos = 10;
            numeroMaximo = 1000;
            break;
        default:
            escogerDificultad();
    }

    nivelAnterior = nivel;
    return;
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    
    console.log(numeroGenerado);
    console.log(listaNumSorteados);

    if(listaNumSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros');
    } else {
        if(listaNumSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionsIniciales(){
    escogerDificultad();
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}.`);
    desactivarBotones('reiniciar');
    activarBotones('intentar');
    numeroSecreto = generarNumeroSecreto();
    limpiarCaja();
    intentos = 1;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego(){
    //Limpiar caja
    //Indicar msg de intervalo de números
    //generar nuevo número aleatorio
    //inicializar número intentos
    //deshabilitar/habilitar botones
    condicionsIniciales();
}

function verificarIntento(){
 
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(`Intenos máximos: ${intentosMaximos}`);
    console.log(`Intentos: ${intentos}, numeroUsuario: ${numeroDeUsuario}`);

    //El usuario acertó el número.
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}.`);
        activarBotones('reiniciar'); 
        desactivarBotones('intentar');
        limpiarCaja();
        return;
    } else {
        //El usuario no ha acertado.
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('h1', `Intento ${intentos} de ${intentosMaximos}`);
            asignarTextoElemento('p', 'Número secreto es menor.');
        } else {
            asignarTextoElemento('h1', `Intento ${intentos} de ${intentosMaximos}`);
            asignarTextoElemento('p', 'Número secreto es mayor');
        }
        limpiarCaja();
    }

    //El usuario no acertó el número en los intentos dados.
    if(intentos === intentosMaximos){
        asignarTextoElemento('h1', '¡P E R D I S T E!');
        asignarTextoElemento('p', `No acertaste el número, era ${numeroSecreto}`);
        activarBotones('reiniciar');  
        desactivarBotones('intentar');
        limpiarCaja();
    }

    intentos++; 
    

    return;
}

condicionsIniciales();
