// init function
var isMobile, isTablet, isDesktop;

$(function() {
    /*check device width*/
    vWidth = window.innerWidth;
    if (vWidth < 768) {
        console.log("mobile");
        isMobile = true;
    } else if (vWidth < 1024) {
        console.log("tablet");
        isTablet = true;
    } else {
        console.log("desktop");
        isDesktop = true;
    }

    /*pin header */
    window.onscroll = function() { windowScroll() };

    // click to toggle left nav
    $('.site-header .btn-expand ').on('click', btnExpandClick);
    $('#site-mask').on('click', siteMaskClick);

    // click to toggle search dropdown
    $('.site-header .input-wrap .fa-caret-down').on('click', dropClick);

    // click to toggle tab on right nav
    $('.site-aside .nav-item').on('click', rightNavClick);

});

/*customise function*/
// scoll down & pin site header
function windowScroll() {}

function btnExpandClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandNav();
}

function expandNav() {
    $('.site-nav').toggleClass('is-active');
    $('.btn-expand .fa-bars').toggle();
    $('.btn-expand .fa-times').toggle();
    $('#site-mask').toggle();
}

function siteMaskClick(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.site-nav').removeClass('is-active');
    $('.btn-expand .fa-bars').show();
    $('.btn-expand .fa-times').hide();
    $('#site-mask').hide();
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