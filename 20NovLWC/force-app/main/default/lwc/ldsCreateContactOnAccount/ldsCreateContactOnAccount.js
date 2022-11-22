import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement,api } from 'lwc';

export default class LdsCreateContactOnAccount extends LightningElement {
    @api recordId;
    lastName;
    phoneNumber;
    firstName;
    handleLastNameChange(event) {
        this.lastName = event.detail.value;
    }
    handlePhoneChange(event) {
        this.phoneNumber = event.detail.value;
    }
    handleFirstNameChange(event) {
        this.firstName = event.detail.value;
    }
    createContact() {
        try {
            let recordInput = {};
            recordInput.apiName = "Contact";
            recordInput.fields = {
                "LastName": this.lastName,
                "Phone": this.phoneNumber,
                "AccountId" : this.recordId
            };
            createRecord(recordInput).then((data) => {
                console.log('DATA****', data);
            })
        } catch (error) {
            console.log('Error---', error);
        }

    }
}