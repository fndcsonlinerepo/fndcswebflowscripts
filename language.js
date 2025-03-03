document.addEventListener("DOMContentLoaded", function () {
    const dropdownLinks = document.querySelectorAll(".FN_Lang-Selector-Link");
    const toggleText = document.querySelector(".FN_Dropdown-Toggle-Text");
    const deeplApiKey = "902e8d6e-5dbc-46bf-be4b-b2275515d4ed:fx"; // Replace with your actual DeepL API key
    const sourceLang = "en"; // Default source language
    let selectedLang = localStorage.getItem("selectedLang") || "en";

    // Function to fetch translation from DeepL
    async function translateText(text, targetLang) {
        const url = `https://api-free.deepl.com/v2/translate`;
        const params = new URLSearchParams({
            auth_key: deeplApiKey,
            text: text,
            target_lang: targetLang
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                body: params
            });

            const data = await response.json();
            return data.translations[0].text;
        } catch (error) {
            console.error("Translation error:", error);
            return text;
        }
    }

    // Function to translate all text elements
    async function translatePage(targetLang) {
        const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, a, button");

        for (let element of elements) {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                const translatedText = await translateText(element.textContent.trim(), targetLang);
                element.textContent = translatedText;
            }
        }

        // Handle translation of links without modifying href
        const links = document.querySelectorAll("a");
        for (let link of links) {
            if (link.textContent.trim() !== "" && link.hasAttribute("href")) {
                const originalText = link.textContent.trim();
                const translatedText = await translateText(originalText, targetLang);
                link.textContent = translatedText;
            }
        }
    }

    // Event listener for language selection
    dropdownLinks.forEach(link => {
        link.addEventListener("click", async function (event) {
            event.preventDefault();
            selectedLang = this.getAttribute("data-lang");
            localStorage.setItem("selectedLang", selectedLang);

            toggleText.textContent = this.textContent;

            await translatePage(selectedLang);
        });
    });

    // Apply stored language on reload
    if (selectedLang !== sourceLang) {
        translatePage(selectedLang);
        toggleText.textContent = document.querySelector(`[data-lang="${selectedLang}"]`).textContent;
    }
});
