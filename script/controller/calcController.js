class CalcController {

    constructor(){
        
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("text#display");
        this._currentDate;
        this._dateEl = document.querySelector("text#data");
        this._timeEl = document.querySelector("text#hora");
        this._operation = []

        this.initialize();  
        this.initButtonsEvents();
        this.getLastOperation();
        
        
    }


    /* metodos GET e SET -  função p/ acessar e atribuir valores nos elementos do display da calculadora


    GET = função p/ acessar o valor no display da calculadora. */
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    /* SET = função p/ atribuir valor no display da calculadora. */
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }


    get currentDate(){
        return  new Date();
    }

    set currentDate(value){
        this._currentDate = value;

    }


    get displayDate(){
        return this._dateEl.innerHTML;


    } 
    set displayDate(value){
        return this._dateEl.innerHTML = value;
        

    }


    get displayTime(){
        return this._timeEl.innerHTML;

    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    initialize(){
        this.setDisplayDateTime()

        setInterval(()=>{

           this.setDisplayDateTime()

        }, 1000);


    }
    /* criação de um metodo o qual esta disposto a ouvir e acionar mais de um evento em prol da otimização do codigo, pode ser util em diversos code. */

    addEventListenerAll(el, events, fn){
        
        let myArray = events.split(" ")
        

        myArray.forEach(evento  => {
            
            el.addEventListener(evento, fn, false)
        })
        



    }

    /* botao clear all calculadora */
    clearAll(){
        this._operation = [];

    }
    /* botao clear entry calculadora */
    clearEntry(){
        this._operation.pop();
    }

    /* metodo o qual explicita ERROR no display caso nao houver a execucação de nenhum  botao ou algum erro na leitura */
    setError(){
        this.displayCalc = 'ERROR'

    }
    /* seleciona o ultimo valor do array dos botoes clicados */
    getLastOperation(){

       return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){
            return  this._operation[this._operation.length - 1] = value;
      
        
    }



    isOperator(value){
        return( ["+", "-", "*", "/","%"].indexOf(value) > -1)

    }

    pushOperator(value){
        this._operation.push(value)

        if(this._operation.length > 3){

            this.calc();
        }
    }
    // função a qual é acionada quando a presença de 3 el no array (2numeros e um operador), realizando o calculo e armazenando o resultado.
    calc(){
            

            let last = this._operation.pop() // armazena o ultimo operador digitado para jogar na proxima operação

            if(this.isOperator(last)){


                let firstOp = this._operation.join(" ")
                let result = eval(firstOp)
    
                this._operation = [result, last]; // novo array com a primeira op realizada e o sinal digitado pronto para a proxima operação
    
    
                console.log(result)
                console.log(this._operation)
                this.setLastNumberToDisplay()
            }
            else if (last = "="){
                let firstOp = this._operation.join(" ")
                let result = eval(firstOp)
    
                this._operation = [result];
                console.log(result)
                console.log(this._operation)
                this.setLastNumberToDisplay()

            }


    }

    setLastNumberToDisplay(){
        let lastNumber;
        for(let i= this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){
                 lastNumber = this._operation[i]
                break;

            }

        }
        this.displayCalc = lastNumber
            
        

    }

    /* função a qual adiciona os valores numericos clicados á um atributo(array) = futura operação */
    addOperation(value){
        
        // verificação do ultimo valor clicado
        // array vazio = valor undefined o qual torna se false no isNaN caindo no else.
        if(isNaN(this.getLastOperation())){
            //caso for string
           if(this.isOperator(value)){
            //this.operator = metodo conferidor se o value passado é ou nao um operador
            // caso for apertado operador em seguida de operador sera substituido 
            this.setLastOperation(value)
            
            

           }
           else if(isNaN(value)){
                // caso for apertado ponto ou igual

           }
           else{
                //caso for o primeiro numero apertado/adicionado ao array
                this.pushOperator(value)
                this.setLastNumberToDisplay();

       
           }
            
        }
        
        else{

            if(this.isOperator(value)){
                //caso o array estiver sem operadores aqui esta a inclusao do primeiro, o resto sera substituição de operadores o qual esta codado na funçao acima
                this.pushOperator(value);


            }

            else if(value.toString() == "="){
                this.pushOperator(value)
                
           

            }
            else{

                // caso for numero apertado
                let numberconcatened =  this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(numberconcatened))
                //att do display
                this.setLastNumberToDisplay();
    
              
            }
        }
    }

    /* metodo o qual executa e chama tanto a função dos name-buttons (operações) quanto verifica se é um numero e executa a função addOperation() */
    execBtn(value) {
        
        switch (value) {
        
            case 'ac':
                this.clearAll();
                break
               
            

            case 'ce':
                this.clearEntry();
                break
            

            case 'ponto':
                this.addOperation(".")
                break


            case 'soma':
                this.addOperation("+")
               break
            

            case 'subtracao':
                this.addOperation("-")
                
                break

            case 'multiplicacao':
                this.addOperation("*")
                break
            

            case 'divisao':
                this.addOperation("/")
                
                break

            case 'porcento':
                this.addOperation("%")
                
                break

            case 'igual':
                this.addOperation("=")
                break
            
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value))
                break

            default:
                this.setError()
    
        }


    }


    /* metodo o qual escuta atraves de eventos os click nos botoes da calc e chama a function execBtn() para a execução desses. */
    initButtonsEvents(){
       let buttons = document.querySelectorAll("#buttons > g, #parts > g");
     
        
        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, 'click drag', (e) => {

               let textBtn = btn.className.baseVal.replace('btn-', "")
               this.execBtn(textBtn)
            })
        

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = 'pointer'
            })
       });


      
    }


    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

}