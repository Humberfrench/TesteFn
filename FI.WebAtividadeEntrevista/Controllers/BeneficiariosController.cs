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
        public JsonResult BeneficiarioList(long id)
        {
            try
            {
                var beneficiarios = new BoBeneficiario().Pesquisa(id);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet, Route("Get/{id}")]
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
                    Id = model.BeneficiarioId,
                    Nome = model.NomeBeneficiario,
                    Cpf = model.CpfBeneficiario,
                    IdCliente = model.ClienteId,
                };
                if (model.BeneficiarioId == 0)
                {
                    id = bo.Incluir(beneficiario);
                    mensagem = "Registro incluso com sucesso.";
                }
                else
                {
                    bo.Alterar(beneficiario);
                    mensagem = "Registro alterado com sucesso.";
                }

                return Json(new { Result = "OK", Message = mensagem }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost, Route("Excluir/{id}")]
        public JsonResult Excluir(long id)
        {
            try
            {
                var bo = new BoBeneficiario();
                bo.Excluir(id);

                return Json(new { Result = "OK", Message = "Registro Excluido com sucesso" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

    }
}