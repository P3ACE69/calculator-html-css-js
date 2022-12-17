class Calculator{
    //constructor class 
    constructor(previousOperandTextElement , currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement= currentOperandTextElement;
        this.clear()//when we start our cal everthinh will be empty
    }
    //This will clear all the text
    clear(){
       this.currentOperand=''//empty everything from current display
       this.previousOperand=''//empty everything form previous display
       this.operation=undefined
       
    }
    //This will clear the last text
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }
    //This will will add the new number form inner html
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.') )return
        this.currentOperand=this.currentOperand.toString() + number.toString()

    }
    //this will add the operation + - / * form inner html
    chooseOperation(operation){
        if(this.currentOperand==='')return
        if(this.currentOperand !==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''

    }
    //This will do the evaluation
    compute(){
        let computation
        const prev =parseFloat(this.previousOperand)
        const current =parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+' : computation = prev + current
            break
            case '-' : computation = prev - current
            break
            case '÷' : computation = prev / current
            break
            case '*' : computation = prev * current
            break
            default:
                return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    //this will update the display text
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation !=null ){
            this.previousOperandTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            
        }
        else{
            this.previousOperandTextElement.innerText=''
        }
    }


}
const numberButtons=document.querySelectorAll('[data-numeber]')
const operationButton=document.querySelectorAll('[data-operation]')
const equalButtons=document.querySelector('[data-equal]')
const deleteButtons=document.querySelector('[data-delete]')
const allclearButtons=document.querySelector('[data-all-clear]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')

const calculator=new Calculator( previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
          
}
)})
equalButtons.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allclearButtons.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButtons.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})