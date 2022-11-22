public with sharing class ApexDemoForDDNAdminGroup {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        try {
            return [SELECT Id,Name,Phone FROM Contact LIMIT 20];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Opportunity> getOppties(){
        try {
            return [SELECT Id,Name,Amount,ExpectedRevenue FROM Opportunity LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
