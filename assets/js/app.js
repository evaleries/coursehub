$(document).ready(function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              $(document).off('scroll');
              $(window).off('resize');
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  triggerPage()

  function triggerPage(page = null) {
    if (page == 'undefined' || typeof page != 'string' || page == '') {
      page = window.location.hash.replace('#', '')
    }
    if (page.indexOf('?')) {
      page = window.location.hash.split('?')[0]
    }
    switch (page.replace('#', '')) {
      case 'course':
        view('course', '#container', null)
        break;
      case 'about':
        view('about', '#container', null)
        break;
      case 'login':
        view('login', 'html')
        break;
      case 'signup':
        view('signup', 'html')
        break;
      case 'search':
        view('search', '#container', searchController) 
        break;
      case 'home':
      case 'index':
      default:
        page = 'home'
        view('home', '#container', homeController)
        break;
    }
  }

  function view(page, el = '#container', callback = null) {
    $.get(`pages/${page}.html`)
    .done((html) => {
      if (el == 'html' || $(el).length < 1) {
        $('html').html(html).fadeIn(1e3);
      } else {
        $(el).html(html).fadeIn(1e3);
      }
      if (callback != null) {
        callback.call();
      }
      $('html, body').animate({scrollTop : 0}, 600);
    })
  }

  function homeController() {
    $('form.form-home-search').submit(function(e) {
      e.preventDefault();
      window.location.hash = '#search?q=' + $('#search-box').val();
    });
  }
  function searchController() {
    if (window.location.hash.indexOf('?q=')) {
      let query = decodeURIComponent(window.location.hash.split('?q=')[1]);
      $('#search-box').val(query);
      $('#search-query-text').text(query)
    }
    $('form.form-home-search').submit(function(e) {
      e.preventDefault();
      window.location.hash = '#search?q=' + $('#search-box').val();
    });
  }

  /**
   * Modal
   */
  $('#btnContactUs').click(function (e) {
    $('#modalContact').toggle();
  });

  $('span.close, window').click(function(e) {
    $('#modalContact').hide();
  });
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    if ($('#subject').val().length < 10) {
      alert("your message should be more than 10 characters");
    }
  });

  /**
   * Float button
   */
  $('#toHeader').hide().click(function(e) {
    $('html, body').animate({scrollTop : 0}, 600);
  });
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $('#toHeader').show();
    } else {
      $('#toHeader').hide();
    }
 });
  
  $('a[data-name]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    event.preventDefault();
    window.location.hash = $(this).data('name')
  });

  $(document).on('scroll', lazyLoad)
  $(window).on('resize', lazyLoad)
  $(window).on('hashchange', triggerPage)
});