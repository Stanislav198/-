({
    fetchProducts: function (component, event, helper) {
        var action = component.get("c.getProduct");
        var Id = component.get("v.recordId");

        action.setParams({
            ProductId: Id
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
                var productList = response.getReturnValue();
                console.log(productList);
                component.set("v.productList", productList);
            }
            else {
                alert('Error in getting data');
            }
        });
        $A.enqueueAction(action);
    }
})