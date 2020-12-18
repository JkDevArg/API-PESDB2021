const requestPromise = require('request-promise');
const $ = require('cheerio');
const mainUrl = 'https://pesdb.net/pes2021/';
const url = `${mainUrl}?page=dp3-new-players`; 
const jugadorDatos = [];
// Almacenar la información en un fichero CSV
function saveInCSV() {
  const otocsv = require('objects-to-csv');
  const transformed = new otocsv(jugadorDatos);
  try {
    transformed.toDisk('./jugadores-libres.csv');
    return true;
  } catch(e) {
    return false;
  }
  
}
requestPromise(url)  
.then(html => {
   ///success!
  // console.log(html);  
  const rankingTable = $('.players tbody tr', html);
  rankingTable.each((i,el) => {
    // console.log($(el).text());
    const position = $('td:nth-child(1)', el).text();
    const namePlayer = $('td:nth-child(2)', el).text();
    const teamPlayer = $('td:nth-child(3)', el).text();
    const nationality = $('td:nth-child(4)', el).text();
    const ratingPlayer= $('td:nth-child(5)', el).text();
    const url = mainUrl.concat($('td:nth-child(2) a', el).attr("href"));
    console.log(position, namePlayer, teamPlayer, nationality, ratingPlayer, url);
    jugadorDatos.push(
      {
        position: position,
        name: namePlayer,
        team: teamPlayer,
        totalPoints: nationality,
        rating: ratingPlayer,
        details: url
      }
    )
    
  });
  
  debugger;
  return saveInCSV();
})
.then(data => {
  if (data) {
    console.log('Datos guardados correctamente');
  } else {
    console.log('Datos no guardados, error!');
  }
})
.catch(error => {
  ///handling error
  console.log(error);
});
