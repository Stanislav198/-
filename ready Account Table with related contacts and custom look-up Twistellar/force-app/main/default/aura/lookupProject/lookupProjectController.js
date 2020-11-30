({
    myAction: function (component, event, helper) {
        helper.initHelper(component);
    },
    save: function (component, event, helper) {
        helper.saveHelper(component);
    },
    handleEvent: function (component, event, helper) {
        helper.handleEventHelper(component, event);
    },
    openModel: function (component, event, helper) {
        helper.openModelHelper(component);
    },
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);
    }
})