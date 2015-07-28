  nodepress.directive('nodepressForm' , function(){

    return {
      restrict: 'E',
      scope: {
        friend: '='
      },
      controller: function($scope){
        console.log($scope.friend);
      }
    }

  });
