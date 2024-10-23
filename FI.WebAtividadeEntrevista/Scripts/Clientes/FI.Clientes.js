
$(document).ready(function ()
{
    $('#formCadastro').submit(function (e)
    {
        if (!Cliente.VerificarCPF())
        {
            e.preventDefault();
            return false;
        }

        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Cpf": $(this).find("#Cpf").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
                function (r)
                {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r)
                {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
    })

})

function ModalDialog(titulo, texto)
{
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

//Para só numeros nop CPF
var Cliente = new Object();

Cliente.SomenteNumeros = function (eventField)
{
    var evt = (eventField) ? eventField : window.event;
    var charCode = (eventField.which) ? eventField.which : eventField.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
};

Cliente.MascaraCPF = function (cpf)
{
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o hífen
};

Cliente.MascaraCEP = function (cep)
{
    // Remove caracteres não numéricos
    cep = cep.replace(/\D/g, '');

    // Aplica a máscara
    return cep.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen
};

Cliente.ValidarCPF = function (cpf)
{
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
    {
        return false; // CPF inválido
    }

    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++)
    {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
    {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9)))
    {
        return false; // Primeiro dígito verificador inválido
    }

    // Reseta a soma para validar o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++)
    {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
    {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10)))
    {
        return false; // Segundo dígito verificador inválido
    }

    return true; // CPF válido
}
Cliente.VerificarCPF = function ()
{
    const cpfInput = document.getElementById('Cpf');
    if (cpfInput.value == '')
    {
        ModalDialog("Ocorreu um erro", 'CPF não preenchido');
        return false;
    }

    const resultado = Cliente.ValidarCPF(cpfInput.value);
    const mensagem = document.getElementById('mensagem');

    if (!resultado)
    {
        ModalDialog("Ocorreu um erro", 'CPF Inválido');
        cpfInput.focus();
        return false;
    }
    return true;
}

Cliente.AplicarMascaraTelefone = function(event)
{
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Aplica a máscara
    if (value.length > 10)
    {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6)
    {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2)
    {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0)
    {
        value = value.replace(/^(\d{0,2})$/, '($1');
    }

    input.value = value; // Atualiza o valor do input
}