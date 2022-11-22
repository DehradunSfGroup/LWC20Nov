import { LightningElement } from 'lwc';

export default class CompositionParentLWC extends LightningElement {
    inputValue = '';
    handleInputChange(event) {
        this.inputValue = event.detail.value
    }
    sendInformationToChild() {
        this.template.querySelector('c-composition-child-l-w-c').parentMessage = this.inputValue;
    }
}