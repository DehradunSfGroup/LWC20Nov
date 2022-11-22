import { LightningElement } from 'lwc';

export default class LwclifecycleDemo extends LightningElement {
    toggleFlag = false;
    constructor() {
        super();
        console.log('constructor CALLED****');
    }
    connectedCallback() {
        console.log('connectedCallback CALLED****');
    }
    renderedCallback() {
        console.log('renderedCallback CALLED****');
    }
    /* render() {
        console.log('render CALLED****');
    } */
    errorCallback(error,stack) {
        console.log('errorCallback CALLED****', '--- ERROR---',error, '----STACK----',stack);
    }
    disconnectedCallback () {
        console.log('disconnectedCallback CALLED****');
    }
    createError() {
        this.toggleFlag =!this.toggleFlag;
        //didnt imported the platformshowtoastevent module
        /* this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error',
                variant: 'error'
            })
        ); */
    }
}