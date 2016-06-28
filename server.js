var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Pusher = require('pusher');
var cors = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();         

var pusher = new Pusher({
	appId: '219942',
	key: '815e02e0e8ecb647d10c',
	secret: '2c6d0c794b77ca097071'
});
app.use(express.static('public'));

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});


router.post('/messages/new/', cors(), function(req, res)
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	if(req.body.channel != null && req.body.event != null && req.body.text != null && req.body.autor != null && req.body.socketid != null)
	{
		pusher.trigger(req.body.channel, req.body.event, {text: req.body.text, autor: req.body.autor}, req.body.socketid);
		res.json({message: "Perfect"})
		console.log("[Canal: "+req.body.channel +"] [Evento: "+ req.body.event +"] "+ req.body.autor +": "+req.body.text)
	}else
	{
		res.json({ error: 'Incomplete requeriments' }); 
	}
	
}
);

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});



app.use('/api', router);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('All alright, running on port ' + port)