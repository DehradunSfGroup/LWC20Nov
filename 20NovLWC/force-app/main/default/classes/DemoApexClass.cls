public with sharing class DemoApexClass {
    @AuraEnabled(cacheable= true)
    public static List<Contact> getContacts(){
        return [SELECT Id,Name,Email,Phone FROM Contact LIMIT 15];
    }
    @AuraEnabled
    public static List<Account> getAccounts(){
        return [Select Id,Name FROM Account LIMIT 2];
    }
    @AuraEnabled
    public static List<Contact> searchContacts(String phoneNumber){
        return [SELECT Id,Name FROM Contact WHERE Phone = :phoneNumber];
    }
}
