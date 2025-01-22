const fs = require('fs');
const kleur = require("kleur");
const path = require('path');

function readGuides(dir) {
  // console.log("Start script");
  const result = {};

  const folders = fs.readdirSync(dir);
  folders.forEach(folder => {
    const folderPath = path.join(dir, folder);
    // console.log(`Checking folder: ${folder}`); 

    var jsonFiles;
    try {
      const stats = fs.statSync(folderPath);
      //checking if the path is a directory
      if (stats.isDirectory()) {
        const files = fs.readdirSync(folderPath)
        //filtering for JSON files
        jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

        if (jsonFiles.length > 0) {
          const fileName = `${folder.toLowerCase()}.json`
          // console.log(`Reading JSON file: ${fileName}`); 
          try {
            const jsonFile = fs.readFileSync(`${folderPath}/${fileName}`)
            const jsonData = JSON.parse(jsonFile);

            if (!result[folder.toLowerCase()]) {
              result[folder.toLowerCase()] = [];
            }

            result[folder.toLowerCase()].push(...jsonData.guides);

          } catch (error) {
            console.error(`Error parsing JSON in file: ${jsonFiles}`);
            console.error(error.message);
          }
        }
      } else {
        console.log(`${folder} is not a diectory`)
      }
    } catch (err) {
      console.log(`Error loading JSON in folder: ${folder}`)
    }
  })

  return result;
}

const guidesDir = path.join(__dirname, 'guides'); // Base directory for guides
const outputFile = path.join(__dirname, 'guides.json')

try {
  // console.log(kleur.green('Reading guides folder...'));
  const guidesContent = readGuides(guidesDir);

  try {
    console.log(kleur.green('Writing guides functions to json file...\n'));
    fs.writeFileSync(outputFile, JSON.stringify(guidesContent, null, 4));
  } catch (err) {
    console.log(kleur.red('Error writing output files: ', err));
  }
} catch (error) {
  console.log(kleur.red('Error processing guides files: ', error));
}
