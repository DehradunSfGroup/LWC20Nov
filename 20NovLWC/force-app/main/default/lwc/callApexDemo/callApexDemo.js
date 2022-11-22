import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/DemoApexClass.getContacts';
import getAccounts from '@salesforce/apex/DemoApexClass.getAccounts';
export default class CallApexDemo extends LightningElement {
    contactList;
    accountList;
    errors;
    showAccounts = false;
    @wire(getContacts)
    getContactList({ data, error }) {
        if(data) {
            this.contactList = data;
            this.errors = undefined;

        } else if(error) {
            this.contactList = undefined;
            this.errors = error;
        }
    }
    getAccountData() {
        getAccounts()
        .then(response=>{
            console.log('RESPONSE FROM APEX****',response);
            this.accountList = response;
            this.showAccounts = true;
        })
        .catch(error=>console.log('Error--->',error));
    }
}