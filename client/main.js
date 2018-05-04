angular.module('fileUpload', ['ngFileUpload'])
.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    var vm = this;
    vm.submit = function(){ 
        if (vm.upload_form.file.$valid && vm.file) { 
            vm.upload(vm.file);
        }
    }
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload', 
            data:{file:file}
        }).then(function (resp) { 
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; 
        });
    };
}]);