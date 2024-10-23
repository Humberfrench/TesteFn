using FI.AtividadeEntrevista.DAL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="Beneficiario">Objeto de Beneficiario</param>
        public long Incluir(Beneficiario Beneficiario)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            return beneficiario.Incluir(Beneficiario);
        }

        /// <summary>
        /// Altera um Beneficiario
        /// </summary>
        /// <param name="Beneficiario">Objeto de Beneficiario</param>
        public void Alterar(Beneficiario Beneficiario)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            beneficiario.Alterar(Beneficiario);
        }

        /// <summary>
        /// Consulta o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public Beneficiario Consultar(long id)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            return beneficiario.Consultar(id);
        }

        /// <summary>
        /// Excluir o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            beneficiario.Excluir(id);
        }

        /// <summary>
        /// Lista os Beneficiarios
        /// </summary>
        public List<Beneficiario> Listar()
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            return beneficiario.Listar();
        }

        /// <summary>
        /// Lista os Beneficiarios
        /// </summary>
        public List<Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            return beneficiario.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DaoBeneficiario beneficiario = new DaoBeneficiario();
            return beneficiario.VerificarExistencia(CPF);
        }
    }
}
