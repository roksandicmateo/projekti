const express = require('express');
const path = require('path');
const fs = require('fs');
const CsvManager = require('./CsvManager');

const app = express();
const port = 12456;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/autor', express.static(path.join(__dirname, 'dokumentacija')));
app.use('/dokumentacija', express.static(path.join(__dirname, 'dokumentacija')));
app.use('/jsk', express.static(path.join(__dirname, 'jsk')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/dokumenti', express.static(path.join(__dirname, 'dokumenti')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'dokumentacija')));
app.use(express.static(path.join(__dirname, 'ostalo')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/galerija', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'galerija.html'));
});

app.get('/vikendPonuda', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'ponuda1.html'));
});

app.get('/suitePonuda', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'ponuda2.html'));
});

app.get('/breakFromWorkPonuda', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'ponuda3.html'));
});

app.get('/rezervacija', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'rezervacija.html'));
});

app.get('/autor', (req, res) => {
  res.sendFile(path.join(__dirname, 'dokumentacija', 'autor.html'));
});

app.get('/dokumentacija', (req, res) => {
  res.sendFile(path.join(__dirname, 'dokumentacija', 'dokumentacija.html'));
});

app.get('/javascript', (req, res) => {
  res.sendFile(path.join(__dirname, 'jsk', 'mroksandi21.js'));
});

app.get('/dinamicna', (req, res) => {
  const cjenikPath = path.join(__dirname, 'podaci', 'cjenik.json');
  const headerPath = path.join(__dirname, 'podaci', 'header.txt');
  const footerPath = path.join(__dirname, 'podaci', 'footer.txt');

  fs.readFile(cjenikPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Greška prilikom čitanja cjenika.');
      return;
    }

    try {
      const cjenik = JSON.parse(data);
      const tabela = generateTable(cjenik);

      fs.readFile(headerPath, 'utf8', (err, headerData) => {
        if (err) {
          res.status(500).send('Greška prilikom čitanja headera.');
          return;
        }

        fs.readFile(footerPath, 'utf8', (err, footerData) => {
          if (err) {
            res.status(500).send('Greška prilikom čitanja footera.');
            return;
          }

          const pageContent = headerData + tabela + footerData;
          res.send(pageContent);
        });
      });
    } catch (error) {
      res.status(500).send('Greška prilikom parsiranja cjenika.');
    }
  });
});

function generateTable(cjenik) {
  let tableHTML = '<table>';
  tableHTML += '<tr><th>Usluga</th><th>Broj osoba</th><th>Cijena</th><th>Popust</th></tr>';

  for (const stavka of cjenik) {
    const { usluga, brojOsoba, cijena, popust } = stavka;
    tableHTML += `<tr><td>${usluga}</td><td>${brojOsoba}</td><td>${cijena}</td><td>${popust}</td></tr>`;
  }

  tableHTML += '</table>';
  return tableHTML;
}

app.route('/api/rezervacije')
  .get((req, res) => {
    const rezervacijeManager = new CsvManager('podaci/rezervacije.csv');

    rezervacijeManager.readData((rezervacije) => {
      if (rezervacije.length === 0) {
        res.status(500).json({ greska: 'Greška prilikom čitanja rezervacija.' });
        return;
      }

      res.status(200).json(rezervacije);
    });
  })
  .post((req, res) => {
    const { ime, email, telefon, datum, vrijeme, brojOsoba, napomena } = req.body;
    const rezervacija = {
      ime,
      email,
      telefon,
      datum,
      vrijeme,
      brojOsoba,
      napomena
    };
  
    const rezervacijeManager = new CsvManager('podaci/rezervacije.csv');
  
    rezervacijeManager.readData((rezervacije) => {
      rezervacije.push(rezervacija);
  
      rezervacijeManager.writeData(rezervacije, (success) => {
        if (!success) {
          console.error('Greška prilikom spremanja podataka.');
          res.status(417).json({ greska: 'Nevaljani podaci' });
        } else {
          res.status(200).json({ message: 'Podaci su dodani' });
        }
      });
    });
  })
  .put((req, res) => {
    const { ime, email, telefon, datum, vrijeme, brojOsoba, napomena } = req.body;
    const rezervacija = {
      ime,
      email,
      telefon,
      datum,
      vrijeme,
      brojOsoba,
      napomena
    };

    const rezervacijeManager = new CsvManager('podaci/rezervacije.csv');

    rezervacijeManager.readData((data) => {
      data.push(rezervacija);

      rezervacijeManager.writeData(data, (success) => {
        if (success) {
          res.send('Podaci uspješno ažurirani u CSV datoteci.');
        } else {
          res.status(500).send('Došlo je do pogreške pri ažuriranju podataka u CSV datoteci.');
        }
      });
    });
  })
  .delete((req, res) => {
    res.status(501).send('Metoda nije implementirana');
  });



  //ID

app.route('/api/rezervacije/:id')
  .get((req, res) => {
    const id = req.params.id;

    const rezervacijeManager = new CsvFileManager('podaci/rezervacije.csv');

    rezervacijeManager.readData((rezervacije) => {
      if (id >= 0 && id < rezervacije.length) {
        res.status(200).json(rezervacije[id]);
      } else {
        res.status(404).json({ greska: 'Nema resursa' });
      }
    });
  })
  .post((req, res) => {
    res.status(405).json({ greska: 'Metoda nije dopuštena' });
  })
  .put((req, res) => {
    res.status(501).json({ greska: 'Metoda nije implementirana' });
  })
  .delete((req, res) => {
    const id = req.params.id;

    const rezervacijeManager = new CsvFileManager('podaci/rezervacije.csv');

    rezervacijeManager.readData((rezervacije) => {
      if (id >= 0 && id < rezervacije.length) {
        rezervacije.splice(id, 1);

        rezervacijeManager.writeData(rezervacije, (success) => {
          if (!success) {
            console.error('Greška prilikom brisanja podataka.');
            res.status(417).json({ greska: 'Nevaljani podaci' });
          } else {
            res.status(200).json({ message: 'Podaci obrisani' });
          }
        });
      } else {
        res.status(417).json({ greska: 'Nevaljani podaci' });
      }
    });
  });

app.use((req, res, next) => {
  res.status(404).send('Stranica ne postoji');
});

app.listen(port, () => {
  console.log(`Server sluša na portu ${port}`);
});
