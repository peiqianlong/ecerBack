
export const tinymcedata = {
    selector: "textarea",
    plugins: "paste importcss autoresize wordcount link image print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image code link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help",
    language_url: `../static/tinymce/langs/zh_CN.js`,
    importcss_append: true,
    autoresize_bottom_margin: 50,
    language: "zh_CN",
    contextmenu: false,
    content_css: "../common/tiny.css",
    toolbar: "formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link undo redo  code media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat Img",
    setup: (editor) => {
        var toDateHtml = function (date) {
            return '';
        };
        editor.ui.registry.addButton('Img', {
            text: 'Img',
            tooltip: 'Insert Current Date',
            onAction: function (_) {
                // editor.insertContent(toDateHtml(new Date()));
            }
        });
      
    },
    image_advtab: true,
    automatic_uploads: true,
    images_reuse_filename: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    elementpath: false,  //禁用编辑器底部的状态栏
    statusbar: false, // 隐藏编辑器底部的状态栏
    browser_spellcheck: true, // 拼写检查
    branding: false, // 去水印
    paste_word_valid_elements: '*[*]',        // word需要它
    paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
    paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
    images_upload_url: "/api/globalmedia/upload",
    images_upload_handler: function (blobInfo, success, failure) {
        // debugger;
        var xhr, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", "/api/globalmedia/upload");

        xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
                failure("HTTP Error: " + xhr.status);
                return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != "string") {
                success(json.data.media_url_http);
                return;
            }
        };

        formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
    },
}