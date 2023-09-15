$(function () {
    $('#jstree-root').jstree({ 'core' : {
        'data' : [
           { "id" : "ajson1", "parent" : "#", "text" : "Simple root node", "type": "folder" },
           { "id" : "ajson2", "parent" : "#", "text" : "Root node 2", "type": "folder" },
           { "id" : "ajson3", "parent" : "ajson2", "text" : "test", "type": "file" },
           { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2", "type": "file" },
           { "id" : "ajson5", "parent" : "ajson2", "text" : "Child 3", "type": "folder" },
           { "id" : "ajson6", "parent" : "ajson5", "text" : "Child 10", "type": "file" }
        ],
        'themes' : {
            'dots' : false,
        }
    },
    "plugins" : [ "search", "state", "types" ],
    "types": {
        "dafault": {
            "icon": "fa-regular fa-folder-open"
        },
        "root": {
            "icon": "fa-regular fa-folder-open"
        },
        "folder": {
            "icon": "fa-regular fa-folder-open"
        },
        "file": {
            "icon": "fa-regular fa-file"
        }
    }
    });

    // 切換至檔案管理頁面
    $('#jstree-root').on('changed.jstree', function (e, data) {
        console.log(data);
        node = data.instance.get_node(data.selected[0])
        if (node.type == "file") {
            // $('#dataForm')[0].reset();
            let file_name = [node.text];
            while (node.parent != "#") {
                node = data.instance.get_node(node.parent);
                file_name.push(node.text);
            }
            console.log(file_name);
            
            // 修改課程名稱
            // file_name = [...file_name.slice(0, -1).reverse(), file_name[file_name.length - 1]];
            // ['subject_name', 'file_name', 'chapter_name'].forEach((element) => {
            //     get(`input[name=${element}`)[0].value = file_name.length?file_name.pop():"";
            // });
            
            // 標題動畫
            let course_title = get('.course > p')[0];
            course_title.style.animation = '';
            if (file_name.length > 2){
                var title = file_name[2] + ' - ' + file_name[1];
            }
            else {
                var title = file_name[1];
            }
            course_title.style.width = title.length * 22.3 + "px";
            setTimeout(() => {
                course_title.style.animation = `typing 1s steps(${title.length})`;
                course_title.innerHTML = title
            }, 100);
        }
    });

    // unique plugin
    // $('#jstree-root').on('rename_node.jstree', function (e, data) {
    //     var ref = $('#jstree-root').jstree(true);
    //     var newName = data.text;
    //     var siblings = ref.get_node(data.node.parent).children;
    //     var create = true;
    //     for (var i = 0; i < siblings.length; i++) {
    //         var siblingName = ref.get_text(siblings[i]);
    //         var siblingType = ref.get_node(siblings[i]).type;
    //         if (siblingName == newName && siblings[i] != data.node.id && data.node.type == siblingType) {
    //             alert('duplicate node added: ' + newName);
    //             // 刪除節點
    //             ref.delete_node(data.node);
    //             create = false;
    //             break;
    //         }
    //     }

    //     // 創建節點，並且發送請求
    //     if (create) {
    //         if (data.node.type == "folder") {
    //             parent = ref.get_node(data.node.parent);
    //             fetchAPI('http://c8763yee.mooo.com:7414/api/create/chapter', 'POST', JSON.stringify({
    //                         "subject_name": parent.text,
    //                         "chapter_name": data.node.text,
    //                         "author"      : 'admin' }), undefined, 'application/json')
    //         }
    //     }
    // });
    
});