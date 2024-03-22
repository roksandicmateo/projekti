using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBLayer;
using System.Windows.Forms;

namespace MojiTroškovi
{
    public partial class FrmEntry : Form
    {
        public FrmEntry()
        {
            InitializeComponent();
        }

        private void btnEnter_MouseClick(object sender, MouseEventArgs e)
        {
            var month = txtMonth.Text.ToString();
            var description = txtDescription.Text.ToString();
            var sum = txtSum.Text;

            DB.SetConfiguration("IPS23_mroksandi21", "mroksandi21", "NEkI#8tL");
            DB.OpenConnection();

            string sql = $"INSERT INTO Income (Month, Description, Sum, Id_User) VALUES ('{month}', '{description}', {sum}, 1)";

            DB.ExecuteCommand(sql);

            DB.CloseConnection();

            this.Close();
        }
    }
}
