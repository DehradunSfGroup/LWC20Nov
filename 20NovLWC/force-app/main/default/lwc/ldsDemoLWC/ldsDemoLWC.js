import { api, LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LdsDemoLWC extends LightningElement {
    @api recordId;
    nameField = NAME_FIELD;
    contactPhone = PHONE_FIELD;
    handleSubmit(event) {
        event.preventDefault();
        if(!event.detail.fields.Phone) {
            this.dispatchEvent(new ShowToastEvent({
                message : 'Error, Please enter a phone number to save the record',
                title :'Error',
                variant : 'error'
            }))
            return;
        }
        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);
    }
    handleSuccess(event) {
        this.dispatchEvent(new ShowToastEvent({
            message : 'Success, Record Updated with Id='+event.detail.id,
            title :'Success',
            variant : 'success'
        }))
    }
}