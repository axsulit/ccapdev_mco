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
})

