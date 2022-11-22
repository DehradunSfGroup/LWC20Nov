import { LightningElement } from 'lwc';
import searchContacts from '@salesforce/apex/DemoApexClass.searchContacts'
export default class DemoSearchContacts extends LightningElement {
    searchTerm;
    noResultFound = false;
    searchResults;
    showContacts = false;
    setSearchTerm(event) {
        this.searchTerm = event.detail.value;
    }
    handleSearch() {
        searchContacts({phoneNumber : this.searchTerm})
        .then(response=>{
            console.log('RESPONSE FROM APEX***',response);
            if(response.length) {
                this.searchResults = response;
                this.showContacts = true;
                this.noResultFound = false;
            } else {
                this.showContacts = false
                this.noResultFound = true;
            }
        }).catch(error=>console.log('Error--->',error))
    }
}