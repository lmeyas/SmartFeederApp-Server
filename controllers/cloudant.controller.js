import Cloudant from 'cloudant';
import con from '../../config/cloudant.connector';
import sharedFunction from '../../shared/function';
import cloudantModel from '../../models/cloudant.model';

export default class dbController {
	constructor() {
		this.con = con.cloudantSmartfeederDev;
		// Create cloudant instance
		this.cloudant = Cloudant(
		{
			account: this.con.user,
			password: this.con.password,
			plugin: 'promises'
		}, (err) => {
			if (err) throw err;
		});
		this.db = this.cloudant.db.use(this.con.db);
	}

	/**
     * This function lists the databases
     * @function listDbs()
     * @memberof dbController
     */
	listDbs() {
		return this.db.list();
	}

	    /**
     * This function runs a query
     * @function runQuery()
     * @param {string} query - the query to be run
     * @memberof dbController
     */
  
	runQuery(query) {
		console.log(query);
		return new Promise((resolve, reject) => {
			this.db.find(query, function(err, body) {
				console.log(body);
				if (err) {
					console.log(err);
					reject(err);
				}
				if (body.docs.length > 0){
					resolve(body.docs);
				}else{
					resolve("No data available");
				}
			});
		});
  	}

	addManuallySearch(user, customerName, legalEntity, state){
		return new Promise((resolve, reject) => {
			var doc = {
					doc_type: "search",
					search: {
						customer_name : customerName,
						legal_entity: legalEntity,
						state: state
					},
					creation_information: {
						by: user,
						date: sharedFunction.retrieve_timestamp()
					},
					status: "Waiting Approval",
				};
			this.db.insert(doc, function(err, body) {
				if (err) {
					console.log(err);
					reject(errorLog(err,user));
				}
				resolve(body);
			});
		});
  	}

	addMassiveSearch(customerList, user){
		return new Promise((resolve, reject) => {
			let documentsList = [];
            for (var i = 1; i < customerList.length; i++){
               	const customerDocument = {
                    doc_type: "search",
                    search: {
                        customer_name : customerList[i][0],
                        legal_entity: customerList[i][1],
                        state: customerList[i][2]
                    },
                    status: "Waiting Approval",
                    creation_information: {
                        by: user,
                        date: sharedFunction.retrieve_timestamp()
                    }
                };
                documentsList.push(customerDocument);
            }
			this.db.bulk({docs:documentsList}, function(err, body) {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(body);
			});
    	});
  	}

  	updateMassiveApproval(documentsList, user){
    	return new Promise((resolve, reject) => {
      		let doc_list = [];
			documentsList.forEach(doc => {
				doc.status = 'Approved';
				doc.approve_information = {
					"by": user,
					"date": sharedFunction.retrieve_timestamp()
                };
                doc_list.push(doc);
            })
      		this.db.bulk({docs:doc_list}, function(err, body) {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(body);
			});
    	});
	};
	  
	insertCaptcha(id,rev, captcha){
		return new Promise((resolve, reject) => {
			this.runQuery(cloudantModel.retrieveCaptchaByIdAndRev(id,rev)).then(document=>{
				let captchaDocument = document[0];
				captchaDocument.captcha = captcha;
				captchaDocument.status = "Waiting Robot";
				this.db.insert(captchaDocument, function(err, body) {
					if (err) {
					  console.log(err);
					  reject(errorLog(err,user));
					}
					resolve(body);
				});
			}).catch(captchaErr =>{
				console.log(captchaErr);
			})
		})
	};
}