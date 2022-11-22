import { api, LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountCreationLDS extends LightningElement {
    @api recordId;
    fields = ['Phone','Name'];
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.AccountId = this.recordId;
        fields.LastName = undefined;
        this.template.querySelector('lightning-record-form').submit(fields);
    }
    showSuccessMessage(event) {
        const messageEvent = new ShowToastEvent({
            message : 'Contact created '+ event.detail.id,
            title : 'Success',
            variant : 'success'
        })
        this.dispatchEvent(messageEvent);
    }
    showErrorMessage(event) {
        console.log('ERROR--->',JSON.stringify(event));
        const errorEvent = new ShowToastEvent({
            message : 'Contact not Created',
            title : 'Error',
            variant : 'error'
        })
        this.dispatchEvent(errorEvent);
    }
}