document.addEventListener("DOMContentLoaded", function () {
    // Select the first language link
    var firstLang = document.querySelector(".FN_Lang-Selector-Link");

    if (firstLang) {
        // Get the text content of the first language
        var firstLangText = firstLang.textContent.trim();

        // Set the text inside the dropdown toggle
        var toggleText = document.querySelector(".FN_Dropdown-Toggle-Text"); 
        if (toggleText) {
            toggleText.textContent = firstLangText;
        }
    }
});



