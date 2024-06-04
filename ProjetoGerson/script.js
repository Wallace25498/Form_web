$(document).ready(function(){
    // Formatar telefone
    $('#telefone').on('input', function(){
        var number = $(this).val().replace(/\D/g, '');
        if(number.length > 0){
            number = number.match(/.{1,2}/g).join(' ').substr(0, 14);
        }
        $(this).val(number);
    });

    // Formatar CEP e buscar endereço
    $('#cep').on('input', function(){
        var cep = $(this).val().replace(/\D/g, '');
        if(cep.length == 8){
            cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
            buscarEndereco(cep);
        }
        $(this).val(cep);
    });

    // Buscar endereço com base no CEP
    function buscarEndereco(cep) {
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            dataType: 'json',
            success: function(data){
                if(!data.erro){
                    preencherEndereco(data);
                }
            }
        });
    }

    // Preencher campos de endereço
    function preencherEndereco(endereco) {
        $('#endereco').val(endereco.logradouro);
        $('#bairro').val(endereco.bairro);
        $('#cidade').val(endereco.localidade);
        $('#estado').val(endereco.uf);
    }

    // Validar e-mail
    $('#email').on('blur', function(){
        var email = $(this).val();
        if(email !== ""){
            if(!validarEmail(email)){
                alert("Por favor, insira um endereço de e-mail válido.");
                $(this).val("");
                $(this).focus();
            }
        }
    });

    // Função para validar e-mail
    function validarEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Limpar formulário
    $('button[type="reset"]').on('click', function(){
        $('input, select').val('');
    });

    // Enviar formulário
    $('#cadastroForm').on('submit', function(event){
        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        alert("Formulário enviado!");
        // Por exemplo:
        // $.post('recebe_dados.php', $(this).serialize(), function(response){
        //     console.log(response);
        // });
    });
});
