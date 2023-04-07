$(".splide__arrow").replaceWith(function () {
    let attrs = {};

    $.each($(this)[0].attributes, function (idx, attr) {
        attrs[attr.nodeName] = attr.nodeValue;
    });

    return $("<button />", attrs).append($(this).contents());
});

$(".splide").each((index) => {
    const splideElement = $(".splide")[index];

    const splide = new Splide($(".splide")[index], {
        perPage: 2.5,
        perMove: 1,
        focus: 0,
        slideFocus: true,
        type: "slide",
        gap: "1rem",
        speed: 600,
        dragAngleThreshold: 30,
        autoWidth: false,
        rewind: false,
        rewindSpeed: 400,
        waitForTransition: false,
        updateOnMove: true,
        trimSpace: true,
        breakpoints: {
            991: { perPage: 2.2 },
            767: { perPage: 1.2 },
            479: { perPage: 1.2 },
        },
    });

    splide.mount();

    const splidePagination =
        splideElement.getElementsByClassName("splide__pagination")[0];
    let lastFocusElement = null;

    splideElement.addEventListener("mouseenter", () => {
        const activeSlidePagination = splidePagination.getElementsByClassName(
            "splide__pagination__page"
        );

        [...activeSlidePagination].forEach((element) => {
            if (element.getAttribute("class").includes("active")) {
                element.focus();

                lastFocusElement = element;
            }
        });
    });

    splideElement.addEventListener("mouseleave", () => {
        if (lastFocusElement) {
            lastFocusElement.blur();
        }
    });
});

$(".faq-item").click(function () {
    if (!$(this).is(".open")) {
        $(".faq-item.open").each((i, item) => {
            item.click();
        });
        $(this).addClass("open");
    } else {
        $(this).removeClass("open");
    }
});

(() => {
    const convertDates = () => {
        const dateElementsToConvert =
            document.getElementsByClassName("date-conversion");

        for (let index in [...dateElementsToConvert]) {
            const element = dateElementsToConvert[index];
            const date = new Date(element.textContent);

            if (!(date instanceof Date && isFinite(date))) {
                continue;
            }

            const formattedDate = new Intl.DateTimeFormat("nl-NL", {
                year: "numeric",
                month: "long",
            }).format(date);

            element.textContent =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
    };

    const loadMoreNewsButtons =
        document.getElementsByClassName("w-pagination-next");

    for (let index in [...loadMoreNewsButtons]) {
        loadMoreNewsButtons[index].addEventListener("click", () =>
            setTimeout(() => convertDates())
        );
    }

    convertDates();

    // Cookie consent delay
    setTimeout(() => {
        let cookieConsentElements = [
            ...document.getElementsByClassName("fs-cc-banner_component"),
        ];
        for (let index in cookieConsentElements) {
            let element = cookieConsentElements[index];
            element.classList.add("fs-cc-banner_component--visible");
        }
    }, 4000);
})();

(async () => {
    const encodePayload = async (payload) => {
        const msgUint8 = new TextEncoder().encode(payload); // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // convert bytes to hex string
        return hashHex;
    };

    const contactForm = document.querySelector("#wf-form-Contactform");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", async (event) => {
        const formData = new FormData(event.target);

        (window.dataLayer ?? []).push({
            contactEmail: await encodePayload(formData.get('Email')),
        });
    });
})();
