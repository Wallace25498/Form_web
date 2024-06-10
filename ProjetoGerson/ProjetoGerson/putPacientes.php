<?php
// Verificação de campos faltando

$camposNecessarios = [
    'paciente', 'sexo', 'genero', 'rg', 'cns', 'dataNascimento', 
    'telefone', 'nomeMae', 'cep', 'numero', 
    'complemento', 'doenca'
];

$camposFaltando = [];

foreach ($camposNecessarios as $campo) {
    if (empty($_POST[$campo])) {
        $camposFaltando[] = $campo;
    }
}

if (!empty($camposFaltando)) {
    echo json_encode(["status" => "error", "message" => "Os seguintes campos estão faltando: " . implode(", ", $camposFaltando)]);
    exit;
}

// Conexao com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cadastro_pacientes";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexao
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Falha na conexão: " . $conn->connect_error]));
}

// Recebe os dados do formulario
$paciente = $_POST['paciente'];
$sexo = $_POST['sexo'];
$genero = $_POST['genero'];
$rg = $_POST['rg'];
$cns = $_POST['cns'];
$dataNascimento = $_POST['dataNascimento'];
$telefone = $_POST['telefone'];
$nomeMae = $_POST['nomeMae'];
$cep = $_POST['cep'];
$numero = $_POST['numero'];
$complemento = $_POST['complemento'];
$email = !empty($_POST['email']) ? $_POST['email'] : null;
$doenca = $_POST['doenca'];

// Prepara e executa a query SQL para inserir os dados no banco de dados
$sql = "INSERT INTO pacientes (nome, sexo, genero, rg, cns, data_nascimento, telefone, nome_mae, cep, numero, complemento, email, doenca)
VALUES ('$paciente', '$sexo', '$genero', '$rg', '$cns', '$dataNascimento', '$telefone', '$nomeMae', '$cep', '$numero', '$complemento', '$email', '$doenca')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Novo paciente cadastrado com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao cadastrar paciente: " . $conn->error]);
}

$conn->close();
?>
