var app = express();
var portNum = process.env.PORT || 8080;

app.set('port', portNum);

app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

//Get the /home url and apply handlebars template to it
app.get('/:name', function(req,res){
    res.render('home',
        {
            company: 'Old Glory Tattoo Co.',
            address: '',
            hours: '',
            phone: '',
            artists: [
                {name: '', style: '', days: '' },
            ],
            facebookURL: '',
            galleryURL: '',
        }
    );
});

app.use(express.static(__dirname + '/public'));

//404 Catch all Error
app.use(function(req, res, next){
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(portNum, function(){
    console.log('200');
    console.log('listening on port ', portNum);
});