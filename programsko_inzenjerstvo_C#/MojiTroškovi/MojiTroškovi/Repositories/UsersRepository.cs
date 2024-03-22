using DBLayer;
using MojiTroškovi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MojiTroškovi.Repositories
{
    public static class UsersRepository
    {
        public static User GetUser(int id)
        {
            User user = null;
            string sql = $"SELECT * FROM Users WHERE Id = {id}";
            DB.OpenConnection();
            var reader = DB.GetDataReader(sql);
            if (reader.HasRows)
            {
                reader.Read();
                user = CreateObject(reader);
                reader.Close();
            }
            DB.CloseConnection();
            return user;
        }

        public static List<User> GetUsers()
        {
            List<User> users = new List<User>();
            string sql = "SELECT * FROM Users";
            DB.OpenConnection();
            var reader = DB.GetDataReader(sql);
            while (reader.Read())
            {
                User user = CreateObject(reader);
                users.Add(user);
            }
            reader.Close();
            DB.CloseConnection();
            return users;
        }

        private static User CreateObject(SqlDataReader reader)
        {
            int id = int.Parse(reader["Id"].ToString());
            string firstName = reader["FirstName"].ToString();
            string lastName = reader["LastName"].ToString();
            var user = new User()
            {
                Id = id,
                FirstName = firstName,
                LastName = lastName
            };
            return user;
        }
    }
}
