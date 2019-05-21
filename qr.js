
/*
function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return (decodeURI(x) !== decodeURIComponent(x));
  }
*/
  function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

  
jQuery(document).ready(function () {
    var text =  window.location.hash.substring(1);
    
    console.log(text);
    //if(containsEncodedComponents(text)){
        text = toUtf8(decodeURIComponent(text));
    //}
    console.log(text);
    jQuery('#qr').qrcode({
            text:text
        });
});