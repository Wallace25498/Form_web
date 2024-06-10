-- Criação do banco de dados (caso ainda não exista)
CREATE DATABASE IF NOT EXISTS cadastro_pacientes;

-- Usar o banco de dados
USE cadastro_pacientes;

-- Criação da tabela 'pacientes'
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    rg VARCHAR(10) NOT NULL UNIQUE,
    cns VARCHAR(12) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    nome_mae VARCHAR(50) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    complemento VARCHAR(50),
    email VARCHAR(50),
    doenca VARCHAR(50)
);
