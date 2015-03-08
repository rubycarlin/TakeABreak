var app = angular.module("timerApp",[]);

function timerCtrl($scope, $timeout){
	var timer = this;
	timer.worktime = 0;
	timer.breaktime = 0;

	
	timer.startCountdown = function(){
		var TimeOutWork = $timeout(countDownWork, 1000);
		var timerCount = timer.worktime * 60;
		console.log("Inside start count down");
		var countDownWork = function () {
			console.log("Inside count down function");
			if (timerCount < 0) {
			  //Any desired function upon countdown end.
			  timerCount = 0;
			  $timeout.cancel(TimeOutWork);
			  timer.startBreakCountdown();
			} else {
			  $scope.countDownLeft = timerCount;
			  timerCount--;
			  $timeout(countDownWork, 1000);
			}
		};
		$scope.countDownLeft = timerCount;
		countDownWork();
	}

	

	timer.startBreakCountdown = function(){
		var alert = confirm("Break Phase Started :)");
		var TimeOutBreak = $timeout(countDownBreak, 1000);

		var timerCount = timer.breaktime * 60;

		console.log("Inside start count down");
		
		var countDownBreak = function () {
			console.log("Inside count down function");
			if (timerCount < 0) {
			  //Any desired function upon countdown end.
			  timerCount = 0;
			  $timeout.cancel(TimeOutBreak);
			  timer.startCountdown();
			} else {
			  $scope.countDownLeft = timerCount;
			  timerCount--;
			  $timeout(countDownBreak, 1000);
			}
		};
		$scope.countDownLeft = timerCount;
		countDownBreak();

	}

	timer.stop = function(){		
		$timeout.cancel($scope.$timeout);        
    }

	timer.reset = function(){
		timer.worktime = 0;
		timer.breaktime = 0;
	}

};