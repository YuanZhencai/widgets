function init(Survey, $) {
    $ = $ || window.$;
    var widget = {
        name: "address",
        title: "address",
        iconName: "fa fa-address-card-o",
        htmlTemplate: "" +
        "<div class='form-inline'>" +
        "   <div>" +
        "       <select name='province' class='form-control'></select>" +
        "       <select name='city' class='form-control'></select>" +
        "       <select name='district' class='form-control'></select>" +
        "   </div>" +
        "</div>",
        widgetIsLoaded: function () {
            return typeof $ == "function" && !!$.fn.distpicker;
        },
        isFit: function (question) {
            return question.getType() === "address";
        },
        activatedByChanged: function (activatedBy) {
            if (!this.widgetIsLoaded()) return;
            Survey.JsonObject.metaData.addClass("address", [], null, "empty");
            Survey.JsonObject.metaData.addProperties("address", {
                province: '---- 所在省 ----',
                city: '---- 所在市 ----',
                district: '---- 所在区 ----'
            });
        },
        afterRender: function (question, el) {
            var $distpicker = $(el);
            $distpicker.distpicker(question.value);
            var province = $distpicker.find("select[name='province']");
            var city = $distpicker.find("select[name='city']");
            var district = $distpicker.find("select[name='district']");
            $distpicker.find("select").on("change", function (e) {
                question.value = {
                    province: province.val(),
                    city: city.val(),
                    district: district.val()
                };
            });
        },
        willUnmount: function (question, el) {
            if (question.address) {
                question.address.off();
            }
            question.address = null;
        }
    };

    Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
    init(Survey, window.$);
}

export default init;
