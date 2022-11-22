import { api, LightningElement, wire } from 'lwc';
import { getRecord, generateRecordInputForUpdate } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Account';

export default class GenerateRecordForUpdateDemoLWC extends LightningElement {
    @api recordId;
    @api objectApiName;
    @wire(getObjectInfo, {
        objectApiName: CONTACT_OBJECT
    })
    objectInfo;
    @wire(getRecord, {
        recordId: '$recordId',
        layoutTypes: 'Full',
        modes: 'Edit'
    })
    wiredRecord;
    get recordInputForUpdate() {
        if (!this.wiredRecord.data || !this.objectInfo.data) {
            return undefined;
        }
        const recordInput = generateRecordInputForUpdate(
            this.wiredRecord.data,
            this.objectInfo.data
        );
        return recordInput;
    }
    handleButtonClick() {
        try {
            console.log('DEFAULT values***', this.recordInputForUpdate);

        } catch (error) {
            console.log('error--->', error);
        }
    }

}