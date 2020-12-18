# API-PESDB2021

_No me responsabilizo por el uso que le dan a esta aplicación, solo les doy las herramientas para que puedan usarla📋_

## INSTALACIÓN 🚀

Requisitos
* NodeJS
* NPM

_Siguiente paso_

```
npm install request request-promise cheerio objects-to-csv
```

**Las librerías que instalamos harán lo siguiente:**
* request / request-promise: ```Para traer la información que queremos descargar.```
* cheerio: ```Para manipular y seleccionar la información que queremos extraer únicamente.```
* objects-to-csv: ```Para guardar la información en un fichero CSV después de obtener lo que deseamos.```


**Transferencias de jugadores** (Puedes cambiar la linea 3 el año es decir 2020/2019)**
```nodejs
const mainUrl = 'https://pesdb.net/pes2021/';
const url = `${mainUrl}?page=dp3-transfered-players`; 
```



**Guardamos los datos en => ('./jugadores-transferidos.csv');**
```nodejs
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
```


