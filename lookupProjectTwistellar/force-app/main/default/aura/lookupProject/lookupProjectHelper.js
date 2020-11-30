({
    initHelper: function (component) {
        var conList = component.get("c.getRelatedList");

        conList.setParams
            ({
                recordId: component.get("v.recordId")
            });
        conList.setCallback(this, function (response) {
            component.set("v.contactList", response.getReturnValue());
        });
        $A.enqueueAction(conList);
    },

    saveHelper: function (component) {
        var action = component.get("c.saveContact");
         
        action.setParams({
            'lstContact': component.get("v.contactList")
        });
        action.setCallback(this, function (response) {
            component.set("v.contactList", response.getReturnValue());
        });
        $A.enqueueAction(action);
        component.set("v.isOpen", false);
    },

    handleEventHelper: function (component, event) {
        var lcont = component.get("v.contactList");
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
        component.set("v.contactList", newContactList);
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