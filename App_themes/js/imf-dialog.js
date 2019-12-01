///import config from "./videojs/config";

var currentDialogZIndex = 999;
class HDialog {

    /** Hàm khởi tạo đối tượng dialog
     * @function
    * @name HDialog
     * @param {any} ContentID
     * @param {any} Tiêu đề của dialog
     * @param {Danh sách các nút được close, ví dụ: #abc,.example} ButtonsClose
     */

    constructor(ContentID, Title, ButtonsClose, WidthContainer, HeightContainer, callbackFunction, LeftPosition, TopPosition) {

        this.WidthContainer = WidthContainer;
        this.HeightContainer = HeightContainer;
        this.ContentID = ContentID;
        this.Title = Title;
        this.callbackFunction = callbackFunction;
        this.ButtonsClose = ButtonsClose;
        this.LeftPosition = LeftPosition;
        this.TopPosition = TopPosition;
        var modal = document.getElementById(ContentID);
        $(modal).css("float", "left");

        //add title to modal
        $("<div class='modal-title'>" + this.Title + " </div>").prependTo(modal);
        //add div wrap modal
        $(modal).addClass('modal-content').removeClass('hidden').wrap("<div class='modal'></div>");

        //add close button
        if (this.callbackFunction !== undefined && this.callbackFunction !== "") {
            $('<span class="close" onclick="' + this.callbackFunction + '"><i class="fas fa-times"></i></span>').appendTo(modal);
        } else {
            $('<span class="close"><i class="fal fa-times"></i></span>').appendTo(modal);
        }


        //add event drag
        $(modal).draggable();
    }
    /**Phương thức hiển thị dialog
     * @function
    * @name Show
     */
    Show() {
        currentDialogZIndex += 1;
        var modal = document.getElementById(this.ContentID);
        //$(modal).parent().css("display", "block");
        $(modal).parent().css({ "visibility": "visible", "z-index": currentDialogZIndex, 'display': 'initial' });

        var left = 0;
        var top = 0;
        if (this.LeftPosition > 0 && this.TopPosition > 0) {
            left = this.LeftPosition; top = this.TopPosition;
        } else if (this.WidthContainer > 0 && this.HeightContainer > 0) {
            left = (this.WidthContainer - $(modal).width()) / 2;
            top = (this.HeightContainer - $(modal).height()) / 2;
        } else {
            left = (($(window).width() - $(modal).width()-20) / 2)-10;
            top = ($(window).height() - $(modal).height()) / 2;
            if (top < 70) top = 70;
        }

        $(modal).css("left", left).css("top", top);
        ////sự kiện khi người dùng click ngoài vùng nội dung thì close dialog
        //window.onclick = function (event) {            
        //    if (event.target.outerHTML === $(modal).parent().outerHTML()) {
        //        $(modal).find(".group-input label").css("opacity", 0);
        //        $(modal).parent().css("visibility", "hidden");
        //    }
        //}

        ////esc pressed
        //$(document).keyup(function (e) {
        //    if (e.keyCode === 27) {
        //        $(modal).parent().css("visibility", "hidden");
        //        $(modal).find(".group-input label").css("opacity", 0);
        //    }
        //});

        ///sự kiện khi người dùng click vào nút close
        $(".modal span.close").on('click', function () {
            $(this).parent().find(".group-input label").css("opacity", 0);
            $(this).parent().parent().css({ "visibility": "hidden", 'display': 'none' });
        });

        //thêm sự kiện close dialog cho các button được truyền vào
        if (this.ButtonsClose !== undefined && this.ButtonsClose !== '') {
            var arrayClose = this.ButtonsClose.split(',');
            for (var i = 0; i < arrayClose.length; i++) {
                $(arrayClose[i]).on('click', function () {
                    $(modal).find(".group-input label").css("opacity", 0);
                    $(modal).parent().css({ "visibility": "hidden", 'display': 'none' });
                });
            }
        }
    }
    /**Phương thức đóng đối tượng dialog
     *@function
    *@name Close
     */
    Close() {
        var modal = document.getElementById(this.ContentID);
        $(modal).find(".group-input label").css("opacity", 0);
        //$(modal).parent().css("display", "none");
        $(modal).parent().css({ "visibility": "hidden", 'display': 'none' });
        //$(modal).hide();
    }
}

jQuery.fn.outerHTML = function (s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};