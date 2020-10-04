const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();
// app.engine('hbs', expressHbs({
//     extname: 'hbs',
//     layoutsDir: 'views/layouts',
//     defaultLayout: 'main-layout',
// }));
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', 'errors', '404.html'))
    res.status(404).render('errors/404', {
        docTitle: 'Page not found',
        path: '404'
    });
});

app.listen(3000);