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

Cliente.MascaraTelefone = function (telefone)
{
    // Remove caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');

    // Aplica a máscara
    if (telefone.length > 10)
    {
        return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (telefone.length > 6)
    {
        return telefone.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    } else if (telefone.length > 2)
    {
        return telefone.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (telefone.length > 0)
    {
        return telefone.replace(/^(\d{0,2})$/, '($1');
    }

    return telefone; // Retorna o valor sem formatação se não houver dígitos
};