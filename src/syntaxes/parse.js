const fs = require('fs');
const YAML = require('yamljs');

fs.readdir(".", (err, files) => {
    files.forEach(file => {
        if (file !== "parse.js") {
            console.log(file);
            try {
                YAML.parse(fs.readFileSync("./" + file).toString(), function (err) {
                    if (err) {
                        throw err;
                    }
                });
            } catch (err) {
                console.log(err);
                process.exit(1);
            }
        }
    });
    if (err) {
        console.log(err);
    }
});


