// this program is a code along with Colt's Yelpcamp material. 
// the first thing you need to do is to do your :
// npm init -y in your console : this is going to create your package.json file. in such a way that when you share the app or something like that those dependencies can all be automatically downloaded

// then the next thing is to do : 
// npm install express mongoose ejs
const express = require('express'); // here I am requiring the express that I have installed in the npm install
const path = require('path'); // here I am requiring path. but path in inbuilt so it doesn't need to be installed along with the other npm install
const mongoose = require('mongoose') // in this place i am requiring the mongoose that i have initially installed.
const methodOverride = require('method-override');
const Campground = require('./models/campground') // here i am requiring a certain file (class) called campground.js in the models directory
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


app.get('/', (req, res) => {
    res.render('home', { pick: ['Ekene boy', 'Alexander', 'Abanobi'] }) // just render the home view when anyone goes to the localhost:3000
})


// app.get('/makecampground', async(req, res) => { // since you are working with a database, this has to be async. things have to be awaited.
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap Campaign' }); // create an object from the mongoose schema class called Campground that I required at the top
//     // create that object with these values. i.e. the Campground object takes a JSON of values that you want to put into the database

//     // this mongoose schema will be like a table in the yelp-camp databaase

//     await camp.save(); // save the object inside the database.
//     // when you call save on a mongoose schema object, it saves the data to the currently connected database and in the table of that particular object


//     res.send(camp); // here just return to the user the JSON that he or she inputed.
// })


const sortDB = async(params) => {
    const campgrounds = await Campground.find({});

    await Campground.aggregate([
        { $sort: { title: 1 } }
    ])

    let timestamp = mongoose.Types.ObjectId(params._id).getTimestamp()
    console.log(`${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`)
    console.log('Sorted !!')
}


app.get('/campgrounds', async(req, res) => { // any request function that will need to connect to the database will need to be async
    const campgrounds = await Campground.find({}).sort({ title: 1 });


    sortDB(req.params)


    res.render('campgrounds/index', { campgrounds })
})


app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})


app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})


app.get('/campgrounds/:id', async(req, res) => { // any request function that will need to connect to the database will need to be async
    const campground_location = await Campground.find({})
        // .then(() => {
        //     res.render('campgrounds/show', { campground_location })
        // })
        // .catch(() => {
        //     res.send('Was not able to show that campground, hey !!')

    // })

    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });

})


app.get('/campgrounds/:id/edit', async(req, res) => {
    id = req.params.id;
    const foundCampground = await Campground.findById(id);

    res.render('campgrounds/edit', { foundCampground })
})

app.put('/campgrounds/:id', async(req, res) => {
    // res.send('HELLO THE PUT REQUEST WORKED !!')

    const campground_to_update = await Campground.findByIdAndUpdate(req.params.id, {...req.body.campground }, { new: true });

    // campground_to_update = req.body.campground
    // campground_to_update.title = req.body.campground.id
    // campground_to_update.location = req.body.campground.location
    console.log(req.body)
    res.redirect(`/campgrounds/${campground_to_update._id}`)

})

app.delete('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})


app.listen(3000, () => {
    console.log('Serving on port 3000 !!!') // open a server at port 3000 and listen for localhost:3000 in the webbrowser
})