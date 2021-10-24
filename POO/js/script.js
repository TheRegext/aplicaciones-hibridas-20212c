// Quiero que hagan una clase que me permita crear objetos temporizadores
// tick, que inicia en cero: 
// metodos: 
//  next -> aumenta un tick


/// EJS
class Colorize {
    // Constructor
    constructor(){
        // Propiedades
        this.color = 'red'
    }

    // Metodos
    cambiarColor(){
        this.color = 'blue'
    }

    setColor(color){
        this.color = color
    }

    getColor(){
        return this.color
    }
}

// ColorizeMagic tiene todo lo de la clase Colorize 
// Mas lo que se implemente en ColorizeMagic 
// esto gracias a extends que es la forma de heredar entre clases

class ColorizeMagic extends Colorize{
    constructor(){
        super()
        this.color = 'green'
        this.transition = '2s'
    }

    addTransition(){
        this.transition = '5s'
    }
}



document.addEventListener('DOMContentLoaded', function(){
    const cal1 = new Calculadora(document.getElementById('txtResultado'))



    const $resultado = document.getElementById('txtResultado')
    const $numero = document.getElementById('txtNumero')
    
    const $suma = document.getElementById('btnAdd')
    const $resta = document.getElementById('btnSub')

    $resultado.value = 0
    
    $suma.onclick = function(){
        $resultado.value = parseInt($resultado.value) + parseInt($numero.value)
    }

    $resta.onclick = function(){
        $resultado.value = parseInt($resultado.value) - parseInt($numero.value)
    }
})