var helloWorldCtrl    = {};
require('express-custom-response')(__dirname + '/../responses');


helloWorldCtrl.foo = function(req, res) {
	res.ok({
          status : 'success',
          data   : {}
      	});
  	//res.send('Hello World!!!!');
};

module.exports = helloWorldCtrl;
