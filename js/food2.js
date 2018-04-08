$(document).ready(function() {
 

  // Clear localStorage - to delete all entries of the store
  //localStorage.clear();


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_apD7d0ocNgkcfY50DUi5e818qUahmrc",
    authDomain: "project-gt-82242.firebaseapp.com",
    databaseURL: "https://project-gt-82242.firebaseio.com",
    projectId: "project-gt-82242",
    storageBucket: "project-gt-82242.appspot.com",
    messagingSenderId: "954443679576"
  };

  firebase.initializeApp(config);


  var gApiKey = 'AIzaSyB7V7WeGMLuVehCSagXe_pKscF8ksKDzkk';
  var gName       = '';
  var gRating     = '';
  var gVicinity   = '';
  var gPriceLevel = '';

  var eRadius = '50000';
  var eTypes  = 'restaurant';
  var eMinPrice = '0';
  var eMaxPrice = '4';

  var wRadius = '50000';
  var wTypes  = 'restaurant';
  var wMinPrice = '0';
  var wMaxPrice = '4';

  var eLattLong = false;
  var wLattLong = false;

  var endPlaceIdFound = false;
  var wayPlaceIdFound = false;

  var eLatt = '';
  var eLong = '';
  var ePlId = '';
  var ePlNm = '';
  var eBdgt = '';

  var wLatt = '';
  var wLong = '';
  var wPlId = '';
  var wPlNm = '';
  var wBdgt = '';

  var endPlacesArray = [];		// SAMANTHA, I REMOVED THE SELECTIONS OBJECT THAT WAS HERE
  var wayPlacesArray = [];
  
  var waySeleArray = [];
  var endSeleArray = [];

  var lodgingWaySummary = ''; 
  var lodgingEndSummary = ''; 


  data = firebase.database().ref();

  // *** Set up Proxy and base Query's *******************************************//
  const proxyURL  = "https://cors-anywhere.herokuapp.com/";
  var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var queryPlcURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  // *****************************************************************************//


  function init() {


    var origin = localStorage.getItem('markPoint0Name'); 
    var pitstop = localStorage.getItem('markPoint1Name'); 
    var destination = localStorage.getItem('markPoint2Name'); 

    var lodgingWaySummary = localStorage.getItem('lodgingWayPointSummary'); 
    
    $('#lgSelections').html(lodgingWaySummary);

    $('#startPoint').text(origin); 

    $('#profile-tab').text(pitstop); 
    $('#profile-tab').attr('placeid', localStorage.getItem('markPoint1')); 
    $('#profile-tab').attr('name', pitstop);

    $('#contact-tab').text(destination); 
    $('#contact-tab').attr('placeid', localStorage.getItem('markPoint2')); 
    $('#contact-tab').attr('name', destination);

    // *** Retrieve Place ID from Store *******************************************//
    for(var i=0, len=localStorage.length; i<len; i++) {
      var key   = localStorage.key(i);
      var value = localStorage[key];
      //console.log(key + " => " + value);

      if (key === "markPoint2"){
        ePlId = value;
        endPlaceIdFound = true;
        //console.log("get local storage end point: ", ePlId, " ", endPlaceIdFound);
      }
      if (key === "markPoint1"){
        wPlId = value;
        wayPlaceIdFound = true;
        //console.log("get local storage way point: ", ePlId, " ", wayPlaceIdFound);
      }
    }






      




    // *****************************************************************************//


      // *** Retrieve End Pont Information via Google APIs ***************************//
      if (endPlaceIdFound) {

          // Ajax Query for Google Geocode API (end point) --------------------------------//
          var bldQueryGeoURL = queryGeoURL + "place_id=" + ePlId + "&key=" + gApiKey; 
          //console.log("ajax geo query URL end point: ", bldQueryGeoURL);

          $.ajax({
              url: proxyURL + bldQueryGeoURL,
              method: "GET"
          })
              .done(function(geoResponse) {
                //console.log("ajax geo end point response: ", geoResponse);

                eLatt = geoResponse.results[0].geometry.location.lat.toString();
                eLong = geoResponse.results[0].geometry.location.lng.toString();
                eLattLong = true;
                //console.log("get end point lattitude longitude: ", eLatt, " ", eLong, " ", eLattLong);

                // -----------------------------------------------------------------------------//

                if (eLattLong) {
                    // Ajax Query for Google Places API (end point ) -------------------------------//
                    //var bldQueryPlcURL = queryPlcURL + "location=" + eLatt + "," + eLong + "&radius=" + eRadius + "&types=" + eTypes +
                     // "&minprice=" + eMinPrice + "&maxprice=" + eMaxPrice + "&key=" + gApiKey;

                    var bldQueryPlcURL = queryPlcURL + "location=" + eLatt + "," + eLong + "&radius=" + eRadius + "&types=" + eTypes + "&key=" + gApiKey;
                    //console.log("ajax plc query URL end point: ", bldQueryPlcURL);

                    $.ajax({
                        url: proxyURL + bldQueryPlcURL,
                        method: "GET"
                    })
                      .done(function(plcResponse) {
                          //console.log("ajax plc end point response: ", plcResponse);

                          var placesResults = plcResponse.results;
                          for (var i = 0; i < placesResults.length; i++) {
                            gName       = placesResults[i].name;
                            gRating     = placesResults[i].rating;
                            gVicinity   = placesResults[i].vicinity;
                            gPriceLevel = placesResults[i].price_level;

                            var photoRef = placesResults[i].photos[0].photo_reference; 
                            var photoImg = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+gApiKey; 

                            //console.log("test photo: ", photoRef, img1);

                            //console.log(" name rating vicinity pricelevel", i, ' ', gName, ' ', gRating, ' ', gVicinity, ' ', gPriceLevel);
                            /* -------------------------------------- */
                            /* format and display the data on the DOM */
                            /* -------------------------------------- */

                            if (i < 4) {
                              // Build the Restaurant Name DOM ID
                              var rNameId = "#ep-res-name-"+ [i+1];
                              $(rNameId).html(gName);

                              // Build the Restaurant Description DOM ID
                              var rDescription = '';

                              var rRating = placesResults[i].rating;
                              if (rRating !='') {
                                rDescription = rDescription + "RATING: " + rRating + "; ";
                              };

                              // Build the Restaurant Price Level Sign
                              // 0 —> Free; 1 —> Inexpensive; 2 —> Moderate; 3 —> Expensive; 4 —> Very Expensive
                              var gPriceLvl = 0;
                              var rPrLvlDollars = "$$";

                              if (gPriceLvl == parseInt(placesResults[i].price_level)) {
                                // Adjust price level sign depending upon price level returned in places JSON data
                                rPrLvlDollars = "$$$";
                                if (gPriceLvl< 3){
                                    rPrLvlDollars = "$$";
                                };
                                if (gPriceLvl < 2){
                                    rPrLvlDollars = "$";
                                };
                              }
                              else {
                                // Data is not an integer so assign a default price level dollar value
                                rPrLvlDollars = "$$";
                              }; 
                              rDescription = rDescription + "BUDGET LEVEL: " + rPrLvlDollars + "; "; 

                              var rVicinity = placesResults[i].vicinity;
                              if (rVicinity != '') {
                                rDescription = rDescription + "VICINITY: " + rVicinity;
                              };
                              var rDescriptionId = "#ep-res-desc-" + [i+1];
                              $(rDescriptionId).html(rDescription);
 
                              var rPhotoId = "#ep-res-img-" + [i+1];
                              // var parent = document.getElementById(rPhotoId);
 
                              // //create an image element
                              // var imageEl = document.createElement("IMG");
                              // imageEl.setAttribute("src", photoImg);
                              // imageEl.setAttribute("class", "photoimage");
                              // parent.appendChild(imageEl);

                              $(rPhotoId).attr('src', photoImg);

                              /* ------------------------------------------- */
                              /* Write the summary data to a temporary array */
                              /* ------------------------------------------- */

                              endPlacesArray.push([gName,rDescription]);
                              
                              //console.log("end places: ", endPlacesArray);

                            }; // end process JSON data and display on DOM 
                          }; // end For Loop to get all entries from the JSON array  
                    }); // end of AJAX done functionality
                  // -----------------------------------------------------------------------------//
                }; // end of boolean check for lattitude & longitude values  

          });
      // *****************************************************************************//
    };
  // });


      // *** Retrieve End Pont Information via Google APIs ***************************//
      if (wayPlaceIdFound) {

          // Ajax Query for Google Geocode API (end point) --------------------------------//
          bldQueryGeoURL = queryGeoURL + "place_id=" + wPlId + "&key=" + gApiKey; 
          //console.log("ajax geo query URL way point: ", bldQueryGeoURL);

          $.ajax({
              url: proxyURL + bldQueryGeoURL,
              method: "GET"
          })
              .done(function(geoResponse) {
                //console.log("ajax place way point response: ", geoResponse);

                wLatt = geoResponse.results[0].geometry.location.lat.toString();
                wLong = geoResponse.results[0].geometry.location.lng.toString();
                wLattLong = true;
                //console.log("get way point lattitude longitude: ", wLatt, " ", wLong, " ", wLattLong);

                // -----------------------------------------------------------------------------//

                if (wLattLong) {
                    // Ajax Query for Google Places API (way point ) -------------------------------//
                    //bldQueryPlcURL = queryPlcURL + "location=" + wLatt + "," + wLong + "&radius=" + eRadius + "&types=" + eTypes +
                    //  "&minprice=" + eMinPrice + "&maxprice=" + eMaxPrice + "&key=" + gApiKey; 

                    var bldQueryPlcURL = queryPlcURL + "location=" + wLatt + "," + wLong + "&radius=" + wRadius + "&types=" + wTypes + "&key=" + gApiKey;
       
                    //console.log("ajax plc query URL way point: ", queryPlcURL);

                    $.ajax({
                        url: proxyURL + bldQueryPlcURL,
                        method: "GET"
                    })
                      .done(function(plcResponse) {
                          //console.log("ajax plc way point response: ", plcResponse);

                          var placesResults = plcResponse.results;
                          for (var i = 0; i < placesResults.length; i++) {
                            gName       = placesResults[i].name;
                            gRating     = placesResults[i].rating;
                            gVicinity   = placesResults[i].vicinity;
                            gPriceLevel = placesResults[i].price_level;
                            //console.log(" name rating vicinity pricelevel", i, ' ', gName, ' ', gRating, ' ', gVicinity, ' ', gPriceLevel);

                            var photoRef = placesResults[i].photos[0].photo_reference; 
                            var photoImg = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+gApiKey; 

                            //console.log("test photo: ", photoRef, photoImg);

                            /* -------------------------------------- */
                            /* format and display the data on the DOM */
                            /* -------------------------------------- */

                            if (i < 4) {
                              // Build the Restaurant Name DOM ID
                              var rNameId = "#wp-res-name-"+ [i+1];
                              $(rNameId).html(gName);

                              // Build the Restaurant Description DOM ID
                              var rDescription = '';

                              var rRating = placesResults[i].rating;
                              if (rRating !='') {
                                rDescription = rDescription + "RATING: " + rRating + "; "; 
                              };

                              // Build the Restaurant Price Level Sign
                              // 0 —> Free; 1 —> Inexpensive; 2 —> Moderate; 3 —> Expensive; 4 —> Very Expensive
                              var gPriceLvl = 0;
                              var rPrLvlDollars = "$$";

                              if (gPriceLvl == parseInt(placesResults[i].price_level)) {
                                // Adjust price level sign depending upon price level returned in places JSON data
                                rPrLvlDollars = "$$$";
                                if (gPriceLvl< 3){
                                    rPrLvlDollars = "$$";
                                };
                                if (gPriceLvl < 2){
                                    rPrLvlDollars = "$";
                                };
                              }
                              else {
                                // Data is not an integer so assign a default price level dollar value
                                rPrLvlDollars = "$$";
                              }; 
                              rDescription = rDescription + "BUDGET LEVEL: " + rPrLvlDollars + "; "; 

                              var rVicinity = placesResults[i].vicinity;
                              if (rVicinity != '') {
                                rDescription = rDescription + "VICINITY: " + rVicinity;
                              };

                              var rDescriptionId = "#wp-res-desc-" + [i+1];
                              $(rDescriptionId).html(rDescription);

                              var rPhotoId = "#wp-res-img-" + [i+1];
                              // var parent = document.getElementById(rPhotoId);
 
                              // //create an image element
                              // var imageEl = document.createElement("IMG");
                              // imageEl.setAttribute("src", photoImg);
                              // imageEl.setAttribute("class", "photoimage");
                              // parent.appendChild(imageEl);

                              $(rPhotoId).attr('src', photoImg);

                              /* ------------------------------------------- */
                              /* Write the summary data to a temporary array */
                              /* ------------------------------------------- */

                              wayPlacesArray.push([gName,rDescription]);
          
                              //console.log("way places: ",wayPlacesArray);

                            }; // end process JSON data and display on DOM 
                          }; // end For Loop to get all entries from the JSON array  
                    }); // end of AJAX done functionality
                  // -----------------------------------------------------------------------------//
                }; // end of boolean check for lattitude & longitude values  

          });
      // *****************************************************************************//
    };
  // });

  }; // *** end of init function ***
 
  function epSummary() {
    epSumm = '';
    endSeleArray = [];
    
    var cm = ", ";
    var br = ";";	// Samantha, I replaced the comma with a semi-colon as some names have a comma in them

    $('#fdSelections').empty();

    $.each($("input[name='ep-res-sel-1']:checked"), function() {
      epSumm = epSumm + endPlacesArray[0][0] + cm;
      endSeleArray.push([endPlacesArray[0][0] + br + endPlacesArray[0][1]]);
      //console.log("end selc array ", endSeleArray);
    });

    $.each($("input[name='ep-res-sel-2']:checked"), function() {
      epSumm = epSumm + endPlacesArray[1][0] + cm;
      endSeleArray.push([endPlacesArray[1][0] + br + endPlacesArray[1][1]]);
    });

    $.each($("input[name='ep-res-sel-3']:checked"), function() {
      epSumm = epSumm + endPlacesArray[2][0] + cm;
      endSeleArray.push([endPlacesArray[2][0] + br + endPlacesArray[2][1]]);
    });

    $.each($("input[name='ep-res-sel-4']:checked"), function() {
      epSumm = epSumm + endPlacesArray[3][0] + cm;
      endSeleArray.push([endPlacesArray[3][0] + br + endPlacesArray[3][1]]);
    });



    epSumm = epSumm.slice(0, -2);

    $('#fdSelections').html(epSumm);

    localStorage.setItem('foodEndPointSummary', epSumm); 

    updateDB();
  };



  function wpSummary() {
    wpSumm = '';
    waySeleArray = [];
    
    var cm = ", ";
    var br = ";";	// Samantha, I replaced the comma with a semi-colon as some names have a comma in them
    
    $('#fdSelections').empty();

    $.each($("input[name='wp-res-sel-1']:checked"), function() {
      wpSumm = wpSumm + wayPlacesArray[0][0] + cm;
      waySeleArray.push([wayPlacesArray[0][0] + br + wayPlacesArray[0][1]]);
    });

    $.each($("input[name='wp-res-sel-2']:checked"), function() {
      wpSumm = wpSumm + wayPlacesArray[1][0] + cm;
      waySeleArray.push([wayPlacesArray[1][0] + br + wayPlacesArray[1][1]]);
    });

    $.each($("input[name='wp-res-sel-3']:checked"), function() {
      wpSumm = wpSumm + wayPlacesArray[2][0] + cm;
      waySeleArray.push([wayPlacesArray[2][0] + br + wayPlacesArray[2][1]]);
    });

    $.each($("input[name='wp-res-sel-4']:checked"), function() {
      wpSumm = wpSumm + wayPlacesArray[3][0] + cm;
      waySeleArray.push([wayPlacesArray[3][0] + br + wayPlacesArray[3][1]]);
    });

    wpSumm = wpSumm.slice(0, -2);

    $('#fdSelections').html(wpSumm);

    localStorage.setItem('foodWayPointSummary', wpSumm); 

    updateDB();

  };


  function updateDB() {
    var newFood = {
         endSelection: [],
         waySelection: []  
    };
    // load the food objects with new data obtained from Google API
    for (var i = 0; i < waySeleArray.length; i++) {
      newFood.waySelection[i] = waySeleArray[i];
    };
    for (var i = 0; i < endSeleArray.length; i++) {
      newFood.endSelection[i] = endSeleArray[i];
    };
    // get Firebase DB selections record
    var selections = {};
    data.child("selections");
    selections.food = newFood;
    //Upload the Road Trip food selections data object into the database
    //data.update(selections);                     
    //data.child("selections");
  };



  $( "#contact-tab" ).click(function() {
    $('#fdSelections').empty();
    var lodgingWaySummary = localStorage.getItem('lodgingWayPointSummary'); 
    
    $('#lgSelections').html(lodgingWaySummary);
  });
  $( "#profile-tab" ).click(function() {
    $('#fdSelections').empty();
    var lodgingEndSummary = localStorage.getItem('lodgingEndPointSummary'); 
    $('#lgSelections').html(lodgingEndSummary);
  });

  $(".wp-res-sel-1").click(function() {
    wpSummary();
  });
  $(".wp-res-sel-2").click(function() {
    wpSummary();
  });
  $(".wp-res-sel-3").click(function() {
    wpSummary();
  });
  $(".wp-res-sel-4").click(function() {
    wpSummary();
  });
  $(".ep-res-sel-1").click(function() {
    epSummary();
  });
  $(".ep-res-sel-2").click(function() {
    epSummary();
  });
  $(".ep-res-sel-3").click(function() {
    epSummary();
  });
  $(".ep-res-sel-4").click(function() {
    epSummary();
  });


  init();

});
