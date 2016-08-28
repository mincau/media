!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.init()}var i=t("body"),n=t(document),a=window.Mustache,o="qor.medialibrary",r="click."+o,s="enable."+o,d="disable."+o,l=".qor-selected-many__remove",c=".qor-select__select-icon",h=".qor-selectmany__hint",m=".qor-field__mediabox",u=".qor-field__mediabox-list",f=".qor-field__mediabox-item",p=".qor-field__mediabox-data",y=".qor-bottomsheets",g="is_selected",b="textarea.qor-file__options";return e.prototype={constructor:e,init:function(){this.bind()},bind:function(){n.on(r,"[data-mediabox-url]",this.openBottomSheets.bind(this)),this.$element.on(r,l,this.clearSelect.bind(this)).on("change.qor.cropper",b,this.imageCrop.bind(this))},clearSelect:function(e){var i=t(e.target),n=i.closest(u);return i.closest("[data-primary-key]").remove(),this.updateMediaLibraryData(n),!1},imageCrop:function(e){var i=t(e.target).closest(f);this.syncImageCrop(i)},openBottomSheets:function(e){var n,a=t(e.target).closest("[data-mediabox-url]"),o=a.data();this.BottomSheets=i.data("qor.bottomsheets"),this.bottomsheetsData=o,this.$parent=n=a.closest(m),this.$selectFeild=n.find(u),this.$mediaLrbraryData=n.find(p),this.SELECT_MANY_SELECTED_ICON=t('[name="select-many-selected-icon"]').html(),this.SELECT_MANY_UNSELECTED_ICON=t('[name="select-many-unselected-icon"]').html(),this.SELECT_MANY_HINT=t('[name="select-many-hint"]').html(),this.SELECT_MEDIABOX_TEMPLATE=t('[name="media-box-template"]').html(),o.url=o.mediaboxUrl,this.BottomSheets.open(o,this.handleSelectMany.bind(this))},initItems:function(){var e,i,n=this.$selectFeild,a=n.find(f),o=t(y).find("tbody tr"),r=this;a.each(function(){i=t(this).data().primaryKey,e=o.filter('[data-primary-key="'+i+'"]').addClass(g),r.changeIcon(e,!0)})},renderSelectMany:function(t){return a.render(this.SELECT_MEDIABOX_TEMPLATE,t)},renderHint:function(t){return a.render(this.SELECT_MANY_HINT,t)},getSelectedItemData:function(e){var i,n=e?e:this.$selectFeild,a=n.find(f),o=[];return a.size()&&a.each(function(){i=t(this).data(),o.push({ID:i.primaryKey,Url:i.originalUrl.replace(/.original.(\w+)$/,".$1")})}),{files:o,selectedNum:o.length}},updateHint:function(e){var i;t.extend(e,this.bottomsheetsData),i=this.renderHint(e),t(h).remove(),t(y).find(".qor-bottomsheets__body").prepend(i)},updateMediaLibraryData:function(){var t=this.$mediaLrbraryData,e=this.getSelectedItemData();t.val(JSON.stringify(e.files))},changeIcon:function(t,e){t.find(c).remove(),e&&t.find(".qor-table--medialibrary-item").prepend(this.SELECT_MANY_SELECTED_ICON)},syncImageCrop:function(e,i){var n=JSON.parse(e.find(b).val()),a=e.data().mediaLibraryUrl,o={};delete n.ID,delete n.Url,o.MediaOption=JSON.stringify(n),t.ajax({type:"PUT",url:a,data:JSON.stringify(o),contentType:"application/json",dataType:"json",success:function(n){o.MediaOption=JSON.parse(n.MediaOption),i&&t.isFunction(i)&&i(o,e)}})},removeItem:function(t){var e=t.primaryKey;this.$selectFeild.find('[data-primary-key="'+e+'"]').remove(),this.changeIcon(t.$clickElement)},addItem:function(e,i){var n=t(this.renderSelectMany(e)),a=n.find(".qor-file__input"),o=a.closest(f),r=this;return n.appendTo(this.$selectFeild),e.MediaOption.CropOptions&&this.resetImages(e,n),n.find(b).val(JSON.stringify(e.MediaOption)),n.trigger("enable"),e.MediaOption.CropOptions||a.data("qor.cropper").load(e.MediaOption.URL,function(){r.syncImageCrop(o,r.resetImages)}),i?void this.BottomSheets.hide():void this.changeIcon(e.$clickElement,!0)},resetImages:function(e,i){for(var n=e.MediaOption.CropOptions,a=Object.keys(n),o=e.MediaOption.OriginalURL,r=a.length-1;r>=0;r--)n[a[r]].URL=o.replace(/original/,a[r]);i.find("img").each(function(){var e=t(this),i=e.data().sizeName;i&&"original"!=i&&e.prop("src",n[i].URL)})},handleSelectMany:function(){var e=t(y),i={formatOnSelect:this.formatSelectResults.bind(this),formatOnSubmit:this.formatSubmitResults.bind(this)};e.qorSelectCore(i),this.initItems()},formatSelectResults:function(t){this.formatResults(t)},formatSubmitResults:function(t){this.formatResults(t,!0)},formatResults:function(e,i){var n=e.url,a=this,o=e;t.getJSON(n,function(e){e.MediaOption=JSON.parse(e.MediaOption),t.extend(o,e),a.handleFormat(o,i)})},handleFormat:function(t,e){var i,n=t.$clickElement;return e?void this.addItem(t,!0):(n.toggleClass(g),i=n.hasClass(g),i?this.addItem(t):this.removeItem(t),this.updateHint(this.getSelectedItemData()),void this.updateMediaLibraryData())}},e.plugin=function(i){return this.each(function(){var n,a=t(this),r=a.data(o);if(!r){if(/destroy/.test(i))return;a.data(o,r=new e(this,i))}"string"==typeof i&&t.isFunction(n=r[i])&&n.apply(r)})},t(function(){var i='[data-toggle="qor.mediabox"]';t(document).on(d,function(n){e.plugin.call(t(i,n.target),"destroy")}).on(s,function(n){e.plugin.call(t(i,n.target))}).triggerHandler(s)}),e});
//# sourceMappingURL=media_box.js.map
