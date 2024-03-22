using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MojiTroškovi.Models
{
    public class Income
    {
        public int Id_Income { get; set; }
        public string Month { get; set; }
        public string Description { get; set; }
        public string Sum { get; set; }

        public int Id_User { get; set; }

        public override string ToString()
        {
            return Sum;
        }

    }

}
