import { LightningElement } from 'lwc';

export default class PropsAndReactivityDemo extends LightningElement {
    firstName = '';
    lastName = '';
    handleFirstNameChange(event) {
        this.firstName = event.detail.value;
    }
    handleLastNameChange(event) {
        this.lastName = event.detail.value;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}