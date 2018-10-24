/* eslint-disable no-useless-escape */
export function jsAddToArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    if (aNewArry.indexOf(str) < 0) {
        aNewArry.push(str)
    }
    return aNewArry;
}

export function jsRemoveFromArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    const i = aNewArry.indexOf(str);
    if (i >= 0) {
        aNewArry.splice(i, 1);
    }
    return aNewArry;
}

export function jsInArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    return (aNewArry.indexOf(str) >= 0)
}

export function jsTrim(str){
    return str.replace(/\s+/g,' ').trim();
}

export function jsIsInteger(strValue) {
    const RegEx = /^\d+$/;
    return String(strValue).search(RegEx) !== -1
}

export function jsIsEmail(strEmail){
    let ReqEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ReqEx.test(strEmail)
}

export function jsLeft(str, n){
    if (str === undefined || n <= 0) {
        return "";
    } else if (n > str.length) {
        return str;
    } else {
        return str.substring(0, n);
    }
}

export function jsRight(str, n){
    if (str === undefined || n <= 0) {
        return "";
    } else if (n > str.length) {
        return str;
    } else {
        var iLen = String(str).length;
        return str.substring(iLen, iLen - n);
    }
}

export function jsStrLeft(str1, str2){
    if (str1 === undefined) return "";
    var i = str1.indexOf(str2);
    if (i <= 0) {
        return "";
    } else {
        return str1.substring(0, i);
    }
}

export function jsStrRight(str1, str2){
    if (str1 === undefined) return "";
    let i = str1.lastIndexOf(str2);
    let iLen = str2.length;
    if (i < 0 || (i+iLen) === str1.length) {
        return "";
    } else {
        return str1.substring(i + iLen, str1.length);
    }
}

export function jsSort(prop, bNum, bDescending){
    if (bNum) {
        if (bDescending) {
            return function(a, b){
                if (a[prop] < b[prop]){
                    return 1;
                } else if (a[prop] > b[prop]){
                    return -1;
                }
                return 0;
            }
        } else {
            return function(a, b){
                if (a[prop] > b[prop]){
                    return 1;
                } else if (a[prop] < b[prop]){
                    return -1;
                }
                return 0;
            }
        }
    } else {
        if (bDescending) {
            return function(a, b){
                if (a[prop].toLowerCase() < b[prop].toLowerCase()){
                    return 1;
                } else if (a[prop].toLowerCase() > b[prop].toLowerCase()){
                    return -1;
                }
                return 0;
            }
        } else {
            return function(a, b){
                if (a[prop].toLowerCase() > b[prop].toLowerCase()){
                    return 1;
                } else if (a[prop].toLowerCase() < b[prop].toLowerCase()){
                    return -1;
                }
                return 0;
            }
        }
    }
}

export function jsIsDate(strValue) {
    var iYear, iMonth, iDay;
    var aMonths = [0,31,29,31,30,31,30,31,31,30,31,30,31];
    var RegExISO = /^([12]\d\d\d)-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
    var RegExEU = /^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[0-2]).([12]\d\d\d)$/;

    //Check format
    if (strValue.indexOf("-") > 0) {
        if (!strValue.match(RegExISO)) return false;
        iYear = parseInt(strValue.substring(0,4));
        iMonth = parseInt(strValue.substring(5,7), 10);
        iDay = parseInt(strValue.substring(8,10), 10);
    } else {
        if (!strValue.match(RegExEU)) return false;
        iYear = parseInt(jsRight(strValue, 4));
        iMonth = parseInt(jsStrRight(strValue.substring(0,strValue.length-5), "."));
        iDay = parseInt(jsStrLeft(strValue, "."));
    }

    //Check day
    if (iDay > aMonths[iMonth]) return false;

    //Check for leap year
    if ((iMonth === 2) && (iDay === 29)) {
        if ((((iYear % 4) === 0) && ((iYear % 100) !== 0)) === false) return false;
    }
    return true
}