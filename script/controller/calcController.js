class CalcController {

    constructor(){
        
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("text#display");
        this._currentDate;
        this._dateEl = document.querySelector("text#data");
        this._timeEl = document.querySelector("text#hora");
        
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



    initButtonsEvents(){
       let buttons = document.querySelectorAll("#buttons > g, #parts > g");
     
        
        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, 'click drag', (e) => {

                console.log(btn.className.baseVal.replace('btn-', ""));
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