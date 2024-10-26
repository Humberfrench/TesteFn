/// <reference path="../lib/ajax.js" />
/// <reference path="../clientes/fi.clientes.main.js" />
var Beneficiarios = new Object();

// Definindo a classe Beneficiario
class Beneficiario
{
    constructor(beneficiarioId, clienteId, nome, cpf, ativo)
    {
        this.BeneficiarioId = beneficiarioId;
        this.ClienteId = clienteId;
        this.Nome = nome;
        this.CPF = cpf;
        this.Ativo = ativo;
    }
}

// Criando um array para armazenar os beneficiários
Beneficiarios.Items = [];
$(document).ready(function ()
{
    for (item = 0; item < objBenef.length; item++)
    {
        Beneficiarios.Items.push(new Beneficiario(objBenef[item].BeneficiarioId,
            objBenef[item].ClienteId,
            objBenef[item].NomeBeneficiario,
            objBenef[item].CpfBeneficiario, 1));
    }
    $("#Erro").hide();

});

Beneficiarios.Open = function ()
{
    var id = $("#Id").val();

    $("#botaoBeneficiarioIncluir").show();
    $("#botaoBeneficiarioAlterar").hide();

    $("#modalBeneficiarios").modal('show');
}

Beneficiarios.Incluir = function ()
{
    const beneficiarioId = 0;
    const idCliente = $("#IdCliente").val();
    const nome = $("#NomeBeneficiario").val();
    const cpf = $("#CpfBeneficiario").val();

    if (nome === '')
    {
        Beneficiarios.Erro("O nome do beneficiário deve ser informado");
        return;
    }
    if (cpf === '')
    {
        Beneficiarios.Erro("O CPF do beneficiário deve ser informado");
        return;
    }

    const cpfValido = Beneficiarios.ValidarCPF(cpf);
    if (!cpfValido)
    {
        return;
    }


    Beneficiarios.AddBeneficiario(beneficiarioId, idCliente, nome, cpf, 1);

    $("#IdBeneficiario").val('0');
    $("#NomeBeneficiario").val('');
    $("#CpfBeneficiario").val('');
    $("#botaoBeneficiarioGravar").text("Incluir");
    Beneficiarios.ErroOk();
}

Beneficiarios.AddBeneficiario = function (beneficiarioId, idCliente, nome, cpf, ativo)
{
    const novoBeneficiario = new Beneficiario(beneficiarioId, idCliente, nome, cpf, ativo);
    Beneficiarios.Items.push(novoBeneficiario);

    Beneficiario.AddLinhaTabela(novoBeneficiario);
}

Beneficiarios.DelBeneficiario = function (beneficiarioId)
{
    const idCliente = $("#IdCliente").val();
    const id = parseInt(beneficiarioId)
    const index = Beneficiarios.Items.findIndex(b => b.BeneficiarioId === id);
    if (index !== -1)
    {
        Beneficiarios.Items.splice(index, 1); // Remove o beneficiário encontrado
    }

    //add de novo, mas como não ativo para remover da base.
    const beneficiarioToDelete = new Beneficiario(beneficiarioId, idCliente, '', '', 0);
    Beneficiarios.Items.push(beneficiarioToDelete);

    $('#gridBeneficiarios tbody tr[data-id="${beneficiarioId}"]').remove();

}
Beneficiarios.AlterarDados = function (beneficiarioId, idCliente, nome, cpf)
{
    $("#IdBeneficiario").val(beneficiarioId);
    $("#IdCliente").val(idCliente);
    $("#NomeBeneficiario").val(nome);
    $("#CpfBeneficiario").val(cpf);
    $("#botaoBeneficiarioIncluir").hide();
    $("#botaoBeneficiarioAlterar").show();

}
Beneficiarios.Alterar = function ()
{
    const beneficiarioId = parseInt($("#IdBeneficiario").val());
    const idCliente = $("#IdCliente").val();
    const nome = $("#NomeBeneficiario").val();
    const cpf = $("#CpfBeneficiario").val();

    const index = Beneficiarios.Items.findIndex(b => b.BeneficiarioId === beneficiarioId);
    if (index !== -1)
    {
        Beneficiarios.Items.splice(index, 1); // Remove o beneficiário encontrado
    }

    //remove da tabela
    $('#gridBeneficiarios tbody tr[data-id="${beneficiarioId}"]').remove();

    const novoBeneficiario = new Beneficiario(beneficiarioId, idCliente, nome, cpf, 1);
    Beneficiarios.Items.push(novoBeneficiario);
    //adiciona de novo
    Beneficiario.AddLinhaTabela(novoBeneficiario);



    $("#IdBeneficiario").val('0');
    $("#NomeBeneficiario").val('');
    $("#CpfBeneficiario").val('');

    $("#botaoBeneficiarioIncluir").show();
    $("#botaoBeneficiarioAlterar").hide();

}

Beneficiarios.Erro = function (mensagem)
{
    $("#ErroText").text(mensagem);
    $("#Erro").show();

}

Beneficiarios.ErroOk = function ()
{
    $("#Erro").hide();
}

Beneficiarios.ValidarCPF = function (cpf)
{
    const cpfValido = Cliente.ValidarCPF(cpf);
    if (!cpfValido)
    {
        Beneficiarios.Erro("O CPF informado não é válido");
        return false;
    }

    //


    let cpfLimpo = cpf.replace(/[.-]/g, ''); // Remove '.' e '-'

    var opcoes = new Object;
    opcoes.url = '/Cliente/VerificaCpf/' + cpfLimpo;
    opcoes.callBackSuccess = function (response)
    {
        var dataObj = eval(response);
        if (dataObj.Retorno !== false)
        {
            Beneficiarios.Erro(dataObj.Mensagem);
            return false;
        }
        return true;
    };

    opcoes.dadoEnvio = new Object;

    Ajax.Get(opcoes);

    return true;

}

Beneficiario.AddLinhaTabela = function (beneficiario)
{
    // Seleciona o corpo da tabela
    const tbody = document.querySelector('#gridBeneficiarios tbody');

    // Cria uma nova linha
    const novaLinha = document.createElement('tr');

    //vincular o id
    novaLinha.dataset.id = beneficiario.BeneficiarioId; // Aqui você vincula o atributo data-id

    // Cria as células da linha
    const celulaCpf = document.createElement('td');
    celulaCpf.textContent = Cliente.MascaraCPF(beneficiario.CPF);

    const celulaNome = document.createElement('td');
    celulaNome.textContent = beneficiario.Nome;

    const celulaAcoes = document.createElement('td');
    celulaAcoes.innerHTML = '<button type="button" class="btn btn-outline-success" onclick="Beneficiarios.AlterarDados("' + beneficiario.BeneficiarioId +
        '","' + beneficiario.ClienteId + '","' + beneficiario.NomeBeneficiario + '","' + beneficiario.CpfBeneficiario + '" )" > Alterar</button>';

    const celulaAcoes2 = document.createElement('td');
    celulaAcoes2.innerHTML = '<button type="button" class="btn btn-outline-danger" onclick="Beneficiarios.DelBeneficiario("' + beneficiario.BeneficiarioId + '")">Excluir</button>';

    // Adiciona as células à nova linha
    novaLinha.appendChild(celulaCpf);
    novaLinha.appendChild(celulaNome);
    novaLinha.appendChild(celulaAcoes);
    novaLinha.appendChild(celulaAcoes2);

    // Adiciona a nova linha ao corpo da tabela
    tbody.appendChild(novaLinha);

    Beneficiarios.ErroOk();
}

