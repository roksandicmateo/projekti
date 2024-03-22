if (window.matchMedia("(max-width: 479px)").matches) {
  // dohvacanje tablice
  const tablica = document.querySelector('.tablica');
  const tbody = tablica.querySelector('tbody');

  // dohvacanje redaka
  const retci = Array.from(tbody.querySelectorAll('tr:not(:first-child)'));

  // dodatni element za informacije
  const dodatneInfo = document.createElement('div');
  dodatneInfo.id = 'dodatne-info';
  dodatneInfo.style.display = 'none'; // inicijalno skriven
  tablica.parentNode.insertBefore(dodatneInfo, tablica.nextSibling);

  // event listener za hover na redak
  retci.forEach(redak => {
    redak.addEventListener('mouseenter', () => {
      // dodatne informacije
      const dodatniSadrzaj = Array.from(redak.querySelectorAll('td')).map(td => td.innerText).join(' | ');
      dodatneInfo.innerHTML = dodatniSadrzaj;
      dodatneInfo.style.display = 'block';
    });

    redak.addEventListener('mouseleave', () => {
      dodatneInfo.style.display = 'none';
    });
  });

  // skrivanje dodatnih informacija kada se miš ne nalazi na tablici
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('.tablica') === null) {
      dodatneInfo.style.display = 'none';
    }
  });


}

  let errorDiv;

//PROVJERA KONTAKT

const form = document.getElementById('kontaktForma');
const submit = document.getElementById('submitBtn');


  submit.addEventListener('click', (event) => {

    const predmet = document.getElementById('predmet');
    const poruka = document.getElementById('poruka');
    const options = document.querySelectorAll('input[name="options"]');
    const unosPredmet = predmet.value;
    const unosPoruka = poruka.value;
    const regex = /[!?#<>]/g;
    let provjera = false;

    if (predmet.value.length == 0) {
      predmet.style.borderColor = 'red';
      event.preventDefault();
      showError("Molimo unesite predmet Vaše poruke.");
    }

    
options.forEach((option) => {
  if (option.checked) {
    provjera = true;
  }
});

if (provjera) {
  console.log('Opcija odabrana');
} else {event.preventDefault();
  showError('Potrebno je odabrati neku od opcija');
}  

     if (poruka.value.length == 0) {
      poruka.style.borderColor = 'red';
      event.preventDefault();
      showError("Molimo unesite Vašu poruku.");
    } 
    
  if (regex.test(unosPredmet)) {
    predmet.style.borderColor = 'red';
    event.preventDefault();
showError("Predmet poruke sadrži nedopušteni znak");
    

if (regex.test(unosPoruka) ) {
  poruka.style.borderColor = 'red';
  event.preventDefault();
showError("Poruka sadrži nedopušteni znak");    }

if (poruka.value.length < 10 || poruka.value.length > 1000) {
poruka.style.borderColor = 'red';
event.preventDefault();
showError("Poruka sadrži manje od 10 ili više od 1000 znakova");    }
    
    
  }});


    
    predmet.addEventListener('blur', (event) => {
      const predmet = document.getElementById('predmet');
      const unos = predmet.value;
      const regex = /[!?#<>]/g;
    
    if (regex.test(unos)) {
      predmet.style.borderColor = 'red';
      event.preventDefault();
  showError("Predmet poruke sadrži nedopušteni znak");    } 

  else{
    predmet.style.borderColor = 'black'}
      });


      poruka.addEventListener('blur', (event) => {
        const poruka = document.getElementById('poruka');
        const unos = poruka.value;
        const regex = /[!?#<>]/g;
      
      if (regex.test(unos) ) {
        poruka.style.borderColor = 'red';
        event.preventDefault();
    showError("Poruka sadrži nedopušteni znak");    }
    
     if (poruka.value.length < 10 || poruka.value.length > 1000) {
      poruka.style.borderColor = 'red';
      event.preventDefault();
  showError("Poruka sadrži manje od 10 ili više od 1000 znakova");    }
  else{
    poruka.style.borderColor = 'black'}
        });



  

//REZERVACIJA PROVJERA


const formR = document.getElementById('rezervacijaForma');
const submitR = document.getElementById('submitBtnR');
const resetR = document.getElementById('resetBtn');

resetR.addEventListener('click', (event) => {	
  const ime = document.getElementById('ime');
    const email = document.getElementById('email');
    const telefon = document.getElementById('telefon');
    const datum = document.getElementById('datum');
    const vrijeme = document.getElementById('vrijeme');
    const brojOsoba = document.getElementById('brojOsoba');
    const napomena = document.getElementById('napomena');

    ime.style.borderColor = 'black';      
    email.style.borderColor = 'black';      
    telefon.style.borderColor = 'black';      
    datum.style.borderColor = 'black';      
    vrijeme.style.borderColor = 'black';      
    brojOsoba.style.borderColor = 'black';      
    napomena.style.borderColor = 'black';      


});


submitR.addEventListener('click', (event) => {
    const ime = document.getElementById('ime');
    const email = document.getElementById('email');
    const telefon = document.getElementById('telefon');
    const datum = document.getElementById('datum');
    const vrijeme = document.getElementById('vrijeme');
    const brojOsoba = document.getElementById('brojOsoba');
    const napomena = document.getElementById('napomena');
    const unosIme = ime.value;
    const unosEmail = email.value;
    const unosTelefon = telefon.value;
    const unosNapomena = napomena.value;

  const regex = /[!?#<>]/g;

        
    if (ime.value.length == 0) {
      ime.style.borderColor = 'red';
        event.preventDefault();
        showError("Unesite ime");
    }
    
     if (email.value.length == 0) {
        email.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite email adresu");
    }
    
     if (telefon.value.length == 0) {
        telefon.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite email adresu");
    }
    
     if (datum.value == '') {
        datum.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite datum svog dolaska");
    }
    
     if (vrijeme.value == '') {
        vrijeme.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite vrijeme svog dolaska");
    }
    
     if (brojOsoba.value == '') {
        brojOsoba.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite broj osoba koje će boraviti");
    }
    
     if (napomena.value.length == '') {
        napomena.style.borderColor = 'red';      
        event.preventDefault();
        showError("Unesite napomenu");
    }

    if (regex.test(unosIme)) {
      ime.style.borderColor = 'red';
      event.preventDefault();
    showError("Ime ili prezime sadrži nedopušteni znak");    } 

    if (regex.test(unosEmail) ) {
      email.style.borderColor = 'red';
      event.preventDefault();
  showError("Email adresa sadrži nedopušteni znak");    }

  if (regex.test(unosTelefon) ) {
    email.style.borderColor = 'red';
    event.preventDefault();
showError("Broj telefona sadrži nedopušteni znak");    }

if (regex.test(unosNapomena) ) {
  napomena.style.borderColor = 'red';
  event.preventDefault();
showError("Napomena sadrži nedopušteni znak");    }
    
});

ime.addEventListener('blur', (event) => {
  const ime = document.getElementById('ime');
  const unos = ime.value;
  const regex = /[!?#<>]/g;

if (regex.test(unos)) {
  ime.style.borderColor = 'red';
  event.preventDefault();
showError("Ime ili prezime sadrži nedopušteni znak");    } 

else{
  ime.style.borderColor="black";
}
  });


  email.addEventListener('blur', (event) => {
    const email = document.getElementById('email');
    const unos = email.value;
    const regex = /[!?#<>]/g;
  
  if (regex.test(unos) ) {
    email.style.borderColor = 'red';
    event.preventDefault();
showError("Email adresa sadrži nedopušteni znak");    }

else{
  ime.style.borderColor="black";
}

    });

    telefon.addEventListener('blur', (event) => {
      const telefon = document.getElementById('telefon');
      const unos = telefon.value;
      const regex = /[!?#<>]/g;
    
    if (regex.test(unos) ) {
      telefon.style.borderColor = 'red';
      event.preventDefault();
  showError("Broj telefona sadrži nedopušteni znak");    }
  
      });

      napomena.addEventListener('blur', (event) => {
        const napomena = document.getElementById('napomena');
        const unos = napomena.value;
        const regex = /[!?#<>]/g;
      
      if (regex.test(unos) ) {
        napomena.style.borderColor = 'red';
        event.preventDefault();
    showError("Napomena sadrži nedopušteni znak");    }
    
        });


//DATUM I VRIJEME EVENT LISTENERI
vrijeme.disabled = true;
const danasnjiDatum = new Date().toISOString().split('T')[0];

datum.addEventListener('change', (event) => {
  const odabraniDatum = new Date(datum.value);

  if (odabraniDatum < new Date()) {
    showError('Odabrani datum ne smije biti u prošlosti.');
    datum.value = danasnjiDatum;
    vrijeme.disabled = false;
    datum.style.borderColor='red';
  } else {
    vrijeme.disabled = false;
    datum.style.borderColor='black';
  }
});

vrijeme.addEventListener('change', (event) => {
  const odabraniDatum = new Date(datum.value);
  const odabranoVrijeme = new Date(`${datum.value}T${vrijeme.value}`);

  if (odabraniDatum.toDateString() === new Date().toDateString() && odabranoVrijeme < new Date()) {
    showError('Ne možete unijeti vrijeme koje je manje od trenutnog vremena.');
    vrijeme.value = '';
    return;
  }
});



function showError(poruka) {
  if(errorDiv){
  errorDiv.style.display = "none"; 
    errorDiv = document.createElement("div");
  errorDiv.style.position = "fixed";
  errorDiv.style.top = "50%";
  errorDiv.style.left = "50%";
  errorDiv.style.transform = "translate(-50%, -50%)";
  errorDiv.style.padding = "20px";
  errorDiv.style.background = "red";
  errorDiv.style.color = "white";
  errorDiv.style.fontWeight = "bold";
  errorDiv.style.textAlign = "center";
  errorDiv.textContent = poruka;
  document.body.appendChild(errorDiv);

  if(errorDiv){
    errorDiv.addEventListener('click', (event) => {
      if(errorDiv){
        event.preventDefault();
        errorDiv.style.display = "none";
      }
    });
    
    }
  }

  else{
  errorDiv = document.createElement("div");
  errorDiv.style.position = "fixed";
  errorDiv.style.top = "50%";
  errorDiv.style.left = "50%";
  errorDiv.style.transform = "translate(-50%, -50%)";
  errorDiv.style.padding = "20px";
  errorDiv.style.background = "red";
  errorDiv.style.color = "white";
  errorDiv.style.fontWeight = "bold";
  errorDiv.style.textAlign = "center";
  errorDiv.textContent = poruka;
  document.body.appendChild(errorDiv);

  if(errorDiv){
    errorDiv.addEventListener('click', (event) => {
      if(errorDiv){
        event.preventDefault();
        errorDiv.style.display = "none";
      }
    });
    
    }
}
}



//--------------------ROTACIJA--------------------------------
// Dohvaćanje slika unutar zaglavlja
const headerImages = document.querySelectorAll('header img');

// Početni kut rotacije
let rotationAngle = 0;

// Funkcija za rotaciju slika
function rotateImages() {
  // Povećajte kut rotacije za 1 stupanj
  rotationAngle += 1;

  // Primijenite transformaciju rotacije na svaku sliku
  headerImages.forEach((image) => {
    image.style.transform = `rotate(${rotationAngle}deg)`;
  });

  // Ponovno pokrenite rotaciju nakon 10 milisekundi
  setTimeout(rotateImages, 10);
}

// Pokrenite rotaciju slika
rotateImages();


//DODATNE ANIMACIJE

// Funkcija koja se izvršava nakon određenog vremena i mijenja boju navigacije
function animateNavigation() {
  var navigation = document.querySelector("nav");
  
  // Spremite trenutnu boju pozadine navigacije
  var originalColor = navigation.style.backgroundColor;
  
  // Promijenite boju pozadine navigacije
  navigation.style.backgroundColor = "yellow";
  
  // Postavite setTimeout za vraćanje originalne boje nakon 1 sekunde
  setTimeout(function() {
    navigation.style.backgroundColor = originalColor;
  }, 1000);
}

// Dohvatite sve navigacijske linkove
var navLinks = document.querySelectorAll("nav a");

// Dodajte event listener na svaki navigacijski link
navLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    // Spriječite uobičajeno ponašanje linka
    event.preventDefault();
    
    // Pokrenite animaciju
    animateNavigation();
    
    // Dodajte odgovarajuću logiku za navigaciju na drugu stranicu, na primjer:
    var href = link.getAttribute("href");
    setTimeout(function() {
      window.location.href = href;
    }, 1000);
  });
});


// Funkcija koja se izvršava nakon određenog vremena i mijenja boju tablice
function animateTable() {
  var table = document.querySelector(".tablica");
  
  // Spremite trenutnu boju pozadine tablice
  var originalColor = table.style.backgroundColor;
  
  // Promijenite boju pozadine tablice
  table.style.backgroundColor = "lightblue";
  
  // Postavite setTimeout za vraćanje originalne boje nakon 1 sekunde
  setTimeout(function() {
    table.style.backgroundColor = originalColor;
  }, 1000);
}

// Dohvatite tablicu
var table = document.querySelector(".tablica");

// Dodajte event listener na tablicu
table.addEventListener("mouseenter", function() {
  // Pokrenite animaciju
  animateTable();
});

