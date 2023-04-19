$(function() {
  $("#open_editor").on("click",
    function(e) {
      let fileName = $(".fileradio:checked").val();
      if (typeof fileName !== "undefined") {  // 何かしらのファイルが選択されているとき
        console.log("fileName: ", fileName);
        let url = `./editor.php?path=${$("#path").val()}&filename=${fileName}`;
        let editorTab = window.open(url);
      }
    }
  );

  $("#delete_file").on("click",
    function(e) {
      let path = $("#path").val();
      let fileName = $(".fileradio:checked").val();
      if (typeof fileName !== "undefined") {  // 何かしらのファイルが選択されているとき
        console.log("fileName: ", fileName);
        $.ajax({
          type: "POST",
          url: "server_ctrl.php",
          data: {
            cmd: "delete",
            filepath: `./${path}/${fileName}`
          },
          dataType: "text",
        }).done(function(data) {
          // 通信成功
          if (data == "COMP") {
            alert("正常にファイルを削除しました。");
          } else {
            alert(data);
          }
        }).fail(function(data) {
          // 通信失敗
          alert("送信失敗");
        });

      }
    }
  );

  $("#rename_file").on("click",
    function(e) {
      let newFileName = window.prompt("新しいファイル名を入力してください。");
      let path = $("#path").val();
      let fileName = $(".fileradio:checked").val();
      if (typeof fileName !== "undefined") {    // 何かしらのファイルが選択されているとき
        console.log("fileName: ", fileName);
        $.ajax({
          type: "POST",
          url: "server_ctrl.php",
          data: {
            cmd: "rename",
            filepath: `./${path}/${fileName}`,
            newfilepath: `./${path}/${newFileName}`
          },
          dataType: "text",
        }).done(function(data) {
          // 通信成功
          if (data == "COMP") {
            alert("ファイルの名前を変更しました。");
          } else {
            alert(data);
          }
        }).fail(function(data) {
          // 通信失敗
          alert("送信失敗");
        });

      }
    }
  );

  (() => {
    getFileList();
  })();

});


function getFileList() {
  let path = $("#path").val();
  path = path ? path + "/*" : "*";
  $.ajax({
    type: "POST",
    url: "server_ctrl.php",
    data: {
      cmd: "get_filelist",
      path: path
    },
    dataType: "json"
  }).done(function(data) {
    if (data != "FAIL") {
      $("main").empty();
      let fileList = data;
      console.log(data)
      fileList.forEach(function(el, i) {
        let fileName = el.split("/").pop();
        $("main").append(`
        <input type="radio" name="file" id="file${i}" class="fileradio" value="${fileName}">
        <label for="file${i}" class="file">
          ${fileName}
        </label>`);
      });
    } else {
      alert(data);
    }
  }).fail(function(data) {
    alert("送信失敗");
  });
}
