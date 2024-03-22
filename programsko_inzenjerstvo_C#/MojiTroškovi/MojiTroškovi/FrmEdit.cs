using MojiTroškovi.Models;
using MojiTroškovi.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MojiTroškovi
{
    public partial class FrmEdit : Form
    {
        public FrmEdit(Models.Income selectedIncome)
        {
            InitializeComponent();
        }

        private Income selectedIncome;

        public Income SelectedIncome
        {
            get { return selectedIncome; }
            set
            {
                selectedIncome = value;
                dgvEdit.DataSource = new List<Income> { selectedIncome };
            }
        }

        private void btnSave_MouseClick(object sender, MouseEventArgs e)
        {
            Income editedIncome = dgvEdit.Rows[0].DataBoundItem as Income;

            if (editedIncome != null)
            {
                IncomesRepository.UpdateIncome(editedIncome);
                MessageBox.Show("Prihod uspješno promijenjen!");
                this.Close();
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            Income editedIncome = dgvEdit.Rows[0].DataBoundItem as Income;
            DialogResult result = MessageBox.Show("Jeste li sigurni da želite izbrisati ovaj prihod?", "Brisanje", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

            if (result == DialogResult.Yes)
            {

                IncomesRepository.DeleteIncome(editedIncome);

                MessageBox.Show("Prihod je uspješno izbrisan!");
                this.Close();
            }
        }
    }
}
