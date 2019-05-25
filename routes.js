import path from 'path';
import DBController from './controllers/cloudant/cloudant.controller';
import cloudantModel from './models/cloudant.model';

let db = new DBController();

export default (app, express) => {
    /* Returning static files from application */
    
	app.use( ensureAuth, express.static(path.join(__dirname, '/public')));
    
    /**
     * This route convert the base64 string to a xlsx file, 
     * read it and save each line as a document in cloudant.
     * After this the file is ereased from server.
     * This route needs to check if the user is logged to save in the document who created it.
     */
	app.post('/api/v1/customer/insert/massive',ensureAuth, fileUpload, (req,res)=> {
		const fileName = req.body.fileName;
        const workSheetsFromFile = xlsx.parse(fileName);
        const file_header = workSheetsFromFile[0].data[0];
        if(file_header.length != 3 || file_header[0] != 'Customer Name' || file_header[1] != 'Legal Entity' || file_header[2] != 'State')
            res.status(400).send("File not compatible with model");
        else{
            db.addMassiveSearch(workSheetsFromFile[0].data, req.body.id).then(
				fileDelete.deleteFile(fileName).then(dt => {
					res.status(200).json('All customers added in backlog.')
				}).catch(errDel =>{
					console.log(errDel);
				})
                
            ).catch(errBulk=>{
                console.log(errBulk);
                res.status(400).json('Something went wrong. Please try again.')
            })
        }
    });

    /**
     * This route insert only one customer document on cloudant per time.
     * The user needs to send the Customer Name, Legal Entity and the State.
     * This route needs to check if the user is logged to save in the document who created it.
     */
	app.post('/api/v1/customer/insert/manually',ensureAuth, (req,res)=>{
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

    /**
     * This route retrieve every customer document in your database
     */
    app.get('/api/v1/customer/retrieve/all', (req,res)=>{
        db.runQuery(cloudantModel.retrieveAllCustomers()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });
    
    /**
     * This route retrieve every customer document that is waiting for approval, 
     * approved and waiting captcha
     */
    app.get('/api/v1/customer/retrieve/backlog', (req,res)=>{
        db.runQuery(cloudantModel.retrieveCustomerBacklog()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
	});
    
    /**
     * This route retrieve every customer document that is waiting for approval
     */
	app.get('/api/v1/customer/retrieve/approval', (req,res)=>{
        db.runQuery(cloudantModel.retrieveAllCustomersToBeApproved()).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
	});

    /**
     * This route receives from frontend a list of id that was approved
     */
	app.post('/api/v1/customer/approve', ensureAuth,(req, res)=>{
		db.runQuery(cloudantModel.retrieveRequestByID(req.body.id_list)).then(data =>{
            db.updateMassiveApproval(data, req.user.id).then(result =>{
                res.status(200).json("All the customers selected was approved!");
            }).catch(errUpdate => {
                console.log(errUpdate);
                res.status(400)
            })
		}).catch(errQuery =>{
			console.log(errQuery);
			res.status(400).json('Something went wrong.', errQuery);
		})
	});

    /**
     * This route recieves 2 dates (from and to) and gives back the report of 
     * customer documents created between those dates
     */
	app.post('/api/v1/report/',(req,res)=>{
        console.log(req.body);
		db.runQuery(cloudantModel.retrieveReport(req.body.from, req.body.to)).then(data =>{
            res.status(200).json(data);
        }).catch(err =>{
            res.status(400).json('Something went wrong.',err);
        });
    });
    
    /**
     * This route insert the capctha into a cloudant document
     * To do this the frontend needs to send the _id, _rev, captcha
     */
    app.post('/api/v1/captcha/insert', (req, res) => {
        db.insertCaptcha(req.body._id, req.body._rev, req.body.captcha)
            .then(captchaResult => {
                res.json('Thanks for inserting captcha!');
            }).catch(errCaptcha =>{
                console.log('Customer Error', errCaptcha);
                res.json(errCaptcha);
            })
    });

    /**
     * This route gets the captcha document from cloudant and returns to frontend the image in base64
     */
    app.get('/api/v1/captcha/retrieve', (req, res) => {
        db.runQuery(cloudantModel.retrieveCaptcha())
            .then(captchaResult => {
                console.log(captchaResult);
                res.json(captchaResult[0]);
            }).catch(errCaptcha =>{
                console.log('Customer Error', errCaptcha);
                res.json(errCaptcha);
            })
    });

    /**
     * This routes retrieves every States that the robot is allowed to work
     */
    app.get('/api/v1/state/retrieve', (req, res) => {
        db.runQuery(cloudantModel.retrieveStates())
            .then(states => {
                res.json(states[0].states);
            }).catch(errState =>{
                console.log('Customer Error', errState);
                res.json(errState);
            })
    });

    /**
     * This route send to frontend the information about the user logged in
     */
    app.get('/api/v1/user_informations', ensureAuth, (req, res) => {
        const user = {
            name: req.user._json.firstName + ' ' + req.user._json.lastName,
            email: req.user.id,
        }
        res.json(user);
    });
    
};