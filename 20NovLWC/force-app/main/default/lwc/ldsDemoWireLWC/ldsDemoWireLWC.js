import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { api, LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Contact.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class LdsDemoWireLWC extends LightningElement {
    @api recordId;
    contactDetails;
    showData = false;

    //$- reactive variable, which means if there is a change in this variable wire will reload.
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, PHONE_FIELD, OWNER_NAME_FIELD] })
    getContacts({ data, error }) {
        if (data) {
            this.showData = true;
            this.contactDetails = {
                name: getFieldValue(data, NAME_FIELD),
                phone: getFieldValue(data, PHONE_FIELD),
                ownerName: getFieldValue(data, OWNER_NAME_FIELD),
            }
            console.log('contact details are--->', this.contactDetails);
        }
        if (error) {
            console.log('Error in Wire---->', error);
        }
    }
}