import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getAllCustomSObjects from '@salesforce/apex/SearchInfoInSalesforceController.getAllCustomSObjects';
import getSObjectFields from '@salesforce/apex/SearchInfoInSalesforceController.getSObjectFields';
import getSObjectData from '@salesforce/apex/SearchInfoInSalesforceController.getSObjectData';

export default class SearchSalesforceData extends LightningElement {
    objectList = [];
    fieldsData = [];
    fieldListToShow = [];
    selection = [];
    recordData;
    columns = [{ label: 'Field Name', fieldName: 'field', sortable: true, cellAttributes: { alignment: 'left' } }];
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    objectValue = '';
    showBanner = false;
    showFields = false;
    searchButtonDisabled = true;
    showSaleforceData = false;
    defaultFields = ['Name', 'CreatedDate', 'CreatedById'];
    selectedObject;
    selectedLimit = 5;  //assuming 5 records are default
    limitValue = [
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label: '30', value: '30' },
        { label: '40', value: '40' },
        { label: '50', value: '50' },
        { label: '100', value: '100' }
    ];
    @wire(getAllCustomSObjects)
    sObjectList({ data, error }) {
        if (data) {
            let response = JSON.parse(JSON.stringify(data));    //Deep cloning the immutable object
            this.objectList = response.map(element => {
                return { label: element, value: element }
            });
            this.showBanner = true;
        } else if (error) {
            this.showToast('Error', 'Something wrong happened while getting object details ', 'error');
        }
    }
    handleRowSelection(event) {
        try {
            let updatedItemsSet = new Set();
            let selectedItemsSet = new Set(this.selection);
            let loadedItemsSet = new Set();
            this.fieldListToShow.map((event) => {
                loadedItemsSet.add(event.field);
            });
            if (event && event.detail.selectedRows) {
                event.detail.selectedRows.map((event) => {
                    updatedItemsSet.add(event.field);
                });
                updatedItemsSet.forEach((id) => {
                    if (!selectedItemsSet.has(id)) {
                        selectedItemsSet.add(id);
                    }
                });
            }
            loadedItemsSet.forEach((id) => {
                if (selectedItemsSet.has(id) && !updatedItemsSet.has(id)) {
                    // Remove any items that were unselected.
                    selectedItemsSet.delete(id);
                }
            });
            this.selection = [...selectedItemsSet];
        } catch (error) {
            console.log('error in handleRowSelection--->', error)
        }

    }
    handleChange(event) {
        if (event.target.name === 'sobjectlist') {
            this.searchButtonDisabled = false;
            this.resetFields();
            this.selectedObject = event.detail.value;
            this.objectValue = event.detail.value;
            this.getFields(event.detail.value);
        }
        if (event.target.name === 'numberofrecords') {
            this.selectedLimit = event.target.value;
        }
    }
    resetFields() {
        this.fieldsData = [];
        this.selection = [];
        this.fieldListToShow = [];
        this.selectedLimit = 5;
    }
    getFields(objectName) {
        this.showFields = false;
        getSObjectFields({
            objectName: objectName
        }).then(response => {
            if (response && response.length) {
                this.fieldsData = response.map(element => {
                    return { field: element }
                });
                this.showFields = true;
            }
        }).catch(error => {
            this.showToast('Error', 'Something wrong happened while getting field details ' + error.body.message, 'error');
        })
    }
    fetchObjectData() {
        this.showSaleforceData = false;
        getSObjectData({
            sObjectName: this.selectedObject,
            fields: this.selection && this.selection.length ? this.selection : this.defaultFields,
            limitClause: this.selectedLimit
        }).then(response => {
            this.recordData = response;
            this.showSaleforceData = true;
        }).catch(error => {
            this.showToast('error', 'Something wrong hapenned while fetching data. ' + error.body.message, 'error');
        })
    }
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                return primer(x[field]);
            }
            : function (x) {
                return x[field];
            };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.fieldListToShow];
        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.fieldListToShow = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
    showToast(title, message, type) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: type
        }));
    }
    handlePaginatorResponse(event) {
        try {
            this.fieldListToShow = [];
            this.fieldListToShow = event.detail;
            if (this.template.querySelector('lightning-datatable')) {
                this.template.querySelector('lightning-datatable').selectedRows = this.selection;
            }
        } catch (error) {
            console.log('Error in handlePaginatorResponse', error);
        }

    }
    clearSearch(event) {
        this.objectValue = null;
        this.selectedObject = null;
        this.showFields = false;
        this.showSaleforceData = false;
        this.searchButtonDisabled = true;
        this.resetFields();
    }
}