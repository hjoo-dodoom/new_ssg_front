function box_alert(txt, boxType, boxTitle, callbackMethod, jsonData)
{
    if (boxType == '' || boxType == undefined) boxType = 'alert';
    if (boxTitle == '' || boxTitle == undefined) boxTitle = '알림';

    $(':focus').blur();

    setTimeout(function() {
        modal({
            type: boxType,
            title: boxTitle,
            text: txt,
            autoclose: false,
            closeClick: false,
            callback: function()
            {
                if (callbackMethod)
                {
                    callbackMethod(jsonData);
                }
            }
        });
    }, 150);
}

function box_alert_autoclose(txt, boxType, boxTitle, callbackMethod, jsonData)
{
    if (boxType == '' || boxType == undefined) boxType = 'alert';
    if (boxTitle == '' || boxTitle == undefined) boxTitle = '알림';

    $(':focus').blur();

    setTimeout(function() {
        modal({
            type: boxType,
            title: boxTitle,
            text: txt,
            autoclose: true,
            closeClick: false,
            callback: function()
            {
                if (callbackMethod)
                {
                    callbackMethod(jsonData);
                }
            }
        });
        $('.modal .modal-header .modal-title').find('h3').remove();
    }, 150);
    
}

function box_alert_focus(txt, obj, boxType, boxTitle)
{
    if (boxType == '' || boxType == undefined) boxType = 'alert';
    if (boxTitle == '' || boxTitle == undefined) boxTitle = '알림';

    $(':focus').blur();

    setTimeout(function() {
        modal({
            type: boxType,
            title: boxTitle,
            text: txt,
            closeClick: false,
            callback: function()
            {
                obj.focus();
            }
        });
    }, 150);
}

// confirm, prompt
function box_confirm(txt, boxType, boxTitle, callbackMethod)
{
    if (boxType == '' || boxType == undefined) boxType = 'confirm';
    if (boxTitle == '' || boxTitle == undefined) boxTitle = '알림';

    $(':focus').blur();

    setTimeout(function() {
        modal({
            type: boxType,
            title: boxTitle,
            text: txt,
            closeClick: false,
            callback: function(result)
            {
                callbackMethod(result);
            }
        });
    }, 150);
}

function box_back()
{
    history.go(-1);
}

function box_alert_back(txt, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_back);
}

function box_close()
{
    window.close();
}

function box_alert_close(txt, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_close);
}

function box_redirect(data)
{
    if (data.url)
    {
        document.location.href = data.url;
    }
    return false;
}

function box_alert_redirect(txt, url, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_redirect, {url: url});
}

function box_opener_redirect(data)
{
    opener.location.href = data.url;
    window.close();
    return false;
}

function box_alert_opener_redirect(txt, url, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_opener_redirect, {url: url});
}

function box_replace(data)
{
    if (data.url)
    {
        document.location.replace(data.url);
    }
    return false;
}

function box_alert_replace(txt, url, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_replace, {url: url});
}

function box_reload()
{
    document.location.reload();
}

function box_alert_reload(txt, boxType, boxTitle)
{
    box_alert(txt, boxType, boxTitle, box_reload);
}