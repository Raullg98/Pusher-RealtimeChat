angular.module('Chat', ['pusher-angular'])
.controller('Controller', ['$scope', '$pusher', '$http', function($scope, $pusher, $http) {
  var app = this;
  app.autor = "";
  app.messages = [
  {text:'Chat realtime with Pusher', autor:'Chat'},
  {text:'Por: Raul Lara', autor:'Chat'}];
  Pusher.logToConsole = true;

  var client = new Pusher('815e02e0e8ecb647d10c');
  var pusher = $pusher(client);
  var channel = pusher.subscribe('messages');
  channel.bind('message',
    function(data) {
      app.messages.push({text:data.text, autor:data.autor});
      $scope.$apply();
    }
    );
  

  app.add = function() {
   console.log(channel)
    app.messages.push({text:app.text, autor: app.autor});
    console.log(app.autor)
    var req = {
     method: 'POST',
     url: '/api/messages/new',
     headers: {
       'Content-Type': "application/json"
     },
     data: {autor: app.autor, text: app.text, channel: "messages", event: "message", socketid: pusher.connection.baseConnection.socket_id} 
   }

   $http(req).then(function(req){
    console.log(req);
    console.log(pusher)
  }, function(){
    console.log("Try again, fail");
  });


   app.text = '';
   console.log(app.messages);


 };

}]);