var Ajax = new Object;

Ajax.Execute = function (opcoes)
{
    var url = opcoes.url;
    var dadoEnvio = JSON.stringify(opcoes.dadoEnvio);
    var headers = opcoes.headers;
    var callBackSuccess = opcoes.callBackSuccess;
    var type = opcoes.type;
    var async = opcoes.async;

    if (opcoes.dadoEnvio == undefined) dadoEnvio = '';
    if (opcoes.headers == undefined) headers = '';
    if (opcoes.type == undefined) type = 'GET';
    if (opcoes.async == undefined) async = false;

    $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        data: dadoEnvio,
        headers: headers,
        cache: 'false',
        contentType: 'application/json; charset=utf-8',
        async: async,
        success: callBackSuccess,
        error: function (xhr, msg, e)
        {
            // stuff
            Mensagens.Erro(e, "Erro");
        }
    });

}

Ajax.Get = function (opcoes)
{
    var url = opcoes.url;
    var dadoEnvio = opcoes.dadoEnvio;
    var callBackSuccess = opcoes.callBackSuccess;

    if (opcoes.dadoEnvio == undefined) dadoEnvio = '';

    $.get(url, dadoEnvio)
    .done(callBackSuccess)
    .fail(function (jqxhr, textStatus, error)
    {
        Mensagens.Erro(error, "Erro");
    });
}


Ajax.Post = function (opcoes)
{
    var url = opcoes.url;
    var dadoEnvio = opcoes.dadoEnvio;
    var callBackSuccess = opcoes.callBackSuccess;

    if (opcoes.dadoEnvio == undefined) dadoEnvio = '';

    $.post(url, dadoEnvio)
    .done(callBackSuccess)
    .fail(function (jqxhr, textStatus, error)
    {
        Mensagens.Erro(error, "Erro");
    });
}