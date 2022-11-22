import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LdsDemoAdvanced extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldNames;
    @api iconName;
    @api cardTitle;
    fieldNameArray = [];
    connectedCallback() {
        this.fieldNameArray = this.fieldNames ? this.fieldNames.split(';') : this.fieldNames;
    }
    handleSubmit(event) {
        event.preventDefault();
        let fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    handleSuccess(event) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Record updated Successfully. ' + event.detail.id,
            variant: 'success',
            mode: 'sticky'
        }));
    }

}