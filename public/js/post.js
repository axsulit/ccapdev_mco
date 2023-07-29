// function for shortening post description
function shortenContent(content, maxLength) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }
  
  // limit post description to 100 characters
  document.addEventListener("DOMContentLoaded", function() {
    var maxLength = 100;
    var paragraphElements = document.querySelectorAll(".post-description");
    
    paragraphElements.forEach(function(paragraphElement) {
      var content = paragraphElement.textContent;
      var shortenedContent = shortenContent(content, maxLength);
      paragraphElement.textContent = shortenedContent;
    });
  });
  