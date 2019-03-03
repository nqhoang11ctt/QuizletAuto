const csv = require('csv')
const fs = require('fs')

const parseWordCSV = async (path) => {
    let words = await new Promise((resolve, reject)=>{
        var data = []
        fs.createReadStream(path)
        .pipe(csv.parse({
            delimiter: ','
        }))
        .on("readable", function() {
            while (row = this.read()){
                data.push({word: row[0], def: row[1]});
            }
        })
        .on("finish", function(){
            resolve(data);
        })
    });
    return words;    
}

