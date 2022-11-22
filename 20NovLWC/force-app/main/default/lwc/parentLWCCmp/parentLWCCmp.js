import { LightningElement } from 'lwc';

export default class ParentLWCCmp extends LightningElement {
    messageFromChild = 'NO MESSAGES'
    handleChildEvent(event) {
        this.messageFromChild = event.detail.message;
    }
}