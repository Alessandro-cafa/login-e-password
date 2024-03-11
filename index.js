const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Percorso del file JSON contenente le credenziali
const credentialsFile = 'credentials.json';

// Funzione per autenticare le credenziali
function authenticate(username, password) {
    const credentials = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
    return credentials[username] === password;
}

// Pagina di login
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Gestione del login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (authenticate(username, password)) {
        // Reindirizza alla pagina App_GrantedUser.ejs se il login ha successo
        res.redirect('/App_GrantedUser');
    } else {
        // Reindirizza alla pagina notPermission.htm se il login non ha successo
        res.redirect('/notPermission.html');
    }
});
app.post('/registert', (req, res) => {
    // Estrai i dati dal corpo della richiesta
    const { username, password } = req.body;
  if (authenticate(username, password)) {
      // Reindirizza alla pagina App_GrantedUser.ejs se il login ha successo
      res.redirect('/registert');
  } else {
      // Reindirizza alla pagina notPermission.htm se il login non ha successo
      res.redirect('/');
  }
    // Esegui la logica per la registrazione dell'utente (es. salva nel database)
    // Assicurati di gestire eventuali errori e inviare una risposta appropriata
});
// Pagina per gli utenti autorizzati
app.get('/App_GrantedUser', (req, res) => {
    // Qui puoi renderizzare la pagina App_GrantedUser.ejs e passare le informazioni dell'utente
    res.send('Benvenuto! Hai accesso alla pagina riservata.');
});

// Pagina di permesso negato
app.get('/notPermission.html', (req, res) => {
    res.sendFile(__dirname + '/public/notPermission.html');
});


// Pagina di login
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/registert', (req, res) => {
    res.sendFile(__dirname + '/public/registert.html');
});
// Pagina di permesso negato
app.get('/notPermission.html', (req, res) => {
    res.sendFile(__dirname + '/public/notPermission.html');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/App_GrantedUser', (req, res) => {
    // Passa il nome utente al template EJS per renderizzarlo nella pagina
    res.render('App_GrantedUser', { username: req.body.username });
});
// Avvia il server
app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
