/// <reference path="../lib/ajax.js" />
var Beneficiarios = new Object();


Beneficiarios.Open = function ()
{
    var id = $("#Id").val();

    $("#modalBeneficiarios").modal('show');
}

Beneficiarios.Load = function (id)
{
    var opcoes = new Object;
    opcoes.url = 'Obter';

    opcoes.callBackSuccess = function (response)
    {
        var dataObj = eval(response);
        Crianca.NumeroMaximoCricancas = dataObj.NumeroMaximoCricancas;
        Crianca.CalcadoLimite = dataObj.NumeroMaximoCricancas;
    }

    Ajax.Get(opcoes);
}

Beneficiarios.LoadTable = function (id)
{
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting            
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Cpf: {
                    title: 'Cpf',
                    width: '15%'
                },
                Nome: {
                    title: 'Nome',
                    width: '40%'
                },
                Alterar: {
                    width: '10%',
                    title: 'A&ccedil;&atilde;oes',
                    display: function (data)
                    {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-md">Alterar</button>';
                    }
                },
                Excluir: {
                    width: '10%',
                    title: 'A&ccedil;&atilde;oes',
                    display: function (data)
                    {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-md">Excluir</button>';
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');

}
