using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;
using System;
using System.Web.Mvc;

namespace FI.WebAtividadeEntrevista.Controllers
{
    [RoutePrefix("Beneficiario")]
    public class BeneficiariosController : Controller
    {

        [HttpGet, Route("GetAll/{id}")]
        public JsonResult BeneficiarioList(long id, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                var beneficiarios = new BoBeneficiario().Pesquisa(id, jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
        [HttpGet, Route("Get/{id}/{id}")]
        public JsonResult BeneficiarioObter(int id)
        {
            try
            {
                var beneficiario = new BoBeneficiario().Consultar(id);

                var model = new BeneficiarioModel(beneficiario);

                return Json(new { Result = "OK", Records = model });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
        [HttpPost, Route("Gravar")]
        public JsonResult Gravar(BeneficiarioModel model)
        {
            try
            {
                var id = 0L;
                var mensagem = "";
                var bo = new BoBeneficiario();
                var beneficiario = new Beneficiario
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    Cpf = model.Cpf,
                    IdCliente = model.IdCliente,
                };
                if (model.Id == 0)
                {
                    id = bo.Incluir(beneficiario);
                    mensagem = "Registro incluso com sucesso.";
                }
                else
                {
                    bo.Alterar(beneficiario);
                    mensagem = "Registro alterado com sucesso.";
                }

                return Json(new { Result = "OK", Message = mensagem });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }
        [HttpPost, Route("Excluir/{id}")]
        public JsonResult Excluir(long id)
        {
            try
            {
                var bo = new BoBeneficiario();
                bo.Excluir(id);

                return Json(new { Result = "OK", Message = "Registro Excluido com sucesso" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }

    }
}