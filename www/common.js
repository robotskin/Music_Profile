var URLTIMEMOUT = 15000;

function visitURL(url, async, onRead, onFail) {
    var x = new XMLHttpRequest();
    x.open("GET", encodeURI(url), async);
    x.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                clearTimeout(xmlHttpTimeout);
                if (onRead != undefined) onRead(this);
            } else {
                if (onFail != undefined) onFail(this);
            }
        }
    };
    x.send();
    if (async) {
        var xmlHttpTimeout = setTimeout(function () {
            x.abort();
        }, URLTIMEMOUT);
    }
}

function postForm(url, formID, onLoad) {
    var x = new XMLHttpRequest();
    x.open("POST", encodeURI(url), true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var frm = document.getElementById(formID);
    var s = "";
    for (var i = 0; i < frm.length; i++) {
        var input = frm[i];
        if (input.name) {
            s += input.name + "=" + input.value + "&";
        }
    }
    s = s.substr(0, s.length - 1);
    x.send(s);
    x.onloadend = function () {
        if (onLoad != undefined) onLoad();
    };
}

function get(key) {
    var u = String(document.location).split('?');
    if (u[1]) {
        us = u[1].split('&');
        for (var i = 0; i <= us.length; i++) {
            if (us[i]) {
                var p = us[i].split('=');
                if (p[0] == key) {
                    return p[1];
                }
            }
        }
    }
    return "";
}