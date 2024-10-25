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
            BeneficiarioId = id;
            ClienteId = idCliente;
            CpfBeneficiario = cpf;
            NomeBeneficiario = nome;
        }
        public BeneficiarioModel(Beneficiario beneficiario)
        {
            BeneficiarioId = beneficiario.Id;
            ClienteId = beneficiario.IdCliente;
            CpfBeneficiario = beneficiario.Cpf;
            NomeBeneficiario = beneficiario.Nome;

        }
        public long BeneficiarioId { get; set; }
        public long ClienteId { get; set; }

        /// <summary>
        /// Cpf
        /// </summary>
        [Required]
        public string CpfBeneficiario { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string NomeBeneficiario { get; set; }

        public bool Ativo { get; set; }


    }
}