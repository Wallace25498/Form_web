$(document).ready(function(){
    // Formatar telefone
    $('#telefone').on('input', () => {
        /* está funcionando mas quero fazer do mesmo modo que o cep formata
        obs.: mudar de input para focusout
        var number = $("#telefone").val().replace(/ /g, "");
        if(number.length > 0 && number.length < 11){

            //number = number.match(/.{2}/g).join(' ').match(/.{8}/g).join("-");
            number = "(" + number.slice(0,2) + ") " + number.slice(2,7) + "-" + number.slice(7,11)
            
            $("#telefone").val(number);
        }else{
            window.alert("insira um numero válido")
        }
        */

        //limita o numero de caracteres
        if(number.length > 11){
            number = number.slice(0,11);
        }

        //recebe o valor do input
        var number = $("#telefone").val().replace(/\D/g, '');
        
        // verifica a largura e formata mas para telefones não celular
        if(number.length == 10){
            number = number.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }

        //verifica se o valor tem a largura valida e formata
        if(number.length == 11){
            number = number.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

        }
        
        $("#telefone").val(number);

    });

    //formatação do Cns conforme entra com os valores
    $('#cns').on('input', function(){

        //pega o valor do insert
        var cns = $("#cns").val().replace(/\D/g, '');

        //verifica se não ultrapassou o limite e limita para 15 caracteres
        if(cns.length > 15){
            cns = cns.slice(0,15);
        }

        // formatacao entre quantidades especificas de caracteres e ordenado 
        // do maior para o menor para evitar um buggar o outro aumentando o 
        // tamanho quando insere os espaços
        if(cns.length >= 12 && cns.length <= 15){
            cns = cns.slice(0,3) + " " + cns.slice(3,7) + " " + cns.slice(7,11) + " " + cns.slice(11,15);
           
        }

        if(cns.length > 7 && cns.length <= 10){
            cns = cns.slice(0,3) + " " + cns.slice(3,7) + " " + cns.slice(7,11);
            
        }

        if(cns.length >= 4 && cns.length <= 6){
            cns = cns.slice(0,3) + " " + cns.slice(3,7);
            
        }
        
        //muda o valor do campo
        $("#cns").val(cns);
    });

    // Formatar RG 
    $('#rg').on('input', function(){
        //pega o valor do insert
        var rg = $(this).val().replace(/\D/g, '');

        //limita numero de caracteres
        if(number.length > 11){
            number = number.slice(0,11);
        }

        //se for com 2 digitos no inicio formata: 00.000.000-00
        if(rg.length == 10){
            rg = rg.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            buscarEndereco(rg);
        }
        //se for com 3 digitos no inicio formata: 000.000.000-00
        if(rg.length == 11){
            rg = rg.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            buscarEndereco(rg);
        }

        //muda o valor do campo
        $("#rg").val(rg);
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
