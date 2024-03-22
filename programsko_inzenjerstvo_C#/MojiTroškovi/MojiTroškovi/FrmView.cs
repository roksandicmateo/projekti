using DBLayer;
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
    public partial class FrmView : Form
    {
        public FrmView()
        {
            InitializeComponent();
        }

        private DataGridView GetDgvIncome()
        {
            return dgvIncome;
        }
         public void RefreshData()
        {
            List<Income> incomes = IncomesRepository.GetIncomes();
            dgvIncome.DataSource = incomes;
        }

         
        private void FrmView_Load(object sender, EventArgs e)
        {
            RefreshData();
        }

        private void btnAdd_MouseClick(object sender, MouseEventArgs e)
        {
            var entry = new FrmEntry();
            entry.FormClosed += FrmEntry_FormClosed;
            entry.ShowDialog();
        }
       

        private void FrmEntry_FormClosed(object sender, FormClosedEventArgs e)
        {
            RefreshData();
        }

        private void FrmEdit_FormClosed(object sender, FormClosedEventArgs e)
        {
            RefreshData();
        }

        private void btnSearch_MouseClick(object sender, MouseEventArgs e)
        {
            string month = txtSearch.Text;
            List<Income> income = IncomesRepository.GetIncomesByMonth(month);
            dgvIncome.DataSource = income;
        }

        private void btnChange_MouseClick(object sender, MouseEventArgs e)
        {
            Income selectedIncome = dgvIncome.CurrentRow.DataBoundItem as Income;
            if (selectedIncome != null)
            {
                FrmEdit frmEdit = new FrmEdit(selectedIncome);
                frmEdit.SelectedIncome = selectedIncome;
                frmEdit.FormClosed += FrmEdit_FormClosed;
                frmEdit.ShowDialog();
            }
        }

    }
}
