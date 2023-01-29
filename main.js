$(".splide").each((index) => {
  const splideElement = $(".splide")[index];

  const splide = new Splide($(".splide")[index], {
    // Desktop on down
    perPage: 2.5,
    perMove: 1,
    focus: 0, // 0 = left and 'center' = center
    slideFocus: true,
    type: "slide", // 'loop' or 'slide'
    gap: "1rem", // space between slides
    arrows: false, // 'slider' or false
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
        gap: "1rem",
      },
      767: {
        // Mobile Landscape
        perPage: 1.2,
        gap: "1rem",
      },
      479: {
        // Mobile Portrait
        perPage: 1.2,
        gap: "1rem",
      },
    },
  });
  const bar = splide.root.querySelector(".my-carousel-progress-bar");

  splide.on("mounted move", function () {
    var end = splide.Components.Controller.getEnd() + 1;
    bar.style.width = String((100 * (splide.index + 1)) / end) + "%";
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
})();
