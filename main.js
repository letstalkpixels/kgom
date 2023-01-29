$(".splide__arrow").replaceWith(function () {
    let attrs = { };

    $.each($(this)[0].attributes, function(idx, attr) {
        attrs[attr.nodeName] = attr.nodeValue;
    });
  
    return $("<button />", attrs).append($(this).contents());
});

$(".splide").each((index) => {
  const splideElement = $(".splide")[index];

  const splide = new Splide($(".splide")[index], {
    // Desktop on down
    perPage: 2.5,
    perMove: 1,
    focus: 0, // 0 = left and 'center' = center
    slideFocus: true,
    type: "slide", // 'loop' or 'slide'
    gap: "0.5rem", // space between slides
    speed: 600, // transition speed in miliseconds
    dragAngleThreshold: 30, // default is 30
    autoWidth: false, // for cards with differing widths
    rewind: false, // go back to beginning when reach end
    rewindSpeed: 400,
    waitForTransition: false,
    updateOnMove: true,
    trimSpace: true, // true removes empty space from end of list
    breakpoints: {
      991: {
        // Tablet
        perPage: 1.5,
        gap: "0.5",
      },
      767: {
        // Mobile Landscape
        perPage: 1.2,
        gap: "0.5",
      },
      479: {
        // Mobile Portrait
        perPage: 1.2,
        gap: "0.5",
      },
    },
  });

  splide.mount();

  const splidePagination = splideElement.getElementsByClassName(
    "splide__pagination"
  )[0];
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
    const dateElementsToConvert = document.getElementsByClassName('date-conversion');

    for (let index in [...dateElementsToConvert]) {
      const element = dateElementsToConvert[index];
      const date = new Date(element.textContent);

      if (!(date instanceof Date && isFinite(date))) {
        continue;
      }

      const formattedDate = new Intl.DateTimeFormat('nl-NL', { year: 'numeric', month: 'long' }).format(date);

      element.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  }

  const loadMoreNewsButtons = document.getElementsByClassName('w-pagination-next');

  for (let index in [...loadMoreNewsButtons]) {
    loadMoreNewsButtons[index].addEventListener('click', () => setTimeout(() => convertDates()));
  }

  convertDates();
    
  // Cookie consent delay
  setTimeout(() => {
    let cookieConsentElements = [...document.getElementsByClassName('fs-cc-banner_component')];
    for (let index in cookieConsentElements) {
      let element = cookieConsentElements[index];
      element.classList.add('fs-cc-banner_component--visible');
    }
  }, 4000);
})();
