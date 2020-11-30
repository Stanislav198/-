public with sharing class MyOLIController {

    @AuraEnabled
    public static List<Product2> getProduct(List<Id> ProductId){
        
        List<Product2> productList = [SELECT Id, Name, StockKeepingUnit, Description FROM Product2 WHERE Id in :ProductId];

        return productList;
    }
}