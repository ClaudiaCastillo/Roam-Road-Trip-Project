

// function initMap(){	
	
// 	var dirService = new google.maps.DirectionsService ; 
// 	var dirDisplay = new google.maps.DirectionsRenderer ;
// 	var autocompleteOrigin; 
// 	var autocompleteDestination;  
// 	var wayptsList = []; 
// 	//Set parameters for map.
// 	var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: {lat: 41.85, lng: -87.65}
//         });
// 	//Display the map
// 	dirDisplay.setMap(map); 
		

// 	//set origin, destination and waypoint markers 
// 	var originInput = document.getElementById('origin'); 
// 	var destinationInput = document.getElementById('destination'); 
// 	var pitstopInput = document.getElementById('pitstop'); 
// 	if(originInput!=null){
// 		var autocompleteOrigin = new google.maps.places.Autocomplete(originInput); 
// 		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(originInput); 	
// 	}
// 	if (pitstopInput!=null){
// 		var autocompletePitstop = new google.maps.places.Autocomplete(pitstopInput);
// 		 // $("#addWayPoint").on('click', function() {
       		
//    //     		$("#wayPointList").append('<li>' + pitstopInput.value + '</li>');    
//    //     		wayptsList.push(pitstopInput.value); 
//    //     })
		
// 	}
// 	if (destinationInput!=null){
// 		var autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
// 		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(destinationInput); 	
// 	}


// 	$("#submit").click(function(){
// 		event.preventDefault(); 
// 		calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput, wayptsList); 

// 	})
// }



// function calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput, pitstop){

// 	var waypts = []; 
// 			// for (var i = 0; i < wayptsList.length; i++) {
// 	  //         	waypts.push({
// 	  //             location: wayptsList[i],
// 	  //             stopover: true
// 	  //           });
// 	  waypts.push({
// 	  	location: document.getElementById('pitstop').value, 
// 	  	stopover: true
// 	  })
          
			
// 	dirService.route({	
// 		origin: originInput.value, 
// 		destination: destinationInput.value,
// 		travelMode: "DRIVING",
// 		waypoints: waypts,
// 		optimizeWaypoints: true
// 	}, function(result, status){
// 		if(status ==="OK"){
// 			console.log(result);		
// 			dirDisplay.setDirections(result); 
// 			localStorage.clear();  
// 			var markPoint; 
// 			for (var j = 0; j<result.geocoded_waypoints.length; j++){
// 				var  markPoint = result.geocoded_waypoints[j].place_id; 
// 				var key = "markPoint"+j;		
// 				localStorage.setItem(key, markPoint); 	
// 			}

// 			var markPoint0Name = result.request.origin.query; 
// 			var markPoint1Name = result.request.waypoints[0].location.query; 
// 			var markPoint2Name = result.request.destination.query; 
// 			localStorage.setItem("markPoint0Name", markPoint0Name); 
// 			localStorage.setItem("markPoint1Name", markPoint1Name); 
// 			localStorage.setItem("markPoint2Name", markPoint2Name); 

			
// 		}
// 		else{
// 			windows.alert("Direction Request Failed due to" + status); 
// 		}
// 	})


// 	}


function initMap(){	
	
	var dirService = new google.maps.DirectionsService ; 
	var dirDisplay = new google.maps.DirectionsRenderer ;
	var autocompleteOrigin; 
	var autocompleteDestination;  
	var wayptsList = []; 
	//Set parameters for map.
	var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 41.85, lng: -87.65}
        });
	//Display the map
	dirDisplay.setMap(map); 
		

	//set origin, destination and waypoint markers 
	var originInput = document.getElementById('origin'); 
	var destinationInput = document.getElementById('destination'); 
	var pitstopInput = document.getElementById('pitstop'); 
	if(originInput!=null){
		var autocompleteOrigin = new google.maps.places.Autocomplete(originInput); 
		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(originInput); 	
	}
	if (pitstopInput!=null){
		var autocompletePitstop = new google.maps.places.Autocomplete(pitstopInput);
		 // $("#addWayPoint").on('click', function() {
       		
   //     		$("#wayPointList").append('<li>' + pitstopInput.value + '</li>');    
   //     		wayptsList.push(pitstopInput.value); 
   //     })
		
	}
	if (destinationInput!=null){
		var autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(destinationInput); 	
	}


	$("#submit").click(function(){
		event.preventDefault(); 
		calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput, wayptsList); 

	})
}



function calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput, pitstop){

	var waypts = []; 
			// for (var i = 0; i < wayptsList.length; i++) {
	  //         	waypts.push({
	  //             location: wayptsList[i],
	  //             stopover: true
	  //           });
	  waypts.push({
	  	location: document.getElementById('pitstop').value, 
	  	stopover: true
	  })
          
			
	dirService.route({	
		origin: originInput.value, 
		destination: destinationInput.value,
		travelMode: "DRIVING",
		waypoints: waypts,
		optimizeWaypoints: true
	}, function(result, status){
		if(status ==="OK"){
			console.log(result);		
			dirDisplay.setDirections(result); 
			localStorage.clear();  
			var markPoint; 
			for (var j = 0; j<result.geocoded_waypoints.length; j++){
				var  markPoint = result.geocoded_waypoints[j].place_id; 
				var key = "markPoint"+j;		
				localStorage.setItem(key, markPoint); 	
			}

			var markPoint0Name = result.request.origin.query; 
			var markPoint1Name = result.request.waypoints[0].location.query; 
			var markPoint2Name = result.request.destination.query; 
			localStorage.setItem("markPoint0Name", markPoint0Name); 
			localStorage.setItem("markPoint1Name", markPoint1Name); 
			localStorage.setItem("markPoint2Name", markPoint2Name); 

			
		}
		else{
			windows.alert("Direction Request Failed due to" + status); 
		}
	})


	}




