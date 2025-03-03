document.addEventListener("DOMContentLoaded", function () {
    let dropdownItems = document.querySelectorAll(".FN_Lang-Selector-Link");

    dropdownItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            let selectedLang = this.getAttribute("data-lang");
            if (!selectedLang) return;

            localStorage.setItem("selectedLanguage", selectedLang);

            let currentPath = window.location.pathname;
            let newPath = currentPath.replace(/^\/(en|ar)(\/|$)/, "/"); // Remove existing language prefix

            let newUrl = `/${selectedLang}${newPath === "/" ? "" : newPath}`; // Add new language prefix

            window.history.pushState({}, "", newUrl);

            document.querySelector(".FN_Dropdown-Toggle").innerText = this.innerText;

            translatePage(selectedLang);

            document.documentElement.dir = selectedLang === "ar" ? "rtl" : "ltr";
        });
    });

    let savedLang = localStorage.getItem("selectedLanguage") || "en";
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    translatePage(savedLang);

    window.addEventListener('popstate', function(event) {
        let currentPath = window.location.pathname;
        let langMatch = currentPath.match(/^\/(en|ar)/);
        let currentLang = langMatch ? langMatch[1] : "en";

        localStorage.setItem("selectedLanguage", currentLang);
        translatePage(currentLang);
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

        let langLink = document.querySelector(`.FN_Lang-Selector-Link[data-lang="${currentLang}"]`);
        if (langLink) {
            document.querySelector(".FN_Dropdown-Toggle").innerText = langLink.innerText;
        }
    });

    let initialPath = window.location.pathname;
    let initialLangMatch = initialPath.match(/^\/(en|ar)/);
    if (initialLangMatch) {
        let initialLang = initialLangMatch[1];
        localStorage.setItem("selectedLanguage", initialLang);
        translatePage(initialLang);
        document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
        let langLink = document.querySelector(`.FN_Lang-Selector-Link[data-lang="${initialLang}"]`);
        if (langLink) {
            document.querySelector(".FN_Dropdown-Toggle").innerText = langLink.innerText;
        }
    }
});

async function translatePage(targetLang) {
    let elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, a, button, span, li, td, th, label");

    for (let element of elements) {
        let originalText = element.getAttribute("data-original") || element.innerText.trim();
        if (!originalText) continue;

        element.setAttribute("data-original", originalText);

        try {
            let translatedText = await translateText(originalText, targetLang);
            element.innerText = translatedText;
        } catch (error) {
            console.error("Translation error:", error);
        }
    }
}

async function translateText(text, targetLang) {
    let apiUrl = "https://fnlang.fndcsonline.workers.dev/"; // Cloudflare Worker API

    let response = await fetch(`${apiUrl}?text=${encodeURIComponent(text)}&target_lang=${targetLang}`);

    if (!response.ok) {
        throw new Error(`Translation error: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();
    return data.translatedText;
}

document.addEventListener("DOMContentLoaded", function() {
    // Select the first language link
    var firstLang = document.querySelector(".FN_Lang-Selector-Link");

    if (firstLang) {
        // Get the text content of the first language
        var firstLangText = firstLang.textContent.trim();

        // Set the toggle text to the first language
        var toggleText = document.querySelector(".FN_Dropdown-Toggle-Text");
        if (toggleText) {
            toggleText.textContent = firstLangText;
        }
    }
});

