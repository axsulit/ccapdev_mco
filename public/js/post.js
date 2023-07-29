// function for shortening post description
function shortenContent(content, maxLength) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
}
  

document.addEventListener("DOMContentLoaded", function() {
    
    // limit post description to 100 characters
    var maxLength = 100;
    var paragraphElements = document.querySelectorAll(".post-description");

    paragraphElements.forEach(function(paragraphElement) {
    var content = paragraphElement.textContent;
    var shortenedContent = shortenContent(content, maxLength);
    paragraphElement.textContent = shortenedContent;
    });
});
  

