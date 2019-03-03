const csv = require('csv')
const fs = require('fs')

getwords = (path) => {
    let words = new Promise((resolve, reject)=>{
        var data = ""
        fs.createReadStream(path)
        .pipe(csv.parse({
            delimiter: ','
        }))
        .on("readable", function() {
            while (row = this.read()){
                data += `${row[0]}\t${row[1]}\n`;
            }
        })
        .on("finish", function(){
            resolve(data);
        })
        .on("error", function(){
            reject(new Error("Error reading CSV file!"));
        })
    });
    return words;    
}

getwords("words.csv").then(console.log);

module.exports = getwords