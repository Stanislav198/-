({
    // open pop-up box for creating new product
    openModelProduct: function (component, event, helper) {
        component.set("v.isOpenProduct", true);
    },
    // open pop-up box for creating new pricebook
    openModelPriceBook: function (component, event, helper) {
        component.set("v.isOpenPriceBook", true);
    },
    // close pop-up box for creating new product
    closeModelProduct: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.getProduct2s(component, page, recordToDisply);
        component.set("v.isOpenProduct", false);
    },
    // close pop-up box for creating new pricebook
    closeModelPriceBook: function (component, event, helper) {
        component.set("v.isOpenPriceBook", false);
    },
    // init data
    doInit: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.getProduct2s(component, page, recordToDisply);
    },
    // delete row
    deleteRecord: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.deleteRecordHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
    },
    // show input for firstpricebook
    openInputFirst: function (component, event, helper) {
        helper.openInputFirstHelper(component, event);
    },
    // show input for secondpricebook
    openInputSecond: function (component, event, helper) {
        helper.openInputSecondHelper(component, event);
    },
    // add standard price with hardcore value 100
    addStandard: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.addStandardHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
    },
    // add firstpricebook price 
    addFirstPriceBook: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.addFirstPriceBookHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
    },
    // add secondpricebook price 
    addSecondPriceBook: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.addSecondPriceBookHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
    },
    // save all button
    saveAll: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");
        
        helper.saveProductNameHelper(component, event);
        helper.addFirstPriceBookHelper(component, event);
        helper.addSecondPriceBookHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
        component.set("v.isShowSaveAllButton", false);
    },
    // save button on row
    saveEditRow: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.saveProductNameHelper(component, event);
        helper.addFirstPriceBookHelper(component, event);
        helper.addSecondPriceBookHelper(component, event);
        helper.getProduct2s(component, page, recordToDisply);
        component.set("v.isShowSaveAllButton", false);
    },
    // edit button
    editRecord: function (component, event, helper) {
        helper.editRecordHelper(component, event);
    },
    // cancel button
    cancelEditRow: function (component, event, helper) {
        helper.cancelEditRowHelper(component, event);
    },
    // navigation
    navigate: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        var direction = event.getSource().get("v.label");
        var recordToDisply = component.find("recordSize").get("v.value");

        page = direction === "Previous Page" ? (page - 1) : (page + 1);
        helper.getProduct2s(component, page, recordToDisply);
    },
    // select records perPage
    onSelectChange: function (component, event, helper) {
        var page = 1
        var recordToDisply = component.find("recordSize").get("v.value");

        helper.getProduct2s(component, page, recordToDisply);
    },
    // search function
    myFunction: function (component, event, helper) {
        helper.myFunctionHelper(component, event);
    }
})