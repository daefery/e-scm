var formlogin = $('#form-login');

$('#btn-login').click(function(){
	var uname = formlogin.find('#username').val();
	var pass = formlogin.find('#password').val();
	var user_credential = undefined;
	if(uname && pass){
		user_credential = {
			username : uname,
			password : pass
		};
	}

	login(user_credential);
});

function login(user_credential) {
	var msg = $('#msg_login');
	msg.addClass('hide');
	if(user_credential!= undefined){
		var valid = true;
		switch(user_credential.username){
			case 'chasier':
				if(user_credential.password != 'csr123')
					valid = false;
				break;
			case 'inventory':
				if(user_credential.password != 'inv123')
					valid = false;
				break;
			case 'admin':
				if(user_credential.password != 'admin123')
					valid = false;
				break;
			default : valid = false;
		}

		if(valid){
			window.location.replace("../landingpage.html");
		}else{
			msg.removeClass('hide');
			msg.html('username or password incorect.');
		}
	}else{
		msg.removeClass('hide');
		msg.html('login form is required.');
	}	
}