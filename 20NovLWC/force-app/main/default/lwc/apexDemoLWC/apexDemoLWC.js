import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ApexDemoForDDNAdminGroup.getContacts';
import getOppties from '@salesforce/apex/ApexDemoForDDNAdminGroup.getOppties';

export default class ApexDemoLWC extends LightningElement {
    showContacts = false;
    contactList = [];
    opptyList = [];
    showOppties = false
    @wire(getContacts)
    getContactsInfo({ data, error }) {
        if (data) {
            console.log('Data is***', data);
            this.showContacts = true;
            this.contactList = data;
        }
        if (error) {
            console.log('Error from Apex method in Wire', error)
        }
    }
    getOpportunities() {
        getOppties().then(response => {
            if (response && response.length) {
                this.showOppties = true;
                console.log('Response from APEX Class Imperatively', response);
                this.opptyList = response;
                this.showContacts = false;

            }
        })
            .catch(error => {
                console.log('Error from Apex method Imperatively', error)
            })
    }
}