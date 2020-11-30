public with sharing class samplePagerCtrl {

  @AuraEnabled
  public static List<Product2PagerWrapper> fetchProduct2(Decimal pageNumber ,Integer recordToDisply) {

    Integer pageSize = recordToDisply;
    Integer offset = ((Integer)pageNumber - 1) * pageSize;

    List<Product2PagerWrapper> lstwrap =  new List<Product2PagerWrapper>();

    List<Product2> product2s= [SELECT Id, Name FROM Product2 ORDER BY Name LIMIT :recordToDisply OFFSET :offset];

      List<PricebookEntry> productPrice1 = [SELECT Id, UnitPrice, Pricebook2.Name,Product2Id FROM PricebookEntry WHERE Pricebook2.Name = 'FirstPriceBook'];
      Map<Id, PricebookEntry> prMap1 = new  Map<Id, PricebookEntry>();

        for(PricebookEntry pr : productPrice1){
          prMap1.put(pr.Product2Id , pr);
        }

          List<PricebookEntry> productPrice2 = [SELECT Id, UnitPrice, Pricebook2.Name,Product2Id FROM PricebookEntry WHERE Pricebook2.Name = 'SecondPriceBook'];
          Map<Id, PricebookEntry> prMap2 = new  Map<Id, PricebookEntry>();

            for(PricebookEntry pr:productPrice2){
              prMap2.put(pr.Product2Id, pr);
            }
        
              List<PricebookEntry> productPrice3 = [SELECT Id, UnitPrice, Pricebook2.Name,Product2Id FROM PricebookEntry WHERE Pricebook2.Name = 'Standard Price Book' ];
              Map<Id, PricebookEntry> prMap3 = new  Map<Id, PricebookEntry>();

                for(PricebookEntry pr:productPrice3){
                prMap3.put(pr.Product2Id, pr);
                }

      for(Product2 p: product2s) {

        Product2PagerWrapper obj =  new Product2PagerWrapper();

        
          obj.product2s = p;
          obj.pageSize = pageSize;
          obj.page = (Integer) pageNumber;
          obj.total = [SELECT count() FROM Product2];
          obj.isOpenFirst = false;
          obj.isOpenSecond = false;
          obj.isEditRow = false;
          obj.isOpenProductName = false;

            if (prMap1.containsKey(p.id)) {            
              obj.productPrice1= prMap1.get(p.Id);            
            }

              if (prMap2.containsKey(p.id)) {            
                obj.productPrice2= prMap2.get(p.Id);            
              }

                if (prMap3.containsKey(p.id)) {            
                  obj.productPrice3= prMap3.get(p.Id);        
                }

          lstwrap.add(obj);
      }
        return lstwrap;
  }
     
  public class Product2PagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}

    @AuraEnabled public Boolean isOpenProductName {get;set;}
    @AuraEnabled public Boolean isOpenFirst {get;set;}
    @AuraEnabled public Boolean isOpenSecond {get;set;}
    @AuraEnabled public Boolean isEditRow {get;set;}

    @AuraEnabled public Product2 product2s {get;set;}

    @AuraEnabled public PricebookEntry productPrice1 {get;set;}
    @AuraEnabled public PricebookEntry productPrice2 {get;set;}
    @AuraEnabled public PricebookEntry productPrice3 {get;set;}
  }
  // delete row
  @AuraEnabled
  public static void deleteProduct2(String recordId) {  

    List<Product2> delProduct = [SELECT Id FROM Product2 WHERE Id = :recordId];

    delete delProduct;
  }
  //add standard price 100.  Pricebook2Id and Product2Id - nessesary fields
  @AuraEnabled
  public static void addStandardPriceBook(String recordId) {  

    List<PricebookEntry> Standlist = [SELECT Id, UnitPrice, Pricebook2.Name,Product2Id,Pricebook2Id FROM PricebookEntry WHERE Pricebook2.Name = 'Standard Price Book' AND Product2Id = :recordId];
    
    PricebookEntry pe = new PricebookEntry();
      pe.Pricebook2Id = '01s2w000007yaqOAAQ';
      pe.Product2Id = recordId;
      pe.UnitPrice = 100;

    Standlist.add(pe);
    upsert Standlist;
  }
  // edit product name
  @AuraEnabled
  public static void addProductName( String recordId, List<Product2PagerWrapper> wrp) {  

    List<Product2> pbe = new  List<Product2>();

      for(Product2PagerWrapper p : wrp){
        pbe.add(p.product2s);
      }

    update pbe;
  }
  // add or edit firstpricebook price
  @AuraEnabled
  public static void addFirstPrice( String recordId, List<Product2PagerWrapper> wrp) {  

    List<PricebookEntry> pbe = new  List<PricebookEntry>();

      for(Product2PagerWrapper p : wrp){
        if(p.productPrice1 != null){
          pbe.add(p.productPrice1);
        }
      }

        for(PricebookEntry p : pbe){
          if(p.Pricebook2Id == null){
            p.Pricebook2Id = '01s2w000008YkdtAAC';
            p.Product2Id = recordId;
          }
        }

    upsert pbe;
  }
  // add or edit secondpricebook price
  @AuraEnabled
  public static void addSecondPrice( String recordId, List<Product2PagerWrapper> wrp) {  

    List<PricebookEntry> pbe = new  List<PricebookEntry>();

      for(Product2PagerWrapper p : wrp){
        if(p.productPrice2 != null){
          pbe.add(p.productPrice2);
        }
      }

        for(PricebookEntry p : pbe){
          if(p.Pricebook2Id == null){
            p.Pricebook2Id = '01s2w000008YkdyAAC';
            p.Product2Id = recordId;
          }
        }

    upsert pbe;
  }
}