export const formatNumber = function(num) {        
    num = Math.abs(num);
    num = num.toFixed();
            
    if (num.length > 3) {            
        num = num.substr(0, num.length - 3) + ',' + num.substr(num.length - 3, 3);         
    }

    return num;   
}