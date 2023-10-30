window.define = window.backupDefine; window.backupDefine = undefined;

// Full list of configuration options available at: https://revealjs.com/config/
Reveal.initialize({
  'controlsAuto': true,
  'previewLinksAuto': false,
  'smaller': false,
  'pdfSeparateFragments': false,
  'autoAnimateEasing': "ease",
  'autoAnimateDuration': 1,
  'autoAnimateUnmatched': true,
  'menu': {
    "side": "left",
    "useTextContentForMissingTitles": true,
    "markers": false,
    "loadIcons": false,
    "custom": [{
      "title": "Tools",
      "icon": "<i class=\"fas fa-gear\"></i>",
      "content": "<ul class=\"slide-menu-items\">\n<li class=\"slide-tool-item active\" data-item=\"0\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.fullscreen(event)\"><kbd>f</kbd> Fullscreen</a></li>\n<li class=\"slide-tool-item\" data-item=\"1\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.speakerMode(event)\"><kbd>s</kbd> Speaker View</a></li>\n<li class=\"slide-tool-item\" data-item=\"2\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.overview(event)\"><kbd>o</kbd> Slide Overview</a></li>\n<li class=\"slide-tool-item\" data-item=\"3\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.overview(event)\"><kbd>e</kbd> PDF Export Mode</a></li>\n<li class=\"slide-tool-item\" data-item=\"4\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.toggleChalkboard(event)\"><kbd>b</kbd> Toggle Chalkboard</a></li>\n<li class=\"slide-tool-item\" data-item=\"5\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.toggleNotesCanvas(event)\"><kbd>c</kbd> Toggle Notes Canvas</a></li>\n<li class=\"slide-tool-item\" data-item=\"6\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.downloadDrawings(event)\"><kbd>d</kbd> Download Drawings</a></li>\n<li class=\"slide-tool-item\" data-item=\"7\"><a href=\"#\" onclick=\"RevealMenuToolHandlers.keyboardHelp(event)\"><kbd>?</kbd> Keyboard Help</a></li>\n</ul>"
    }],
    "openButton": true
  },
  "chalkboard": {
    "buttons":true,
    "theme":"whiteboard"
  },
  "smaller": false,
  controls: false,
  controlsTutorial: false,
  controlsLayout: "edges",
  controlsBackArrows: "faded",
  progress: true,
  slideNumber: "c/t",
  showSlideNumber: "all",
  hash: true,
  hashOneBasedIndex: false,
  respondToHashChanges: true,
  history: true,
  keyboard: true,
  overview: true,
  disableLayout: false,
  center: false,
  touch: true,
  loop: false,
  rtl: false,
  navigationMode: "linear",
  shuffle: false,
  fragments: true,
  fragmentInURL: false,
  embedded: false,
  help: true,
  pause: true,
  showNotes: false,
  autoPlayMedia: null,
  preloadIframes: null,
  autoSlide: 0,
  autoSlideStoppable: true,
  autoSlideMethod: null,
  defaultTiming: null,
  mouseWheel: false,
  display: "block",
  hideInactiveCursor: true,
  hideCursorTime: 5000,
  previewLinks: false,
  transition: "none",
  transitionSpeed: "default",
  backgroundTransition: "none",
  viewDistance: 3,
  mobileViewDistance: 2,
  width: 1050,
  height: 700,
  margin: 0.1,
  math: {
    mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    tex2jax: {
      inlineMath: [['\\(','\\)']],
      displayMath: [['\\[','\\]']],
      balanceBraces: true,
      processEscapes: false,
      processRefs: true,
      processEnvironments: true,
      preview: 'TeX',
      skipTags: ['script','noscript','style','textarea','pre','code'],
      ignoreClass: 'tex2jax_ignore',
      processClass: 'tex2jax_process'
    },
  },
  plugins: [
    QuartoLineHighlight,
    PdfExport,
    RevealMenu,
    RevealChalkboard,
    QuartoSupport,
    RevealMath,
    RevealNotes,
    RevealSearch,
    RevealZoom
  ]
});

// htmlwidgets need to know to resize themselves when slides are shown/hidden.
// Fire the "slideenter" event (handled by htmlwidgets.js) when the current
// slide changes (different for each slide format).
(function () {
  // dispatch for htmlwidgets
  function fireSlideEnter() {
    const event = window.document.createEvent("Event");
    event.initEvent("slideenter", true, true);
    window.document.dispatchEvent(event);
  }

  function fireSlideChanged(previousSlide, currentSlide) {
    fireSlideEnter();

    // dispatch for shiny
    if (window.jQuery) {
      if (previousSlide) {
        window.jQuery(previousSlide).trigger("hidden");
      }
      if (currentSlide) {
        window.jQuery(currentSlide).trigger("shown");
      }
    }
  }

  // hookup for slidy
  if (window.w3c_slidy) {
    window.w3c_slidy.add_observer(function (slide_num) {
      // slide_num starts at position 1
      fireSlideChanged(null, w3c_slidy.slides[slide_num - 1]);
    });
  }
})();

window.document.addEventListener("DOMContentLoaded", function (event) {
  const toggleBodyColorMode = (bsSheetEl) => {
    const mode = bsSheetEl.getAttribute("data-mode");
    const bodyEl = window.document.querySelector("body");
    if (mode === "dark") {
      bodyEl.classList.add("quarto-dark");
      bodyEl.classList.remove("quarto-light");
    } else {
      bodyEl.classList.add("quarto-light");
      bodyEl.classList.remove("quarto-dark");
    }
  }
  const toggleBodyColorPrimary = () => {
    const bsSheetEl = window.document.querySelector("link#quarto-bootstrap");
    if (bsSheetEl) {
      toggleBodyColorMode(bsSheetEl);
    }
  }
  toggleBodyColorPrimary();  
  const tabsets =  window.document.querySelectorAll(".panel-tabset-tabby")
  tabsets.forEach(function(tabset) {
    const tabby = new Tabby('#' + tabset.id);
  });
  const clipboard = new window.ClipboardJS('.code-copy-button', {
    target: function(trigger) {
      return trigger.previousElementSibling;
    }
  });
  clipboard.on('success', function(e) {
    // button target
    const button = e.trigger;
    // don't keep focus
    button.blur();
    // flash "checked"
    button.classList.add('code-copy-button-checked');
    var currentTitle = button.getAttribute("title");
    button.setAttribute("title", "Copied!");
    let tooltip;
    if (window.bootstrap) {
      button.setAttribute("data-bs-toggle", "tooltip");
      button.setAttribute("data-bs-placement", "left");
      button.setAttribute("data-bs-title", "Copied!");
      tooltip = new bootstrap.Tooltip(button, 
        { trigger: "manual", 
          customClass: "code-copy-button-tooltip",
          offset: [0, -8]});
      tooltip.show();    
    }
    setTimeout(function() {
      if (tooltip) {
        tooltip.hide();
        button.removeAttribute("data-bs-title");
        button.removeAttribute("data-bs-toggle");
        button.removeAttribute("data-bs-placement");
      }
      button.setAttribute("title", currentTitle);
      button.classList.remove('code-copy-button-checked');
    }, 1000);
    // clear code selection
    e.clearSelection();
  });
  function tippyHover(el, contentFn) {
    const config = {
      allowHTML: true,
      content: contentFn,
      maxWidth: 500,
      delay: 100,
      arrow: false,
      appendTo: function(el) {
          return el.closest('section.slide') || el.parentElement;
      },
      interactive: true,
      interactiveBorder: 10,
      theme: 'quarto-reveal',
      placement: 'bottom-start'
    };
      config['offset'] = [0,0];
      config['maxWidth'] = 700;
    window.tippy(el, config); 
  }
  const noterefs = window.document.querySelectorAll('a[role="doc-noteref"]');
  for (var i=0; i<noterefs.length; i++) {
    const ref = noterefs[i];
    tippyHover(ref, function() {
      // use id or data attribute instead here
      let href = ref.getAttribute('data-footnote-href') || ref.getAttribute('href');
      try { href = new URL(href).hash; } catch {}
      const id = href.replace(/^#\/?/, "");
      const note = window.document.getElementById(id);
      return note.innerHTML;
    });
  }
  const findCites = (el) => {
    const parentEl = el.parentElement;
    if (parentEl) {
      const cites = parentEl.dataset.cites;
      if (cites) {
        return {
          el,
          cites: cites.split(' ')
        };
      } else {
        return findCites(el.parentElement)
      }
    } else {
      return undefined;
    }
  };
  var bibliorefs = window.document.querySelectorAll('a[role="doc-biblioref"]');
  for (var i=0; i<bibliorefs.length; i++) {
    const ref = bibliorefs[i];
    const citeInfo = findCites(ref);
    if (citeInfo) {
      tippyHover(citeInfo.el, function() {
        var popup = window.document.createElement('div');
        citeInfo.cites.forEach(function(cite) {
          var citeDiv = window.document.createElement('div');
          citeDiv.classList.add('hanging-indent');
          citeDiv.classList.add('csl-entry');
          var biblioDiv = window.document.getElementById('ref-' + cite);
          if (biblioDiv) {
            citeDiv.innerHTML = biblioDiv.innerHTML;
          }
          popup.appendChild(citeDiv);
        });
        return popup.innerHTML;
      });
    }
  }
});
