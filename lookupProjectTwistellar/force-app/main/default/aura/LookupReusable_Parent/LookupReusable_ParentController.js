({
    onfocus: function (component, event, helper) {
        $A.util.addClass(component.find("mySpinner"), "slds-show");
        helper.forOpen(component,event);
        // Get Default 5 Records order by createdDate DESC  
        var getInputkeyWord = '';
        helper.searchHelper(component, event, getInputkeyWord);
    },
    
    onblur: function (component, event, helper) {
        component.set("v.listOfSearchRecords", null);
        helper.forClose(component,event);
    },

    keyPressController: function (component, event, helper) {
        // get the search Input keyword   
        var getInputkeyWord = component.get("v.SearchKeyWord");
        // check if getInputKeyWord size id more then 0 then open the lookup result List and 
        // call the helper 
        // else close the lookup result List part.   
        if (getInputkeyWord.length > 0) {
            helper.forOpen(component,event);
            helper.searchHelper(component, event, getInputkeyWord);
        }
        else {
            component.set("v.listOfSearchRecords", null);
            helper.forClose(component,event);
        }
    },

    // function for clear the Record Selaction 
    clear: function (component, event, heplper) {
        var pillTarget = component.find("lookup-pill");
        var lookUpTarget = component.find("lookupField");

        $A.util.addClass(pillTarget, 'slds-hide');
        $A.util.removeClass(pillTarget, 'slds-show');

        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');

        component.set("v.SearchKeyWord", null);
        component.set("v.listOfSearchRecords", null);
        component.set("v.selectedRecord", {});
    },

    // This function call when the end User Select any record from the result list.   
    handleComponentEvent: function (component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        var selectedAccountGetFromEvent = event.getParam("recordByEvent");
        component.set("v.selectedRecord", selectedAccountGetFromEvent);

        var compEvent = component.getEvent("appEvent");
        var conid = component.get("v.contactid");
        console.log(conid);
        compEvent.setParams({
            "record": selectedAccountGetFromEvent,
            "contactid": conid
        });
        compEvent.fire();
       
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');

        helper.forClose(component,event);

        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-hide');
        $A.util.removeClass(lookUpTarget, 'slds-show');

    },
})