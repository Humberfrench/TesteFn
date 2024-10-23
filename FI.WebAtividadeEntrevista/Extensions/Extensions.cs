using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FI.WebAtividadeEntrevista.Extensions
{
    public static class Extensions
    {
        public static string TratarCep(this string cep)
        {
            return cep.Replace("-", "");
        }
        public static string TratarTelefone(this string telefone)
        {
            return telefone.Replace("-", "").Replace("(","").Replace(")","").Replace(" ","");
        }
        public static string TratarCpf(this string cpf)
        {
            return cpf.Replace("-", "").Replace(".", "");
        }
    }
}