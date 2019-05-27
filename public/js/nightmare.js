var Nightmare = require('nightmare');
    new Nightmare()
        .goto('https://www.google.com')
        .type('input#gLFyf gsfi', 'code memes')
        .run();