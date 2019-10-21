const fs = require('fs');
const YAML = require('yamljs');

fs.readdir(".", (err, files) => {
    files.forEach(file => {
        if (file != "parse.js") {
            console.log(file);

            YAML.parse(fs.readFileSync("./" + file).toString(), function(err) {
                console.log(err);
            });
        }
    })
});


