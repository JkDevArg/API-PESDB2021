const requestPromise = require('request-promise');
const $ = require('cheerio');
const mainUrl = 'https://pesdb.net/pes2021/';
const url = `${mainUrl}?page=dp3-transfered-players`; 
const rankingItems = [];
// Almacenar la información en un fichero CSV
function saveInCSV() {
  const otocsv = require('objects-to-csv');
  const transformed = new otocsv(rankingItems);
  try {
    transformed.toDisk('./jugadores-transferidos.csv');
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
    const nombre = $('td:nth-child(1)', el).text();
    const antes = $('td:nth-child(2)', el).text();
    const despues = $('td:nth-child(3)', el).text();
    const url = mainUrl.concat($('td:nth-child(1) a', el).attr("href"));
    console.log(nombre, antes, despues, url);
    rankingItems.push(
      {
        nombre: nombre,
        name: antes,
        team: despues,
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
