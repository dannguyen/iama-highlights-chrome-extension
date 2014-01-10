// Reddit IAMA Highlights
// my first Chrome extension
// Note: this has unoptimal usability and should probably not be used at all.


// dependencies: jQuery, which is loaded as part of the plugin because why not.


var iamaHighlights = (function(){
  var authorId = "";

  var mylog = function(logname, str){
    $("#" + logname + "-log").text(str)
  }; 

  var toggleAncillaryComments = function(){

    // first time initialization 
      // read the author ID
    authorId = $("div#siteTable .tagline a").attr('class').match(/\bid-\w+/)[0];
    var authorIdSelector = "." + authorId;

    var authorEntries = $(authorIdSelector).parents("div.entry").addClass('keep');
    var initiatorEntries = authorEntries.parents("div.child").prev("div.entry").addClass('keep');

    console.log("set authorId to: " + authorIdSelector)
    
    var $entries = $("div.entry");
    
    $entries.not('.keep')
      .toggleClass('hyde')
      .siblings() //refers to the up/down vote arrows in the middle-col element
      .toggleClass('hyde');    

    mylog("comments",  $("div.entry:visible").length + "/" + $entries.length + " comments visible" );

  };

  return{
    'toggleAncillaryComments': toggleAncillaryComments,
    'authorId': authorId
  }

})();

$(document).ready(function(){

  $("body").append(
    "<footer id='iama-foot'>
    <span class=\"log\" id='comments-log'> </span>
    <span class=\"log\" id='loading-log'> </span>
    </footer>"
  );

  $("#iama-foot").prepend(
    $("<span class='my button'>Show/Hide Comments</span> &nbsp;").click(iamaHighlights.toggleAncillaryComments)
  );

  // .prepend(
  //  $("<span class='my button'>Show-all</span> &nbsp;").click(iamaHighlights.showAllComments)
  // ).prepend(
  //  $("<span class='my button'>Load-more</span> &nbsp;").click(iamaHighlights.startLoadingMoreElements)
  // ).prepend(
  //  $("<span class='my button'>Pause-loading</span> &nbsp;").click(iamaHighlights.stopLoadingMoreElements)
  // )

});


