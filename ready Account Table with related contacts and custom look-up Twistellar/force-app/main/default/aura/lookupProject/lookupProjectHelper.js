({
    initHelper: function (component) {
        var ConList = component.get("c.getRelatedList");

        ConList.setParams
            ({
                recordId: component.get("v.recordId")
            });
        ConList.setCallback(this, function (response) {
            component.set("v.ContactList", response.getReturnValue());
        });
        $A.enqueueAction(ConList);
    },
    saveHelper: function (component) {
        var action = component.get("c.saveContact");
         
        action.setParams({
            'lstContact': component.get("v.ContactList")
        });
        action.setCallback(this, function (response) {
            component.set("v.ContactList", response.getReturnValue());
        });
        $A.enqueueAction(action);
        component.set("v.isOpen", false);
    },
    handleEventHelper: function (component, event) {
        var lcont = component.get("v.ContactList");
        var newContactList = [];
        var rec = event.getParam("record");
        var cid = event.getParam("contactid");

        for (var i = 0; i < lcont.length; i++) {
            if (lcont[i].Id == cid) {
                lcont[i].AccountId = component.get("v.selectedLookUpRecord").Id;
                lcont[i].Account.Name = component.get("v.selectedLookUpRecord").Name;
            }
            newContactList.push(lcont[i]);
        }
        component.set("v.ContactList", newContactList);
    },
    openModelHelper: function (component) {
        var toastEvent = $A.get("e.force:showToast");

        toastEvent.setParams({
            "title": "Edit Mode On!",
            "type": "success",
            "message": "You can edit records by clicking on a pencil"
        });
        toastEvent.fire();
        component.set("v.isOpen", true);
    }
    
})