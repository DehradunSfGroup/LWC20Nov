import { api, LightningElement } from 'lwc';

export default class CompositionChildLWC extends LightningElement {
    @api parentMessage = 'NO Messages';
}