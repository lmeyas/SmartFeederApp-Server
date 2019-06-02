import path from 'path';
import DBController from './controllers/cloudant.controller';
import cloudantModel from './models/cloudant.model';

let db = new DBController();

export default (app, express) => {
    /* Returning static files from application */
    
	app.use( ensureAuth, express.static(path.join(__dirname, '/public')));

    //VER COMO INSERIR O OBJETO
    app.post('/api/v1/device/insert',ensureAuth, (req,res)=>{
        const customerName = req.body.customerName;
        const legalEntity = req.body.legalEntity;
        const state = req.body.state;
        if ( customerName == undefined || customerName == '' || legalEntity == undefined || legalEntity == '' || state == undefined || state == '')
            res.status(400).json('You are missing an obrigatory field.')
        db.addManuallySearch(req.user.id, customerName, legalEntity, state).then(
            res.status(200).json('Customer added to the backlog.')
        ).catch(err=>{
            console.log(err);
            res.status(400).json('Something went wrong.', err)
        })
    });

    app.post('/api/v1/pet/insert',ensureAuth, (req,res)=>{
        const name = req.body.name;
        const age = req.body.age;
        const specie = req.body.specie;
        const breed = req.body.breed;
        const weight = req.body.weight;
        if ( name == undefined || name == '' || 
             age == undefined || age == '' || 
             specie == undefined || specie == '' || 
             breed == undefined || breed == '' || 
             weight == undefined || weight == '')
            res.status(400).json('You are missing an obrigatory field.')
        db.addManuallySearch(req.user.id, name, age, specie, breed, weight).then(
            res.status(200).json('Pet added with success.')
        ).catch(err=>{
            console.log(err);
            res.status(400).json('Something went wrong.', err)
        })
    });

    app.post('/api/v1/user/insert',ensureAuth, (req,res)=>{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if ( name == undefined || name == '' || 
             email == undefined || email == '' || 
             password == undefined || password == '')
            res.status(400).json('You are missing an obrigatory field.')
        db.addManuallySearch(req.user.id, name, email, password).then(
            res.status(200).json('User added with success.')
        ).catch(err=>{
            console.log(err);
            res.status(400).json('Something went wrong.', err)
        })
    });

    /**
     * This route retrieve pet document by user in your database
     */
    app.get('/api/v1/pet/retrieve', (req,res)=>{
        db.runQuery(cloudantModel.retrievePetByUser()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });

     /**
     * This route retrieve pet document by user in your database
     */
    app.get('/api/v1/device/retrieve', (req,res)=>{
        db.runQuery(cloudantModel.retrieveDeviceByUser()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });

    /**
     * This route retrieve user information document in your database
     */
    app.get('/api/v1/device/retrieve', (req,res)=>{
        db.runQuery(cloudantModel.retrieveUserInformation()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });  
};