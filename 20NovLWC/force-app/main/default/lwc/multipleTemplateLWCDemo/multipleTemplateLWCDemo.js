import { LightningElement, wire } from 'lwc';
import managerLook from './managerLook.html';
import employeeLook from './employeeLook.html';
import Id from '@salesforce/schema/User.Id';
import profileName from '@salesforce/schema/User.Profile.Name'
import { getFieldValue } from 'lightning/uiRecordApi';

export default class MultipleTemplateLWCDemo extends LightningElement {
    showTemplateOne = true;
    userProfile;
    @wire(getRecord ,{fields : profileName})
    getUserDetails({data,error}) {
        if(data) {
            this.userProfile = getFieldValue(data,profileName);
        }
    }
    //TODO - Complete this code before pushing to github.
    render() {
        if(this.userProfile === 'Manager') {
            return managerLook;
        }
        return employeeLook;
        return this.showTemplateOne ? managerLook : employeeLook;
    }

    switchTemplate(){ 
        this.showTemplateOne = !this.showTemplateOne; 
    }
}