export default class pageModel {
	
	static retrieveAllInformations(userEmail){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userEmail
				 }
			},
			"fields": []
	 };

	 return query;
	};

	static retrieveDeviceByUser(userEmail){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userEmail
				 },
				 "doc_type": "device"
			},
			"fields": []
	 };

	 return query;
	};

	static retrievePetByUser(userEmail){
		const query = {
			"selector": {
				 "creation_information": {
						"by": userEmail
				 },
				 "doc_type": "pet"
			},
			"fields": []
	 };

	 return query;
	};

	static retrieveUserInformation(userEmail, password){
		const query = {
			"selector": {
				 "user_information": {
						"email": userEmail,
						"password": password
				 },
				 "doc_type": "user"
			},
			"fields": []
	 }

	 return query;
	};
}