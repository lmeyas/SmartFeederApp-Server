export default class pageModel {
	
	static retrieveAllInformations(userName){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userName
				 }
			},
			"fields": []
	 };

	 return query;
	};

	static retrieveDeviceByUser(userName){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userName
				 },
				 "doc_type": "device"
			},
			"fields": []
	 };

	 return query;
	};

	static retrievePetByUser(userName){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userName
				 },
				 "doc_type": "pet"
			},
			"fields": []
	 };

	 return query;
	};

	static retrieveUserInformation(userName){
		const query = {
			"selector": {
				 "user_information": {
						"name": userName
				 },
				 "doc_type": "user"
			},
			"fields": []
	 }

	 return query;
	};
}