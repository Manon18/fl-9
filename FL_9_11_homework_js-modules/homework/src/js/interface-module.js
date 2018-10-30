import { calcBasicMathematicalOperations } from './calculating-module';

export const calculator = {
    'setOperation': function(operation) {
        this._operation = operation;
        this._firstOperand = this._value;
        this._isOperationSet = true;
    },

    'getNewValue': function(value) {
        if (!this._value || this._value === 0 || this._isOperationSet) {
            this._value = value;
        }else {
            let newVal = this._value + '' + value;
            this._value = parseInt(newVal);
        }

        this._isOperationSet = false;

        return this._value;
    },

    'getCurrentValue': function() {
        return this._value;
    },

    'clean': function() {
        this._operation = null;
        this._value = 0;
        this._firstOperand = null;
    },

    'calculateResult': function() {
        if (!this._firstOperand) {
            return this._value;
        }

        let res = 0;
        let secondOperand = this._value;

        switch(this._operation) {
            case 'addition':
            res = calcBasicMathematicalOperations.addition(this._firstOperand, secondOperand);
            break;
            case 'subtraction':
            res = calcBasicMathematicalOperations.subtraction(this._firstOperand, secondOperand);
            break;
            case 'multiplication':
            res = calcBasicMathematicalOperations.multiplication(this._firstOperand, secondOperand);
            break;
            case 'division':
            res = calcBasicMathematicalOperations.division(this._firstOperand, secondOperand);
            break;
            default:
            throw new Error('Unknown operation' + this._operation);
        }

        this._firstOperand = res;
        this._value = res;
        this._isOperationSet = false;

        return res;
    }   
}