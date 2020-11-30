({
    searchHelper: function (component, event, getInputkeyWord) {
        // call the apex class method 
        var action = component.get("c.fetchLookUpValues");
        var toastEvent = $A.get("e.force:showToast");

        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord,
            'ObjectName': component.get("v.objectAPIName")
        });
        // set a callBack    
        action.setCallback(this, function (response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            } else if (state === "ERROR"){
                toastEvent.fire();
            }

        });
        // enqueue the Action  
        $A.enqueueAction(action);

    },

    forOpen: function (component, event) {
        var forOpen = component.find("searchRes");

        $A.util.addClass(forOpen, 'slds-is-open');
        $A.util.removeClass(forOpen, 'slds-is-close');
    },
    
    forClose: function (component, event) {
        var forclose = component.find("searchRes");

        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
})