// HOMEPAGE DROPDOWNS
// - filter dropdown
// - tag dropdown

// FILTER DROPDOWN
const   filterMenu = document.querySelector(".filter-menu"),
        selectFilter = filterMenu.querySelector(".select-filter"),
        filters = filterMenu.querySelectorAll(".filter"),
        filterText = filterMenu.querySelector(".selected-filter");

// shows/hides the options for filters menu
selectFilter.addEventListener("click", () => filterMenu.classList.toggle("active"));

// displays the selected filter
filters.forEach(filter =>{
    filter.addEventListener("click", ()=>{
        let selectedFilter = filter.querySelector(".filter-text").innerHTML;
        filterText.innerText = selectedFilter;
        console.log(selectedFilter);

        // after selecting, immediately close filter options
        filterMenu.classList.remove("active");
    })
});

// TAG DROPDOWN
const   tagMenu = document.querySelector(".tag-menu"),
        selectTag = tagMenu.querySelector(".select-tag"),
        tags = tagMenu.querySelectorAll(".tag"),
        tagText = tagMenu.querySelector(".selected-tag");

// shows/hides the options for tags menu
selectTag.addEventListener("click", () => tagMenu.classList.toggle("active"));

// displays the selected tags
tags.forEach(tag =>{
    tag.addEventListener("click", ()=>{
        let selectedTag = tag.querySelector(".tag-text").innerHTML;
        tagText.innerText = selectedTag;
        console.log(selectedTag);

        // after selecting, immediately close tags options
        tagMenu.classList.remove("active");
    })
})

