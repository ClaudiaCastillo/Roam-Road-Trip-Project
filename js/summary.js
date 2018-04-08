function init() {


    var origin = localStorage.getItem('markPoint0Name'); 
    var pitstop = localStorage.getItem('markPoint1Name'); 
    var destination = localStorage.getItem('markPoint2Name'); 

    var lodgingWaySummary = localStorage.getItem('lodgingWayPointSummary'); 
    
    $('#lgSelections').html(lodgingWaySummary);

    var foodWaySummary = localStorage.getItem('foodWayPointSummary'); 
    
    $('#lgSelections').html(foodWaySummary);


    $('#startPoint').text(origin); 

    $('#profile-tab').text(pitstop); 
    $('#profile-tab').attr('placeid', localStorage.getItem('markPoint1')); 
    $('#profile-tab').attr('name', pitstop);

    $('#contact-tab').text(destination); 
    $('#contact-tab').attr('placeid', localStorage.getItem('markPoint2')); 
    $('#contact-tab').attr('name', destination);
}

init();