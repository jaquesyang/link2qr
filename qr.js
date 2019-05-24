/*
function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return (decodeURI(x) !== decodeURIComponent(x));
  }
*/
function toUtf8(str) {
    var out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }
    return out;
}

jQuery(document).ready(function() {
    var text = window.location.hash.substring(1);

    console.log(text);
    //if(containsEncodedComponents(text)){
    text = toUtf8(decodeURIComponent(text));
    //}
    console.log(text);
    jQuery('#qr').qrcode({
        text: text
    });
});
