using DBLayer;
using MojiTroškovi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Runtime.Remoting.Messaging;
using System.Windows.Forms;

namespace MojiTroškovi.Repositories
{
    public class IncomesRepository
    {
        public static List<Income> GetIncomes()
        {
            List<Income> incomes = new List<Income>();

            string sql = "SELECT * FROM Income";
            //string sql2 = "INSERT INTO Income (Month, Description, Sum, Id_User) VALUES ('ccc', 'ccc', 30, 1)";
            DB.SetConfiguration("IPS23_mroksandi21", "mroksandi21", "NEkI#8tL");
            DB.OpenConnection();

            DB.ExecuteCommand(sql);

            var reader = DB.GetDataReader(sql);

            while (reader.Read())
            {
                Income income = CreateObject(reader);
                incomes.Add(income);
            }

            reader.Close();
            DB.CloseConnection();
            return incomes;
        }

        private static Income CreateObject(SqlDataReader reader)
        {

            int id = int.Parse(reader["Id_Income"].ToString());
            string month = reader["Month"].ToString();
            string description = reader["Description"].ToString();
            string sum = reader["Sum"].ToString();

            var income = new Income()
            {
                Id_Income = id,
                Month = month,
                Sum = sum,
                Description = description
            };

            return income;
        }

        public static List<Income> GetIncomesByMonth(string month)
        {
            List<Income> incomes = new List<Income>();
            string v = $"SELECT * FROM dbo.Income WHERE Month = '{month}'";
            string sql = v;
            DB.OpenConnection();
            var reader = DB.GetDataReader(sql);
            while (reader.Read())
            {
                Income income = CreateObject(reader);
                incomes.Add(income);
            }
            reader.Close();
            DB.CloseConnection();
            return incomes;
        }
        public static void UpdateIncome(Income income)
        {
            DB.SetConfiguration("IPS23_mroksandi21", "mroksandi21", "NEkI#8tL");
            string sql = $"UPDATE Income SET Month = '{income.Month}', Description = '{income.Description}', Sum = '{income.Sum}' WHERE ID_Income = {income.Id_Income}";
            DB.OpenConnection();
            DB.ExecuteCommand(sql);
            DB.CloseConnection();
            return;
        }

        public static void DeleteIncome(Income income)
        {
            DB.SetConfiguration("IPS23_mroksandi21", "mroksandi21", "NEkI#8tL");
            string sql = $"DELETE FROM Income WHERE ID_Income = {income.Id_Income}";
            DB.OpenConnection();
            DB.ExecuteCommand(sql);
            DB.CloseConnection();
            return;
        }


    }
}
