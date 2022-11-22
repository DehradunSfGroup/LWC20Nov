import { LightningElement, wire } from 'lwc';
import channelName from '@salesforce/messageChannel/globalMessage';
import { subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class LmsDemoLWC extends LightningElement {
    subscription
    // To pass scope, you must get a message context.
    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
}