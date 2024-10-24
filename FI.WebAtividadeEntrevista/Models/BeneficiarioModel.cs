using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public BeneficiarioModel()
        {
            
        }
        public BeneficiarioModel(long id, long idCliente,string nome, string cpf)
        {
            Id = id;
            IdCliente = idCliente;
            Cpf = cpf;
            Nome = nome;
        }
        public BeneficiarioModel(Beneficiario beneficiario)
        {
            Id = beneficiario.Id;
            IdCliente = beneficiario.IdCliente;
            Cpf = beneficiario.Cpf;
            Nome = beneficiario.Nome;

        }
        public long Id { get; set; }
        public long IdCliente { get; set; }

        /// <summary>
        /// Cpf
        /// </summary>
        [Required]
        public string Cpf { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

    }
}