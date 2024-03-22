const fs = require('fs');

class CsvManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readData(callback) {
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Greška prilikom čitanja podataka iz CSV datoteke:', err);
        callback([]);
        return;
      }

      const lines = data.trim().split('\n');
      const records = [];

      for (let i = 0; i < lines.length; i++) {
        const values = lines[i].split(';');
        records.push(values);
      }

      callback(records);
    });
  }

  writeData(records, callback) {
    const lines = records.map((record) => Object.values(record).join(';')).join('\n');

    fs.writeFile(this.filePath, lines, 'utf8', (err) => {
      if (err) {
        console.error('Greška prilikom pisanja podataka u CSV datoteku:', err);
        callback(false);
        return;
      }

      callback(true);
    });
  }

  deleteData(callback) {
    fs.unlink(this.filePath, (err) => {
      if (err) {
        console.error('Greška prilikom brisanja CSV datoteke:', err);
        callback(false);
        return;
      }

      callback(true);
    });
  }
}

module.exports = CsvManager;
