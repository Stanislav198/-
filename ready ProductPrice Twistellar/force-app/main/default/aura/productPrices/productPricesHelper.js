({
   getProduct2s: function (component, page, recordToDisply) {
      var action = component.get("c.fetchProduct2");

      action.setParams({
         "pageNumber": page,
         "recordToDisply": recordToDisply
      });
      action.setCallback(this, function (a) {
         var result = a.getReturnValue();
         component.set("v.total", result[0].total);
         component.set("v.wrapperList", result);
         component.set("v.page", result[0].page);
         component.set("v.pages", Math.ceil(result[0].total / recordToDisply));
      });
      $A.enqueueAction(action);
   },
   deleteRecordHelper: function (component, event) {
      var action = component.get("c.deleteProduct2");

      action.setParams({
         "recordId": event.target.id
      });
      $A.enqueueAction(action);
   },
   openInputFirstHelper: function (component, event) {
      var id = event.target.id;
      var wrap = component.get("v.wrapperList");

      for (var i = 0; i < wrap.length; i++) {
         if (wrap[i].product2s.Id == id) {
            wrap[i].isOpenFirst = true;
         }
      }
      component.set("v.wrapperList", wrap);
      component.set("v.isShowButton", false);
   },
   openInputSecondHelper: function (component, event) {
      var id = event.target.id;
      var wrap = component.get("v.wrapperList");

      for (var i = 0; i < wrap.length; i++) {
         if (wrap[i].product2s.Id == id) {
            wrap[i].isOpenSecond = true;
         }
      }
      component.set("v.wrapperList", wrap);
      component.set("v.isShowButton", false);
   },
   addStandardHelper: function (component, event) {
      var action = component.get("c.addStandardPriceBook");

      action.setParams({
         "recordId": event.target.id
      });
      $A.enqueueAction(action);
   },
   addFirstPriceBookHelper: function (component, event) {
      var action = component.get("c.addFirstPrice");
      var wrap = component.get("v.wrapperList");

      action.setParams({
         "recordId": event.target.id,
         "wrp": wrap
      });
      $A.enqueueAction(action);
   },
   addSecondPriceBookHelper: function (component, event) {
      var action = component.get("c.addSecondPrice");
      var wrap = component.get("v.wrapperList");

      action.setParams({
         "recordId": event.target.id,
         "wrp": wrap
      });
      $A.enqueueAction(action);
   },
   saveProductNameHelper: function (component, event) {
      var actionProductName = component.get("c.addProductName");
      var wrap = component.get("v.wrapperList");

      actionProductName.setParams({
         "recordId": event.target.id,
         "wrp": wrap
      });
      $A.enqueueAction(actionProductName);
   },
   editRecordHelper: function (component, event) {
      var id = event.target.id;
      var wrap = component.get("v.wrapperList");

      for (var i = 0; i < wrap.length; i++) {
         if (wrap[i].product2s.Id == id) {
            wrap[i].isOpenSecond = true;
            wrap[i].isOpenFirst = true;
            wrap[i].isOpenProductName = true;
            wrap[i].isEditRow = true;
         }
      }
      component.set("v.wrapperList", wrap);
      component.set("v.isShowButton", true);
      component.set("v.isShowSaveAllButton", true);
   },
   cancelEditRowHelper: function (component, event) {
      var id = event.target.id;
      var wrap = component.get("v.wrapperList");

      for (var i = 0; i < wrap.length; i++) {
         if (wrap[i].product2s.Id == id) {
            wrap[i].isOpenSecond = false;
            wrap[i].isOpenFirst = false;
            wrap[i].isOpenProductName = false;
            wrap[i].isEditRow = false;
         }
      }
      component.set("v.wrapperList", wrap);
      component.set("v.isShowSaveAllButton", false);
   },
   myFunctionHelper: function (component, event) {
      var input = document.getElementById("myInput");
      var filter = input.value.toUpperCase();
      var table = document.getElementById("myTable");
      var tr = table.getElementsByTagName("tr");

      for (var i = 0; i < tr.length; i++) {
         var td = tr[i].getElementsByTagName("td")[0];
         if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
               tr[i].style.display = "";
            } else {
               tr[i].style.display = "none";
            }
         }
      }
   },
})