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
    /* função a qual adiciona os valores numericos clicados á um atributo(array) = futura operação */
    addOperation(value){
        this._operation.push(value)
        console.log(this._operation)


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
            

            case 'sum':
               
            

            case 'subtraction':
                
            

            case 'multiplication':
                
            

            case 'division':
                
            

            case 'percent':
                
            

            case 'equal':
                
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
               console.log(btn.className.baseVal.replace('btn-', ""));

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
}