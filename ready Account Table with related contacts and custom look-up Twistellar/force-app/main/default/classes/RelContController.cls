public with sharing class RelContController{

    @AuraEnabled
    public static List<Contact> getRelatedList(Id recordId) {
        List<Contact> Conlist = [SELECT id, Name,Firstname, Lastname, Title, Email, Account.Name, AccountId FROM Contact WHERE AccountId=: recordId ];
        return Conlist;
    }
    
    @AuraEnabled
    public static List<Contact> saveContact(List<Contact> lstContact) {
        update lstContact;
        return lstContact;
    }
}