import React from 'react'
import Upload from '../components/Upload'


const Home = () => (
  <div className="Home">
    
    <h1>Aktiivinen keppari kilpailu jatkuu!</h1>
    <p>Kesän 2021 kilpailussa keppariharrastaja suorittaa tehtäväpassin tehtävät kilpailuaikana. Kaikkien osallistujien kesken arvotaan hyviä esinepalkintoja.</p>

    <p><b>Kilpailuaika:</b> 5.7.–31.7.2021</p>

    <p><b>Osallistumisoikeus:</b> Avoin kaikille</p>

    <h4>Palkinnot:</h4>
    <ol>
      <li>Kaikkien vähintään yhden tehtävän suorittaneiden kesken arvotaan hyvät esinepalkinnot</li>
      <li>Bonuspalkinnot arvotaan niiden kesken, jotka ovat suorittaneet kaikki tehtävät kilpailuaikana</li>
    </ol>
    <h4>Tehtävät:</h4>
      <p>Kilpailussa on helppoja ja vaikeita tehtäviä. Osassa tehtäviä osallistujan tulee lähettää kuva tai video, kun suoritus rekisteröidään kilpailusivuille.</p>

    <h4>Säännöt:</h4>
      <p>Kilpailussa saa tehdä yhteistyötä tehtävien suorittamisessa. Kilpailussa tulee noudattaa tekijänoikeuksia, joten älä kopioi kuvia tai videoita joihin sinulla ei ole oikeuksia.</p>

    <b>Ohjeet osallistumiseen:</b>
    <ul>
      <li>Avaa kilpailusivut hewi.fi/aktiivinen-keppari/</li>
      <li>Luo käyttäjätunnus kilpailu sivulle <a href='https://aktiivinen-keppari.herokuapp.com/register'>tästä</a></li>
      <li>Kun olet tehnyt tehtävän, käy rekisteröimässä suoritus <a href='https://aktiivinen-keppari.herokuapp.com/tasks'> Tehtävät sivulle</a></li>
      <li>Kun olet suorittanut kaikki tehtävät, voit ladata todistuksen suorituksestasi pari päivän sisällä </li>
    </ul>
    <h4>Galleria</h4>
    <p>Halutessasi voit lisätä kuvan suorituksestasi julkiseen galleriaan</p>
    <h4>Yhteystiedot:</h4>
    <p>Ongalma tilanteissa ota yhteyttä sähköpostitse <a href='mailto:keppari@hewi.fi'>keppari@hewi.fi</a></p>
    
  </div>
)

export default Home