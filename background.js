
function generateQRCode(text){
    text = encodeURIComponent(text);
    
    //var prefix='http://qr.topscan.com/api.php?w=250&text=';
    var prefix='qr.html#';
    var url=prefix + text;
    console.log(url);
    chrome.windows.create({
        url:url,
        width:400,
        height:400
    })
}

function selectionOnClick(info,tab){
    console.log(info.selectionText);
    generateQRCode(info.selectionText);
}

function linkOnClick(info,tab){
    console.log(info.linkUrl);
    generateQRCode(info.linkUrl);
}

function imageOnClick(info,tab){
    console.log(info.srcUrl);
    generateQRCode(info.srcUrl);
}


var contexts=["selection","link","image"];
for(var i=0;i<contexts.length;i++){
    var ctx = contexts[i];
    var title='Generate selection text QR Code';
    var fnc = selectionOnClick;
    switch(i){
        case 1:
            title='Generate link url QR code';
            fnc = linkOnClick;
            break;
        case 2:
            title='Generate Image URL QR code';
            fnc = imageOnClick;
            break;
    }

    chrome.contextMenus.create({
        title:title,
        contexts:[ctx],
        onclick:fnc
    });
    console.log(ctx);

}
