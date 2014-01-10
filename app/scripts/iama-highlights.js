// Reddit IAMA Highlights
// my first Chrome extension
// Note: this has unoptimal usability and should probably not be used at all.


// dependencies: jQuery, which is loaded as part of the plugin because why not.


var iamaHighlights = (function(){
  var authorId = "";
  var _okToLoad = false;

  var mylog = function(logname, str){
    $("#" + logname + "-log").text(str)
  }; 


  var findMoreElements = function(){
    var more_elements = $('.morecomments a.button');
//    $("#my-counter").text($("div.entry").length + " entries. " +  more_elements.length + ' load-more links left.');
    return more_elements.splice(0,1);
  };

  var toggleLoadingMoreElements = function(){
    _okToLoad = !_okToLoad;

    if(_okToLoad){
      loadMoreElements();
    }
  };

  var loadMoreElements = function(){
    var $more_elements = $('.morecomments a.button');
    var loaders_left_str = $more_elements.length + " loaders left." 

    if(_okToLoad !== true){
      mylog("status", "Loading stopped. " + loaders_left_str)
      $(this).text("Load More...")
    }else{
       if( $more_elements.length > 0){
        var $el = $more_elements.first();
        $el.trigger('click');
        mylog("status", "Loaded " + $el.attr('id') + ". " + loaders_left_str);

         // click the next element      
          //and then find the next element
        setTimeout(function(){ 
          iamaHighlights.loadMoreElements(); 
        }, 1200);

        $(this).text("Stop loading")
      }
    }

    return false;

   
  };

  var toggleAncillaryComments = function(){

    // first time initialization 
      // read the author ID
    authorId = $("div#siteTable .tagline a").attr('class').match(/\bid-\w+/)[0];
    var authorIdSelector = "." + authorId;

    var authorEntries = $(authorIdSelector).parents("div.entry").addClass('keep');
    var initiatorEntries = authorEntries.parents("div.child").prev("div.entry").addClass('keep');

   // console.log("set authorId to: " + authorIdSelector)
    
    var $entries = $("div.entry");    
    $entries.not('.keep')
      .toggleClass('hyde')
      .siblings() //refers to the up/down vote arrows in the middle-col element
      .toggleClass('hyde');    

    mylog("comments",  $("div.entry:visible").length + "/" + $entries.length + " comments visible" );

  };





  return{
    'toggleAncillaryComments': toggleAncillaryComments,
    'authorId': authorId,
    'toggleLoadingMoreElements': toggleLoadingMoreElements,
    'loadMoreElements': loadMoreElements
  }

})();

$(document).ready(function(){
  $("body").append("<footer id='iama-foot'><span class=\"log\" id='comments-log'> </span><span class=\"log\" id='status-log'> </span></footer>"
  );

  $("#iama-foot")
      .append($("<span class='my button'>Show/Hide Comments</span>")
        .click(iamaHighlights.toggleAncillaryComments))      
      .append($("<span class='my button'>Load More/Pause</span>")
        .click(iamaHighlights.toggleLoadingMoreElements));
});


