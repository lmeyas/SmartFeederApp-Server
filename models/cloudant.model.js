export default class pageModel {

	static checkSearchByDate(customerName){
		const query = { 
			"selector": {
				"doc_type":"customer_searched",
				"info.entityName": customerName,
				"searcher_info.timestamp.unix": {
					"$gte": Date.now() - 259200000
				}
			},
			"fields": []
		};
		return query;
  	};

	static retrieveAllCustomers(){
		const query = { 
			"selector": {
				"doc_type":"search"
			},
			"fields": ["search", "creation_information"]
		};
		return query;
	};

	static retrieveCustomerBacklog(){
		const query = { 
			"selector": {
				"doc_type":"search",
				"status": {
					"$in": ["waiting approval", "approved", "waiting captcha"]
				}
			},
			"fields": ["search", "creation_information", "status" ]
		};
		return query;
	};

	static retrieveAllCustomersToBeApproved(){
		const query = { 
			"selector": {
				"doc_type":"search",
				"status": "waiting approval"
			},
			"fields": ["_id", "search", "creation_information"]
		};
		return query;
	};
	static retrieveRequestByID(ids){
		const query = { 
			"selector": {
				"_id": {
					"$in": ids
				}
			},
			"fields": []
		};
		return query;
	};
	
	static retrieveReport(from, to){
		const query = {
			"selector": {
				 "doc_type": "search",
				 "status": "searched",
				 "$and": [
						{
							 "creation_information.date.unix": {
									"$gte": from,
							 }
						},
						{
							 "creation_information.date.unix": {
									"$lte": to,
							 }
						}
				 ]
			},
			"fields": []
	 };
		return query;
	};

	static retrieveCaptcha(){
		const query = { 
		  "selector": {
			"doc_type": "captcha",
			"status": "Waiting Captcha"
		  },
		  "fields": ["_id", "_rev", "captchaBase64"]
		};
		return query;
	  };
  
	  static retrieveCaptchaByIdAndRev(id, rev){
		const query = { 
		  "selector": {
			"_id": id,
			"_rev": rev 
		  },
		  "fields": []
		};
		return query;
	  };
	
		static retrieveStates(){
			const query = { 
				"selector": {
					"doc_type":"states"
				},
				"fields": ["states"]
			};
			return query;
		};
  }