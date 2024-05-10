<h3>Tekijät: Petra Haukkala, Kaisla Ketola, Wilma Isberg</h3>

Avaa [Ravintola sivu](https://users.metropolia.fi/~wilmais/web-projekti/HTML/index.html) tästä. <br>
Hyväksy myös [App sivun](https://10.120.32.75/app) sertifikaatti.

<h3>Sovelluksen Idea: Aasialainen ravintola.</h3> 

<h4>Sovelluksen Kohderyhmä: </h4> 
<p>Asiakkaat sekä ravintolan omistajat ja kaikki ketkä haluavat aitoa aasialaista ruokaa.</p>

<h4>Miksi sovellus on hyödyllinen:</h4>
<p>Asiakkaat voivat helposti nähdä päivän menun ja ravintolan tarjoamat tuotteet.
Sovellus tarjoaa käyttäjille mahdollisuuden tehdä tilauksia helposti ja mukavasti verkossa.
Admin-käyttäjät voivat hallinnoida menuja, lisätä ja poistaa tuotteita sekä käsitellä tilauksia tehokkaasti yhdessä paikassa.</p>

<h3>Sovelluksen toiminnalisuudet: </h3>

<ul>
  <h4>Index:</h4>
    <li>Päivän menu joka haetaan tietokannasta. Menu tullee ensimmäisen ravintolan (id 1: Sakura Sushi) menusta </li>
    <li>Linkkauksia web sivuston muille sivuille. Product sivulle menevät linkit checkaa filtereistä oikean categorian (esim. Dessert linkki luo filterin jotta käyttäjä näkee vain jälkiruuat)</li>
    <li>Instagram Api: Ottaa yhteyttä projektia varten luotuun instagramiin. Näyttää yhdeksän uusinta kuvaa. Viedessä hiiren kuvan päälle, nähdään kuvaan liitetty kuvaus.</li>
    <li>Painamalla logoa headerissä, käyttäjä pääsee takaisin index-sivulle.</li>
    
  <h4>Menu:</h4>
    <li>Asiakas sivulla nähdään viikon menu lista. Asiakas kanssa pystyy vaihtamaan kahden ravintolan välillä.</li>
    <li>Jos käyttäjä on Admin käyttäjällä, sivulla on listan lisäksi "Edit"-button, jolla käyttäjä pääsee muokkaamaan menu listoja. Käyttäjä voi vapaasti valita ravitolan, päivän, ja mitä kaikkia ruokia lisätään sen päivän listalle. Käyttäja kanssa näkee kyseisen ravintolan valitun päivän ruokalistan. </li>
    
  <h4>Products:</h4>
    <li>Sivu hakee ruoka listan tietokannasta. Se jäsentelee ne automaattisesti kategorioihin ja näyttää ne asiakkaalle listana</li>
    <li>Asiakas pystyy lisäämään tuotteita ostoskoriin. Tuotteet tallennetaan sessioniin. </li>
    <li>Klikkaamalla tuotetta, käyttäjä pääsee tuotteen tarkempaan esittelyyn. Tuotteen esittelyssä käyttäjä voi lisätä tuotteen ostoskoriin. </li>
    <li>Jos asiakas ei ole kirjautunut sisään ja hän klillaa "lisää ostoskoriin" nappia, hänet ohjataan login-sivulle</li>
    <li>Sivulla on myös filterit. Kun käyttäjä merkkaa kategorian, sivu näyttää vain kyseisten kategorioiden ruuat.</li>
    <li>Allergeeni filtterillä käyttäjä voi valita mitä allergeenejä ei saa olla tuotteessa. Sivu näyttää vain tuotteet, jotka eivät sisällä valittuja allergeenejä.</li>
    <li>Hinta valikolla käyttäjä voi järjestellä tuotteet haluamallaan hinta järjestyksellä. Default valinta palauttaa alkutilanteen.</li>
    <li>Haku kentällä käyttäjä voi hakea tuotteita nimellä. Sivu näyttää vain tuotteet, jotka sisältävät hakusanan otsikossa.</li>
    <li>Jos tuotteita ei löydy, sivu näyttää "Tuotteita ei löydy" kuvan.</li>

  <h4>Login:</h4>
    <li>Login sivulla käyttäjä voi kirjautua sisään sivulle. Kirjautumisessa käytetään käyttäjänimeä ja salasanaa</li>
    <li>Admin käyttäjä voi kirjautua sisään samalla sivulla käyttämällä adminin käyttäjänimeä ja salasanaa</li>
    <li>Onnistuneen kirjautumisen jälkeen, web token tallennetaan local Storageen ja käyttäjä ohjataan takaisin index sivulle.</li>
    <li>Epäonnistuneen kirjautumisen jälkeen, käyttäjä saa ilmoituksen "Käyttäjänimi tai salasana on väärin".</li>
    <li>Rekisteröinti linkki vie käyttäjän rekisteröinti sivulle. Täällä käyttäjä voi luoda oman profiilin. Jokainen käyttäjä, joka luodaan tätä kautta saa roolin "Asiakas".</li>
    <li>Unohditko salasanan linkki vie käyttäjän salasanan palautus sivulle. Täällä käyttäjä voi palauttaa salasanansa. Tässä demo versiossa emme lähetä linkkiä sähköpostiin.</li>
    <li>Kirjautumisen jälkeen, käyttäjä voi nähdä oman profiilin ja ostoskorin. Logout korvaa login napin.</li>
    <li>Logout button poistaa web tokenin local Storagesta ja käyttäjä ohjataan takaisin index sivulle.</li>

  <h4>Profile:</h4>
    <li>Profiili sivulla ensimmäisenä käyttäjä näkee omat tietonsa. Edit napilla voi muokata käyttäjän tietoja. Käyttäjä voi tätä kautta myös lisätä itselleen profiilikuvan.</li>
    <li>Profiilin alapuolella käyttäjä näkee oma ostos historian. Tästä kanssa näkee onko tilaukset odotus tilassa vai onko se toimitettu.</li>
    <li>Jos käyttäjä on Admin, hän näkee myös kaikki käyttäjät ja heidän tilaukset. Admin voi klikata tilauksen toimitetuksi.</li>
    <li>Admin käyttäjällä on profiilissa "hallinnoi tuotteita" osio. Tämän kanssa Admin voi lisätä, muokata ja poistaa tuotteita tietokannasta.</li>

  <h4>Cart:</h4>
    <li>Ostoskori on tyhjä ellei asiakas ole lisännyt ostoksia koriin. Tällöin sivulla näkyy vain nappi, joka ohjautuu tuote-sivulle.</li>
    <li>Ostoskorissa käyttäjä näkee kaikki tuotteet, jotka hän on lisännyt ostoskoriin. Hän voi lisätä tuoteiden lukumäärää tai poistaa tuotteen ostoslistasta. Listan lopussa näkyy tuotteiden kokonais hinta.</li>
    <li>Kun käyttäjä on valmis, hän voi painaa "Tilaa" nappia. Tämä avaa tilaus lomakkeen. Tiedot jotka löytyvät profiilista on automaattisesti täytetty. </li>
    <li>Asiakas valitsee ravintolan ja lisää maksu kortti tiedot, jonka jälkeen tilauksen voi lähettää. Tilauksen lähetettyä käyttäjä siiretään profiili sivulle.</li>
    

</ul>

<h5>Admin Käyttäjä: <br> </h5>
  <p>Käyttäjänimi: admin <br>
  Salasana: 123456 </p>
