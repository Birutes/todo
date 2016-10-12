$(document).ready(function () {

    $(".nav").hide();

    $("#insert_input").on("keypress", function (e) {

        var $this = $(this);
        var newInputText = $this.val();
        var inputCount = $(".input-group").length + 1;

        if (e.which === 13) {
            e.preventDefault();
            $this.val("");

            if (newInputText === '') {
                alert("Nieko neivedete");

            } else {
                $(".input_field").append(getNewLineItem(newInputText));
                $(".nav").show();
                $(".items").text(inputCount + " item(s) left");
            }
        }
    });

    function getNewLineItem(inputText) {
        return '<div class="input-group">' +
            '<span class="input-group-addon">' +
            '<input class="input-checkbox" type="checkbox" >' +
            '</span>' +
            '<input class="input-check form-control" type="text" value="' + inputText + '">' +
            '<span class="input-remove input-group-addon">' +
            '<a href="#">X</a>' +
            '</span>' +
            '</div>';
    }

    $(document).on("click", ".input-remove", function () {

        var checkedCount = $(".input-checkbox:checked").length;
        var notcheckedCount = $(".input-checkbox:not(':checked')").length - 1;
        var checkedCount2 = $(".input-checkbox:not(':checked')").length;
        var all = notcheckedCount + checkedCount;

        $(this).parent().remove();

        if (notcheckedCount < 0) {
            $(".items").text(checkedCount2 + " item(s) left");

        } else if (all < 1) {
            $(".nav").hide();

        } else {
            $(".items").text(notcheckedCount + " item(s) left");
        }
    });

    $(document).on("click", ".checked-delete", function () {
        
        var $this = $(this);
        var checkedCount = $(".input-checkbox:checked").length;
        var notcheckedCount = $(".input-checkbox:not(':checked')").length;
        var all = notcheckedCount && checkedCount;

        $(".input-checkbox:checked").parent().parent().remove();

        if (checkedCount > 0) {
            $this.hide();
            
            if (all < 1) {
                $(".nav").hide();
            }
        }
    });

    $(document).on("click", ".input-checkbox", function () {

        var $this = $(this);
        var checkedCount = $(".input-checkbox:checked").length;
        var notcheckedCount = $(".input-checkbox:not(':checked')").length;
        var footer = $(".input-group").length - checkedCount;

        if ($this.is(":checked")) {
            $this.parent().parent().find('.input-check').addClass("selected");
            $(".items").text(notcheckedCount + " item(s) left");
            $(".checked-delete").show();

        } else {
            $this.parent().parent().find('.input-check').removeClass("selected");
            $(".items").text(footer + " item(s) left");

            if (checkedCount < 1) {
                $(".checked-delete").hide();
            }
        }
    });

    $(document).on("click", ".checked-hide", function () {
        $(".input-checkbox:checked").parent().parent().hide();
        $(".input-checkbox:not(:checked)").parent().parent().show();
    });

    $(document).on("click", ".checked-show", function () {
        $(".input-checkbox:not(:checked)").parent().parent().hide();
        $(".input-checkbox:checked").parent().parent().show();
    });

    $(document).on("click", ".all", function () {
        $(".input-checkbox:checked").parent().parent().show();
        $(".input-checkbox:not(:checked)").parent().parent().show();
    });   
});