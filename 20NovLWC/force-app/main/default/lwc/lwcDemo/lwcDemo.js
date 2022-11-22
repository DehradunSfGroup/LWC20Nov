import { LightningElement } from 'lwc';

export default class LwcDemo extends LightningElement {
    firstName ='';
    lastName = '';
    get fullName() {
        return (this.firstName + ' ' + this.lastName).toUpperCase();
    }
    setFirstName(event) {
        this.firstName = event.detail.value
    }
    setlastName(event) {
        this.lastName = event.detail.value
    }
}