import { LightningElement, wire ,api} from 'lwc';
import contactList from '@salesforce/apex/ContactCreationController.contactList';
export default class ShowRelatedContacts extends LightningElement {
    //Imperative way
    //Wiring apex methods with lwc
    conList;
    conListImperative;
    showContactsImperatively = false;
    @api recordId;
    /* @wire(contactList , {accountId : '$recordId'})
    contactDetails({error,data}) {
        if(error) {
            console.log('error in wire--->',error)
        }
        if(data) {
            console.log('data---',data);
            this.conList = data;
        }
    }; */
    connectedCallback() {
        this.fetchContacts();
    }
    fetchContacts() {
        contactList({accountId: this.recordId})
        .then(response=>{
            console.log('RESPONSE******',response);
            this.conListImperative = response;
            this.showContactsImperatively = true;
        }).catch(error=>console.log('Error in imperative apex=',error))
    }

}