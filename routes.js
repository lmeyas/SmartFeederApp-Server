import path from 'path';
import DBController from './controllers/cloudant.controller';
import cloudantModel from './models/cloudant.model';
import bcrypt from 'bcrypt';
const saltRounds = 10;

let db = new DBController();

export default (app, express) => {
    /* Returning static files from application */
    
	app.use(express.static(path.join(__dirname, '/public')));

    app.post('/api/v1/user/insert', (req,res)=>{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // password = bcrypt.hashSync(password, saltRounds);
    
        console.log(req.body);
        if ( name == undefined || name == '' || 
             email == undefined || email == '' || 
             password == undefined || password == '') {
                res.status(400).json('You are missing an obrigatory field.')
        } else {
            db.addUser(name, email, password).then( data => {
                console.log(data);
                res.status(200).json('User added with success.');
            }
            ).catch(err=>{
                console.log(err);
                res.status(400).json('Something went wrong.', err)
            })
        } 
    });

    /**
     * This route retrieve user information document in your database
     */
    app.post('/api/v1/user/retrieve', (req,res)=>{
        const email = req.body.email;
        const password = req.body.password;

        // const email = 'lmeyas.mac@gmail.com';
        db.runQuery(cloudantModel.retrieveUserInformation(email, password)).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });  

    app.post('/api/v1/pet/insert', (req,res)=>{
        console.log(req.body);
        const name = req.body.petInformations.name;
        const age = req.body.petInformations.age;
        const specie = req.body.petInformations.specie;
        const breed = req.body.petInformations.breed;
        const weight = req.body.petInformations.weight;
        const userEmail = req.body.userEmail;
        if ( name == undefined || name == '' || 
             age == undefined || age == '' || 
             specie == undefined || specie == '' || 
             breed == undefined || breed == '' || 
             weight == undefined || weight == '')
            res.status(400).json('You are missing an obrigatory field.')
        db.addPet(name, age, specie, breed, weight, userEmail).then( data => {
            console.log(data);
            res.status(200).json('Pet added with success.')
        }
        ).catch(err=>{
            console.log(err);
            res.status(400).json('Something went wrong.', err)
        })
    });

        /**
     * This route retrieve pet document by user in your database
     */
    app.post('/api/v1/pet/retrieve', (req,res)=>{
        const userEmail = req.body.userEmail;
        db.runQuery(cloudantModel.retrievePetByUser(userEmail)).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });

    

    //VER COMO INSERIR O OBJETO
    app.post('/api/v1/device/insert', (req,res)=>{
        const meals = req.body.mealList;
        const userEmail = req.body.userEmail;
        if (meals.length <= 0){
            res.status(400).json('You are missing an obrigatory field.')
        } else {
            db.addDevice(meals, userEmail).then( data => {
                console.log(data);
                res.status(200).json('Device added to the backlog.')
            }).catch(err=>{
                console.log(err);
                res.status(400).json('Something went wrong.', err)
            })
        }
    });


     /**
     * This route retrieve pet document by user in your database
     */
    app.post('/api/v1/device/retrieve', (req,res)=>{
        const userEmail = req.body.userEmail;
        db.runQuery(cloudantModel.retrieveDeviceByUser(userEmail)).then(data =>{
            res.status(200).json(data[0]);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });
};