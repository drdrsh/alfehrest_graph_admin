AlFehrestNS.Forms = {
    
    "getRandomName" : function () {
        var text = [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ ){
            text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
        }
        return text.join('');
    },
    
    copyThis: function(that, self) {
        for(var idx in self){
            that[idx] = self[idx];
        }
    }
    
};
