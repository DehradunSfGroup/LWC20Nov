import { api, LightningElement } from 'lwc';

export default class SalesforceDataDisplay extends LightningElement {
    @api objectApiName;
    @api recordData;
    @api fields;
    @api defaultFields;
    isModalOpen = false;
    recordIds = [];
    noData = false;
    connectedCallback() {
        console.log('inside connectedcallback of child component');
        this.recordIds = this.recordData.map(element => element.Id);
        this.fields = this.fields && this.fields.length ? this.fields : this.defaultFields;
        if(!this.recordIds.length){
            this.noData = true;
        }
        this.isModalOpen = true;
        console.log('Record ids-->',this.recordIds);
        console.log('fields-->',this.fields);
        console.log('objectApiName-->',this.objectApiName);
    }
    closeModal(){
        this.isModalOpen = false;
    }
}