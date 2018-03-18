//(function( ng, app ) {
proxima_data_app_5aadc2ba427174001498ade0.controller('ctrlPlayer', 
    ['$scope', '$injector', function($scope, $injector) {
        $scope.playingItem = null;
        $scope.currentDuration = 100;
        $scope.currentTimePosition = '00:00';
        $scope.currentTime = 1;
        $scope.currentIndex = -1;
        $scope.currentVolume = 10;

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $('#rangeTrack').change(function() {
            console.log($(this).val());
            $scope.playerObject.currentTime = $(this).val();
        });

        $('#rangeVolume').change(function() {
            console.log($(this).val());
            $scope.playerObject.volume = $(this).val() / 10;
        });

        $scope.playerObject = $('#playerObject')[0];
        $('#rangeTrack').slider();

        playerObject.ondurationchange = function(){
            $scope.currentDuration = Math.floor($scope.playerObject.duration);
            //$('#rangeTrack').slider( 'option', 'value', $scope.playerObject.duration );
        };
        playerObject.ontimeupdate = function(){
            var minutes = Math.floor($scope.playerObject.currentTime / 60);
            var seconds = Math.floor(
                ($scope.playerObject.currentTime < 60 ? $scope.playerObject.currentTime : $scope.playerObject.currentTime - minutes * 60));
            $scope.safeApply(function(){
                $scope.currentTimePosition = ("0" + minutes).slice(-2) + ':' +("0" + seconds).slice(-2) ;
            });
            $scope.currentTime = $scope.playerObject.currentTime;
        };
        playerObject.onended = function(){
            $scope.safeApply(function(){
                $scope.playingItem = null;
            });
            if ($scope.currentIndex < ($scope.items.length -1)){
                $scope.playTrack($scope.currentIndex + 1);
            }
        };

        $scope.playTrack = function(index){
            $scope.playingItem = $scope.items[index];
            $scope.currentIndex = index;
            //console.log(index);
            var playerButton = $('#button_' + $scope.playingItem._id);

            var src = $scope.playingItem['Beat name'].url;
            

            if (playerObject.src.indexOf(src) == -1){
                // Another song, always play
                playerObject.src = src;
                playerObject.play();
            } else {
                if (playerObject.paused){
                    playerObject.play();
                } else {
                    playerObject.pause();
                    $scope.playingItem = null
                }
            }
        };

        $scope.playPause = function(){
            if (playerObject.paused){
                $scope.playingItem = $scope.items[$scope.currentIndex];
                playerObject.play();
            } else {
                playerObject.pause();
                $scope.safeApply(function(){
                    $scope.playingItem = null;
                });
            }
        };

        $scope.nextTrack = function(){
            if ($scope.currentIndex < ($scope.items.length -1)){
                $scope.playTrack($scope.currentIndex + 1);
            }
        };

        $scope.prevTrack = function(){
            if ($scope.currentIndex > 0){
                $scope.playTrack($scope.currentIndex - 1);
            }
        };
}]); 
//})( angular, proxima_data_app_5aa3106e28a50fa7190bb4d6 );