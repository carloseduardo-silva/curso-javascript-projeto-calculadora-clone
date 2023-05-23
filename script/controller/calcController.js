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

    initButtonsEvents(){
       let buttons = document.querySelectorAll("#buttons > g, #parts > g");
     
        

        buttons.forEach((btn, index)=>{

            btn.addEventListener('click', (e) => {

                console.log(e);
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