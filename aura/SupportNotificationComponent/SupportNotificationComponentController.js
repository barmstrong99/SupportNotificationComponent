({

    doInit: function(component) {
	   var action = component.get("c.fireToastEvent");
       $A.enqueueAction(action);                 
    },
    
    fireToastEvent : function(component, event, helper) {
        var action = component.get("c.OrgSupportNotificationSystemDefault");
        
        action.setCallback(this, function(a){
            if(a.getState() === "SUCCESS"){
                var active = a.getReturnValue().Active__c;
                var title = a.getReturnValue().Title__c;
                var message = a.getReturnValue().Notification__c;
                var notifytype = a.getReturnValue().Type__c;
                var iconKey = a.getReturnValue().Key__c;
                var url = a.getReturnValue().URL__c;
                var labelUrl = a.getReturnValue().Label_URL__c;
                
                var messageLayout = "{0} {1}";
               
                // Is a url set to be displayed.
                if (url) {
                    if (!labelUrl) {
                        labelUrl = url; 
                    }
                }
                
                // Is there a notification that is active?
                if (active === true) {
                    var resultToast = $A.get("e.force:showToast");
                    resultToast.setParams({
                        "title": title,
                        "message": message,
                        "key": iconKey, 
                        "messageTemplate": messageLayout,
                        "messageTemplateData" : [message, {"url": url, "label" : labelUrl}],
                        "type": notifytype,
                        "mode": "sticky"
                    });
                    resultToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }	
	
})