import Cloudant from 'cloudant';
import con from '../config/cloudant.connector';
import sharedFunction from '../shared/function';
import cloudantModel from '../models/cloudant.model';

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
	  
	addDevice(user, mealsInformations){
		return new Promise((resolve, reject) => {
			var doc = {
				doc_type: "device",
				meal_information: mealsInformations,
				creation_information: {
					by: user,
					date: sharedFunction.retrieve_timestamp()
				}
			};
			this.db.insert(doc, function(err, body) {
				if (err) {
					console.log(err);
					reject(errorLog(err,user));
				}
				resolve(body);
			});
		});
	};

	addPet(name, age, specie, breed, weight, user){
		return new Promise((resolve, reject) => {
			var doc = {
				doc_type: "pet",
				pet_information: {
					name: name,
					age: age,
					specie: specie,
					breed: breed,
					weight: weight
				},
				creation_information: {
					by: user,
					date: sharedFunction.retrieve_timestamp()
				}
			};
			this.db.insert(doc, function(err, body) {
				if (err) {
					console.log(err);
					reject(errorLog(err,user));
				}
				resolve(body);
			});
		});
	};	  
	
	addUser(name, email, password){
		return new Promise((resolve, reject) => {
			var doc = {
				doc_type: "user",
				user_information: {
					name: name,
					email: email,
					password: password
				},
				creation_information: {
					date: sharedFunction.retrieve_timestamp()
				}
			};
			this.db.insert(doc, function(err, body) {
				if (err) {
					console.log(err);
					reject(errorLog(err,user));
				}
				resolve(body);
			});
		});
  	};	  
}