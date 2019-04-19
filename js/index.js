$(document).ready(function () {

    var key = "AIzaSyA08bG5gHpKMW4vt0Z--AVYeepXp5VmTzw";
   var playlistId = 'PLHZlRDSieHLQxta-1gA3U9N8PbbARvOzP'; //hatch reels//
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId,
    };

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function(data) {
          console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);          
        });
    }
  function mainVid(id){
    $("#video").html(`
<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
`);
  }
  
  function resultsLoop(data){
    $.each(data.items, function(i, item){
      var thumbnail = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var description = item.snippet.description.substring(0, 100);
      var vid = item.snippet.resourceId.videoId;
      
      $("main").append(`
<article class = "item" data-key = "${vid}">    
       <img src = "${thumbnail}" class = "thumb"> 
      <div class="details">
        <h4>${title}</h4>
        <p>${description}...</p>
      </div>
    </article>
`);
      
      
      
    });     
  }
    $("main").on("click", "article", function(){
          // alert ("hello");
          var id = $(this).attr("data-key");
          // alert (id);
      mainVid(id);
        
       });
  
  // end of whole document.ready
  }); 






// playlistId for Hatch Reels 'how to make own leaders" = PLHZlRDSieHLSZEJc0CXqpCOch-bnFrgoN