class CalcController {

    constructor(){
        
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("text#display");
        this._currentDate;
        this._dateEl = document.querySelector("text#data");
        this._timeEl = document.querySelector("text#hora");
        this._operation = []
        this._lastNumber = " "

        this.initialize();  
        this.initButtonsEvents();
        this.getLastOperation();
        this.setLastNumberToDisplay();
        
        
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
    // tempo e data na calculadora
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
        this.setLastNumberToDisplay()
        this._lastNumber = " "

    }
    /* botao clear entry calculadora */
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay()
    }

    /* metodo o qual explicita ERROR no display caso nao houver a execucação de nenhum  botao ou algum erro na leitura */
    setError(){
        this.displayCalc = 'ERROR'

    }

    addDotOp(){
        //metodo criado para a execução do botao ponto(decimal), o qual pode se debater com 3 situações, last op (undefined, numero, operador.)

        let lastOperation = this.getLastOperation();
       
        if(this.isOperator(lastOperation) || !lastOperation) {
            this._operation.push("0.")
            console.log("foiaqui")
        }
        else{
            this.setLastOperation(lastOperation.toString() + ".")

        }
        
        this.setLastNumberToDisplay();
    }

    /* seleciona o ultimo valor do array dos botoes clicados */
    getLastOperation(){

       return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){

        return  this._operation[this._operation.length - 1] = value;
      
    }

    // verifica se o valor é ou nao uma operação
    isOperator(value){
        return( ["+", "-", "*", "/","%"].indexOf(value) > -1)

    }

    EqualRepeatOp(){
         //execucação repetida do botao igual (retoma sempre a ultima op)
        let doubleequal = this._operation[0] + this._lastNumber
    
        let newvalue =  eval(doubleequal)

        this._operation[0] = newvalue
        return newvalue
    }

    PercentRepeatOp(){
        //execucação repetida do botao porcento

        let newvalue = this._operation[0]/100

        this._operation[0] = newvalue
        return newvalue
    }

    // push de um value para o array dos numeros clicados (operation)
    pushOperator(value){


        if (this._operation[0] == "="){
            //caso for clicado = sem ter nenhum numero digitado antes, ou seja array vazio portanto nao realizara nada.
            this.clearAll()
        }

        else if(this.isOperator(this._operation[0])){
            // caso digitar um operador com o display/array vazio ele ira usar o valor default 0 atribuido ao operador digitado aguardando o terceiro valor da operação.
            this._operation.unshift("0")
            
            
        }

        // calculo normal
        else{

            this._operation.push(value) 
    
             // caso o igual for o segundo item do array junto c o resul da operação ele ira repetir a ultima operação feita.
            if (this._operation[1] == "="){
    
                
                this.displayCalc =  this.EqualRepeatOp()
                this._operation.pop()
            }


            else if (this._operation[1] == "%"){
                    // caso nao houver uma ultima operação guardada ele ira zerar a operação de porcento(/100)
                    if(this._lastNumber == " "){
                        this.clearAll()
            

                } else{
                    // caso houver operação guardada ele ira executar o porcento repeditamente.
                    this.displayCalc = this.PercentRepeatOp()
                    this._operation.pop()
                }


               
            }
                
            // calculo normal
            if(this._operation.length > 3){
    
                this.calc();
            }
        }
        }


    // função a qual é acionada quando a presença de 3 el no array (2numeros e um operador), realizando o calculo e armazenando o resultado.

    calc(){

            
            if(this._operation.length > 3){
                this._lastNumber = this._operation.pop()
               

            }

            let firstOp = this._operation.join(" ")
            let result = eval(firstOp)

            // função botao porcento
            if(this._lastNumber == "%"){
                    
                result = result/100
                let  lastOperationArray = firstOp.split(" ")
                lastOperationArray.shift()
                this._lastNumber =  lastOperationArray.join(" ")

                this._operation = [result];

                }

        
            else{
                 this._operation = [result]; // novo array com a primeira op realizada e o sinal digitado pronto para a proxima operação

                 //TENTEI AQUI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let  lastOperationArray = firstOp.split(" ")
                    lastOperationArray.shift()
                    this._lastNumber =  lastOperationArray.join(" ")
                
                }
    
            
            this.setLastNumberToDisplay()


    }

    setLastNumberToDisplay(){
        let lastNumber;
        for(let i= this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){
                 lastNumber = this._operation[i]
                break;

            }

        }
         
        // att o display nos botoes AC e CE 
        if(!lastNumber){
            lastNumber = 0;
        }

        this.displayCalc = lastNumber;
            
        

    }

    /* função a qual adiciona os valores numericos clicados á um atributo(array) = futura operação */
    addOperation(value){
        
        // verificação do ultimo valor clicado
        // array vazio = valor undefined o qual torna se false no isNaN caindo no else.
        if(isNaN(this.getLastOperation())){
            //caso for string
            
            if(this.isOperator(value)){
                //this.operator = metodo conferidor se o value passado é ou nao um operador
                if(this._operation.length == false){
                    // caso operador for o primeiro elemento a ser cliclado/adicionado no array.
                    this._operation.push(value)
                    this.pushOperator(value)

                }
                else{

                    // caso for apertado operador em seguida de operador sera substituido 
                    this.setLastOperation(value)}
                    
                
            

           }
            else if(isNaN(value)){
                // caso for apertado ponto ou igual
                // caso for apertado =  com o display zerado
              
                this.pushOperator(value)
                
                

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
                this.addDotOp()
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