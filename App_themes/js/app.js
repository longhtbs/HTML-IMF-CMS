// init function
var isMobile, isTablet, isDesktop;
var widthWindows = $(window).width(),
    heightWindows = $(window).height();
var rtime = new Date();
var delta = 200;
var timeout = false;
var leftNavPos;

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

    // click to toggle tab on right nav - MOBILE
    $('.site-header #btn-rightNav').on('click', btnExpandRightClick);

    // click to toggle tab on right nav
    $('.site-aside .nav-item').on('click', rightNavClick);

    // click to toggle tab on left nav
    $('#siteNavTrigger').on('click', siteNavTriggerClick);

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
    leftNavPos = $('.site-nav-wrap li.is-active').position().top;
    $('.site-nav-wrap')[0].scrollTop += (leftNavPos - 16);
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

// expand left site nav
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
// .end expand left site nav

// expand right site nav
function expandNavRight() {
    $('.site-aside').toggleClass('is-active');
    $('#btn-rightNav .fa-align-right').toggle();
    $('#btn-rightNav .fa-times').toggle();
    $('#site-mask').toggle();
    $('body').css('overflow', 'hidden');
}

function btnExpandRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandNavRight();
}

// .end expand right site nav

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
    $('.site-aside').removeClass('is-active');
    $('#btn-expand .fa-bars').show();
    $('#btn-expand .fa-times').hide();
    $('#btn-rightNav .fa-align-right').show();
    $('#btn-rightNav .fa-times').hide();
    $('#site-mask').hide();
    $('body').removeAttr('style');
}

function dropClick(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('is-active');
    t = $(this).data('target');
    toggleDropdownSearchExpand(t);
    // expandDropdown(t);
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

function toggleDropdownSearchExpand(targetDropdown) {
    $('#' + targetDropdown).toggleClass('is-active');
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

/*trigger left nav in editor page*/
function siteNavTriggerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    triggerSiteNav();
}

function triggerSiteNav() {
    $('.site-nav.triggerable').toggleClass('is-active');
}