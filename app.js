// this program is a code along with Colt's Yelpcamp material. 
// the first thing you need to do is to do your :
// npm init -y in your console : this is going to create your package.json file. in such a way that when you share the app or something like that those dependencies can all be automatically downloaded

// then the next thing is to do : 
// npm install express mongoose ejs
const express = require('express'); // here I am requiring the express that I have installed in the npm install
const path = require('path'); // here I am requiring path. but path in inbuilt so it doesn't need to be installed along with the other npm install
const mongoose = require('mongoose') // in this place i am requiring the mongoose that i have initially installed.
const methodOverride = require('method-override');
const Patient = require('./models/patient') // here i am requiring a certain file (class) called campground.js in the models directory
// that campground file exports a mongoose schema class. more or less like returns that mongoose schema class
const { v4: uuidv4 } = require('uuid');
mongoose.connect('mongodb://localhost:27017/zankli-pp', { // create and connect to this database
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // here i am creating a database called yelp-camp and i am setting some mongoose options to ease operation and avoid errors
let patientid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
let appointmentid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
let doctors = ['Diem Truong', 'Monique Rivera', 'Tiffany Randazzo', 'Dr. Dimitri Kessaris', 'Dr. Sourab Choudhury', 'Dr. Lyubov Avshalumova', 'Dr. Dina Began', 'Dr. Isaac Namdar', 'Dr. David Culang', 'Dr. George Castro', 'Dr. Babar Rao', 'Dr. George Castro', 'Dr. Babar Rao', 'Matthew Pabis', 'Dr. Franklin Lowe', 'Dr. Marina Marcu', 'Dr. Sanjosh Singh', 'Dr. Vathani Packianatha', 'Lydia Wu', 'Dr. Doron Katz', 'Dr. Shanna Levine', 'Dr. Kamran Jafri', 'Dr. David Volpi']


const yourFunction = async () => {
    setTimeout(2000);
};

// npm install react@latest react-dom@latest

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
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs'); // select ejs as the view engine because with ejs you can have dynamic content in your views
app.set('views', path.join(__dirname, 'views')); // here tell the app that the views are in a directory that is the present directory appended with views.
// this means that the views directory is just one level below the present working directory and it is named 'views'.


app.get('/', (req, res) => {
    let loginresult = ""
    res.render('login', { loginresult })
})

app.get('/doctors', (req, res) => {
    res.render('doctors')
})

app.get('/signup', (req, res) => {
    patientid = patientid.substring(0, 8)
    res.render('signup', { patientid })
})

app.post('/home', (req, res) => {

    if (req.body.username == "sadiya@gmail.com" && req.body.password == "zankli123") {
        loginresult = ""
        res.render('home', { loginresult })
    }
    else {
        loginresult = "Wrong username or password"
        res.redirect('/')

    }

})

app.get('/home', (req, res) => {

    res.render('home')

})

app.get('/about', (req, res) => {

    res.render('about')

})

app.get('/emergency', (req, res) => {

    res.render('emergency')

})


// async function asyncCall() {
//     console.log('calling');
//     const result = await setTimeout(() => {
//     }, "2000");
//     console.log(result);
//     // expected output: "resolved"
// }

app.post('/bookingconfirmed', (req, res) => {
    let doc = req.body.doctorchosen
    let appointmentdate = req.body.appointmentdate
    // console.log(req.body)

    res.render('bookingconfirmed', { appointmentid, patientid,  doc, appointmentdate})


})

app.get('/appointment', (req, res) => {
    appointmentid = appointmentid.substring(0, 8)
    patientid = patientid.substring(0, 8)
    res.render('appointment', { appointmentid, patientid, doctors })
    // for (const doctor of doctors){
    //     console.log(doctor);
    // }

})

app.get('/pharmacy', (req, res) => {

    res.render('pharmacy')

})

app.post('/verifyuser', (req, res) => {

    if (req.body.email == "sadiya@gmail.com" && req.body.password == "zankli123") {
        loginresult = ""
        res.render('home', { loginresult })
    }
    else {
        loginresult = "Wrong username or password"
        res.redirect('/')

    }

})



app.listen(3000, () => {
    console.log('Serving on port 3000 !!!\nSadiya Clinic Management app') // open a server at port 3000 and listen for localhost:3000 in the webbrowser
})