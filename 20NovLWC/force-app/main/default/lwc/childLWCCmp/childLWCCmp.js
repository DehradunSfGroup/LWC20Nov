import { LightningElement } from 'lwc';

export default class ChildLWCCmp extends LightningElement {
    greeting = '';
    handleInputChange (event) {
        this.greeting = event.detail.value
    }
    sendMessageToParent() {
        this.dispatchEvent(new CustomEvent(
            'childevent',
            {
                detail: {
                    message: this.greeting
                }
            }
        ));
    }
}