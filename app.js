// this program is a code along with Colt's Yelpcamp material. 
// the first thing you need to do is to do your :
// npm init -y in your console : this is going to create your package.json file. in such a way that when you share the app or something like that those dependencies can all be automatically downloaded

// then the next thing is to do : 
// npm install express mongoose ejs
const express = require('express'); // here I am requiring the express that I have installed in the npm install
const path = require('path'); // here I am requiring path. but path in inbuilt so it doesn't need to be installed along with the other npm install
const mongoose = require('mongoose') // in this place i am requiring the mongoose that i have initially installed.
const methodOverride = require('method-override');
//const Campground = require('./models/campground') // here i am requiring a certain file (class) called campground.js in the models directory
    // that campground file exports a mongoose schema class. more or less like returns that mongoose schema class

mongoose.connect('mongodb://localhost:27017/yelp-camp', { // create and connect to this database
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // here i am creating a database called yelp-camp and i am setting some mongoose options to ease operation and avoid errors



const db = mongoose.connection; // here i have created a connection to mongoose and stored it in the variable called db

// this is an error management package... 
db.on('error', console.error.bind(console, 'connection error:'));

// when the connection is successful print Database connected in the console.
db.once('open', () => {
    console.log('Database connected');
})



const app = express(); // create the express app by just calling express()
app.use(express.urlencoded({ encoded: true })); //very important line that tells it to parse the req.body  for a post request so it can be used 
app.use(methodOverride('_method'))


app.set('view engine', 'ejs'); // select ejs as the view engine because with ejs you can have dynamic content in your views
app.set('views', path.join(__dirname, 'views')); // here tell the app that the views are in a directory that is the present directory appended with views.
// this means that the views directory is just one level below the present working directory and it is named 'views'.


app.listen(3000, () => {
    console.log('Serving on port 3000 !!!\nSadiya Clinic Management app') // open a server at port 3000 and listen for localhost:3000 in the webbrowser
})