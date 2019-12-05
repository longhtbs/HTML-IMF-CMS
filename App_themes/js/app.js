// init function
var isMobile, isTablet, isDesktop;
var widthWindows = $(window).width(),
    heightWindows = $(window).height();
var rtime = new Date();
var delta = 200;
var timeout = false;

$(function() {
    /*check device width*/
    if (widthWindows < 768) {
        isMobile = true;
        if (widthWindows < 600) ChangeWidthForms();
    } else if (widthWindows < 1024) {
        isTablet = true;
    } else {
        isDesktop = true;
    }

    /*pin header */
    window.onscroll = function() { windowScroll() };

    // click to expand search on site header mobile
    $('.site-header #btn-search').on('click', btnSearchClick);

    // click to toggle left nav
    $('.site-header #btn-expand').on('click', btnExpandClick);
    $('#site-mask').on('click', siteMaskClick);
    $('.site-header #btn-expand .fa-times').on('click', siteMaskClick);

    // click to toggle search dropdown
    $('.site-header .input-wrap .fa-caret-down').on('click', dropClick);

    // click to toggle tab on right nav
    $('.site-aside .nav-item').on('click', rightNavClick);

    // click to change tab on upload wrap
    $('.upload-wrap .nav-item').on('click', uploadTabClick);

    $(window).resize(function() {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(ResizeWindows, delta);
        }
        //ResizeWindows();
    });

});


function ChangeWidthForms() {
    if (widthWindows < 550) {
        $(".formDetail").width(widthWindows - 80);
    } else {
        $(".formDetail").width(500);
    }
}

/**
 * Event when change windows size
 * */
function ResizeWindows() {
    if (new Date() - rtime < delta) {
        setTimeout(ResizeWindows, delta);
    } else {
        timeout = false;
        widthWindows = $(window).width();
        heightWindows = $(window).height();
        ChangeWidthForms();
    }
}

/*customise function*/
// scoll down & pin site header
var mainNavHeight = $('#mainNav').outerHeight();
var mainNavoffsetTop = $('#mainNav').offset().top;
var mainNavoffsetLeft = $('#mainNav').offset().left;
var bsContainer = $('.container').width();

function windowScroll() {
    if (document.body.scrollTop > (mainNavHeight + mainNavoffsetTop) || document.documentElement.scrollTop > (mainNavHeight + mainNavoffsetTop)) {
        $('#mainNav').addClass('is-pinned').css({ 'top': mainNavoffsetTop + 'px', 'left': mainNavoffsetLeft + 'px', 'width': bsContainer + 'px' });
    } else {
        mainNavHeight = $('#mainNav').outerHeight();
        mainNavoffsetTop = $('#mainNav').offset().top;
        mainNavoffsetLeft = $('#mainNav').offset().left;
        bsContainer = $('.container').width();
        $("#mainNav").removeClass('is-pinned');
    }
}

function btnExpandClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandNav();
}

function expandNav() {
    $('.site-nav').toggleClass('is-active');
    $('#btn-expand .fa-bars').toggle();
    $('#btn-expand .fa-times').toggle();
    $('#site-mask').toggle();
    $('body').css('overflow', 'hidden');
}

function btnSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandSearch();
}

function expandSearch() {
    $('.search-wrap').toggleClass('is-active');
    $('#btn-search .fa-search').toggle();
    $('#btn-search .fa-times').toggle();
}

function siteMaskClick(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.site-nav').removeClass('is-active');
    $('#btn-expand .fa-bars').show();
    $('#btn-expand .fa-times').hide();
    $('#site-mask').hide();
    $('body').removeAttr('style');
}

function dropClick(e) {
    e.preventDefault();
    e.stopPropagation();
    t = $(this).data('target');
    expandDropdown(t);
}

function expandDropdown(targetDropdown) {
    $('#' + targetDropdown).addClass('is-active');
    if ($('#' + t).hasClass('is-active')) {
        $(document).mouseup(function(e) {
            var container = $("#" + t);

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('is-active');
            }
        });
        $('#' + t + ' #btnApply').on('click', function() {
            $('#' + targetDropdown).removeClass('is-active');
        })
    }
}

// toggle right nav bar
function showRightTab(targetToggle) {
    $('.column-content .nav-content').removeClass('is-active');
    $('#' + targetToggle).addClass('is-active');
    $('.site-content').addClass('is-expand');
}

function removeRightTab(targetToggle) {
    $('.column-content .nav-content').removeClass('is-active');
    $('.site-content').removeClass('is-expand');
}

function rightNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    t = $(this).data('target');
    if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
        removeRightTab(t);
    } else {
        $(this).siblings().removeClass('is-active');
        $(this).toggleClass('is-active');
        showRightTab(t);
    }
}

// tab for upload image
function showTab(targetToggle) {
    $('.upload-content .tab-content').removeClass('is-active');
    $('#' + targetToggle).addClass('is-active');
}

function uploadTabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    t = $(this).data('target');
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
    showTab(t);
}