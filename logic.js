(function() {
  var $main = $('#pt-main');
  var $pages = $main.children('div.pt-page');
  var animcursor = 1;
  var current = 0;
  var isAnimating = false;
  var animEndEventNames = {
    WebkitAnimation: 'webkitAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd',
    animation: 'animationend'
  };
  var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
  var support = Modernizr.cssanimations;
  var animations = {
    max: 67
  };

  function init() {
    $pages.each(function() {
      var $page = $(this);
      $page.data('originalClassList', $page.attr('class'));
    });

    // Init home page.
    $pages.eq(0).addClass('pt-page-current');

    $('.animate-about').on('click', function() {
      animate(0, 1, 'pt-page-moveToTop', 'pt-page-moveFromBottom');
    });

    $('.animate-portfolio').on('click', function() {
      animate(0, 2, 'pt-page-moveToTop', 'pt-page-moveFromBottom');
    });

    $('.animate-home-from-about').on('click', function() {
      animate(1, 0, 'pt-page-moveToBottom', 'pt-page-moveFromTop');
    });
    
    $('.animate-home-from-portfolio').on('click', function() {
      animate(2, 0, 'pt-page-moveToBottom', 'pt-page-moveFromTop');
    });
  }

  function animate(current, next, outClass, inClass) {
    if (isAnimating) {
      return false;
    }
    isAnimating = true;
    var $currPage = $pages.eq(current);
    var $nextPage = $pages.eq(next).addClass('pt-page-current');

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      $currPage.removeClass('pt-page-current');
      $currPage.attr('class', $currPage.data('originalClassList'));
    });
    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      $nextPage.attr('class', $nextPage.data('originalClassList') + ' pt-page-current');
    });

    if (!support) {
      onEndAnimation($currPage, $nextPage);
    }
    isAnimating = false;
  }

  function animcursorCheck() {
    if (isAnimating) {
      return false;
    }
    if (animcursor > animations.max) {
      animcursor = 1;
    }
    else if (animcursor < 1) {
      animcursor = animations.max
    }
    return animcursor;
  };

  function onEndAnimation($outpage, $inpage) {
    resetPage($outpage, $inpage);
    isAnimating = false;
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
  }

  init();

  return {
    init : init,
  };
})();
