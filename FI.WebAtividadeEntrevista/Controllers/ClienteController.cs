using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Extensions;
using FI.WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    [RoutePrefix("Cliente")]
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            var model = new ClienteModel();
            return View(model);
        }


        [HttpGet]
        [Route("VerificaCpf/{cpf}")]
        public JsonResult VerificaCpf(string cpf)
        {
            BoCliente bo = new BoCliente();

            var existe = bo.VerificarExistencia(cpf.TratarCpf());
            if (!existe)
            {
                return Json(new { Retorno = true, Message = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Retorno = false, Message = "CPF ja Cadastrado na base, por favor verifique" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("Incluir")]

        public JsonResult Incluir(ClienteModel model)
        {
            var bo = new BoCliente();
            var boBenef = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var existe = bo.VerificarExistencia(model.Cpf.TratarCpf());
                if (existe)
                {
                    Response.StatusCode = 400;
                    return Json(string.Join(Environment.NewLine, "CPF ja Cadastrado na base, por favor verifique"));
                }


                model.Id = bo.Incluir(new Cliente()
                {
                    Cpf = model.Cpf.TratarCpf(),
                    CEP = model.CEP.TratarCep(),
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone.TratarTelefone()
                });
                if (model.Beneficiarios.Any())
                {
                    //incluir os Beneficiários.
                    var beneficiarios = new List<Beneficiario>();
                    model.Beneficiarios.ForEach(b =>
                    {
                        var benef = new Beneficiario(b.BeneficiarioId,
                                                     model.Id,
                                                     b.CpfBeneficiario,
                                                     b.NomeBeneficiario);
                        //incluir
                        boBenef.Incluir(benef);
                    });

                }
                return Json("Cadastro efetuado com sucesso", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("Alterar")]
        public JsonResult Alterar(ClienteModel model)
        {
            var bo = new BoCliente();
            var boBenef = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bo.Alterar(new Cliente()
                {
                    Id = model.Id,
                    Cpf = model.Cpf.TratarCpf(),
                    CEP = model.CEP.TratarCep(),
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone.TratarTelefone()
                });

                if (model.Beneficiarios.Any())
                {
                    //incluir os Beneficiários.
                    var beneficiarios = new List<Beneficiario>();
                    //Não altero, quando é alterado simplesmente removo e incluo de novo
                    //Remover
                    model.Beneficiarios.Where(b => !b.Ativo).ToList().ForEach(b =>
                    {
                        var benef = new Beneficiario(b.BeneficiarioId,
                                                     model.Id,
                                                     b.CpfBeneficiario,
                                                     b.NomeBeneficiario);
                        //incluir
                        boBenef.Incluir(benef);
                    });

                    //Adicionar
                    model.Beneficiarios.Where(b => b.Ativo).ToList().ForEach(b =>
                    {
                        var benef = new Beneficiario(b.BeneficiarioId,
                                                     model.Id,
                                                     b.CpfBeneficiario,
                                                     b.NomeBeneficiario);
                        //incluir
                        boBenef.Incluir(benef);
                    });

                }

                return Json("Cadastro alterado com sucesso", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("Alterar/{id}")]
        public ActionResult Alterar(long id)
        {
            var bo = new BoCliente();
            var bb = new BoBeneficiario();
            var cliente = bo.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    Cpf = cliente.Cpf.TratarCpf(),
                    CEP = cliente.CEP.TratarCep(),
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone.TratarTelefone()
                };

            }

            var beneficiarios = bb.Pesquisa(cliente.Id);
            foreach (var item in beneficiarios)
            {
                model.Beneficiarios.Add(new BeneficiarioModel(item));
            }
            return View(model);
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
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

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}