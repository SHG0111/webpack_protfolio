
$(document).ready(function () {
    if (window.isScroll) {
      $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 10) {
          $('body').addClass('notTop');
        } else {
          $('body').removeClass('notTop'); 
        }
      });
    }

    // function updatecontent(){
    // }
    $('.sidetrigger').click(function () {
      if ($(this).attr('data-sidebar-action') === '') {
        // treated as menu trigger 
        $(this).removeAttr('data-sidebar-action');
        $(this).find('svg').addClass('active');
        $(this).attr('data-sidebar-action', 'close')
      } else {
        // treated as menu close 
        $(this).attr('data-sidebar-action', '')
        $('.sidebar').removeClass('visible');
        $('html').removeClass('sidebarShown ');
        $(this).find('svg').removeClass('active');
      }
    });
  
    $('body').click(function (e) {
      if ($(e.target).is(".sidetrigger")) {
        return;
      } else {
        $('.sidetrigger').find('svg').removeClass('active');
      }
    });
    var makeArabicBtn = function () {
      $('.lang-btn a').addClass('hidden');
      $('.lang-btn .ar').removeClass('hidden');
    }
    var makeEnglishBtn = function () {
      $('.lang-btn a').addClass('hidden');
      $('.lang-btn .en').removeClass('hidden');
    }
  
    // directions of document
    if ($('html').attr('dir') === 'rtl') {
      makeEnglishBtn();
      $('.slides').addClass('rtl-body');
      $('html').attr('lang','ar'); 
      $('body .toLeft').addClass('toRight').removeClass('toLeft');
    } else if ($('html').attr('dir') === 'ltr') {
      makeArabicBtn();
      $('.slides').removeClass('rtl-body');
      $('html').attr('lang','en'); 
    };
  
    $('.lang-btn').click(function (e) {
      e.preventDefault();
      if ($('html').attr('dir') === 'ltr') {
        makeEnglishBtn();
        $('.toLeft').addClass('toRight');
        $('.slides').addClass('rtl-body');
        $('html').attr('dir', 'rtl');
        $('html').attr('lang','ar');
      } else if ($('html').attr('dir') === 'rtl') {
        makeArabicBtn();
        $('html').attr('dir', 'ltr');
        $('html').attr('lang','en');
        $('.toRight').removeClass('toRight').addClass('toLeft');
        $('.slides').removeClass('rtl-body');
      }
    });
    // ////////////////////////////
  });
  $(window).resize(function () {
    $('html').removeClass('sidebarShown ');
  });