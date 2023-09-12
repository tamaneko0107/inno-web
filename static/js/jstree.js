$(function () {
    $('#jstree-root').jstree({ 'core' : {
        'data' : [
           { "id" : "ajson1", "parent" : "#", "text" : "Simple root node", "type": "folder" },
           { "id" : "ajson2", "parent" : "#", "text" : "Root node 2", "type": "folder" },
           { "id" : "ajson3", "parent" : "ajson2", "text" : "test", "type": "file" },
           { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2", "type": "file" }
        ],
        'check_callback': function (operation, node, node_parent, node_position, more) {
            if (operation === 'create_node') {
                var depth = 1;
                var current_node = node_parent;
                while (current_node.parent) {
                    depth += 1;
                    current_node = this.get_node(current_node.parent);
                }
                if ((depth > 3) || (node.type == "folder" && depth > 2)) {
                    alert("You can't create more than 3 levels");
                    return false;
                }
            }
            return true;
        },
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
        node = data.instance.get_node(data.selected[0])
        if (node.type == "file") {
            // $('#dataForm')[0].reset();
            file_name = [node.text];
            while (node.parent != "#") {
                node = data.instance.get_node(node.parent);
                file_name.push(node.text);
            }

            // 修改課程名稱
            file_name = [...file_name.slice(0, -1).reverse(), file_name[file_name.length - 1]];
            console.log(file_name);
            ['subject_name', 'file_name', 'chapter_name'].forEach((element) => {
                get(`input[name=${element}`)[0].value = file_name.length?file_name.pop():"";
            });
            let course_title = get('.course > p')[0];
            if (get('input[name="chapter_name"]')[0].value){
                var title = get('input[name="subject_name"]')[0].value + ' - ' + get('input[name="chapter_name"]')[0].value;
            }
            else {
                var title = get('input[name="subject_name"]')[0].value;
            }
            course_title.innerHTML = title
            course_title.style.width = title.length * 22.3 + "px";
            course_title.style.animation = `typing 1s steps(${title.length})`;

            data_input_frame();
        }
    });

    // unique plugin
    $('#jstree-root').on('rename_node.jstree', function (e, data) {
        var ref = $('#jstree-root').jstree(true);
        var newName = data.text;
        var siblings = ref.get_node(data.node.parent).children;
        var create = true;
        for (var i = 0; i < siblings.length; i++) {
            var siblingName = ref.get_text(siblings[i]);
            if (siblingName == newName && siblings[i] != data.node.id) {
                alert('duplicate node added: ' + newName);
                // 刪除節點
                ref.delete_node(data.node);
                create = false;
                break;
            }
        }

        // 創建節點，並且發送請求
        if (create) {
            if (data.node.type == "folder") {
                parent = ref.get_node(data.node.parent);
                fetchAPI('http://c8763yee.mooo.com:7414/api/create/chapter', 'POST', JSON.stringify({
                            "subject_name": parent.text,
                            "chapter_name": data.node.text,
                            "author"      : 'admin' }), undefined, 'application/json')
            }
        }
    });
    
});

function create(type){
    var ref = $('#jstree-root').jstree(true);
    var currNode = _getCurrNode();
    var parent = ref.get_node(currNode);
    if (parent.type != "file") {
        currNode = ref.create_node(currNode, {"type":type});
        if(currNode) {
            ref.edit(currNode);
            $('.jstree-rename-input').attr('max-height', 6);
        }
    }
    else {
        alert("無法在檔案下建立資料夾");
    }
}
    
// function rename(){
//     var ref = $('#jstree-root').jstree(true);
//     var currNode = _getCurrNode();
//     ref.edit(currNode);
// }

function del(){
    var ref = $('#jstree-root').jstree(true);
    var currNode = _getCurrNode();
    console.log(currNode);
    if (window.confirm("You sure you want to delete it?")){
        ref.delete_node(currNode);
    }
}

function moveup(){
    var ref = $('#jstree-root').jstree(true);
    var currNode = _getCurrNode();
    var prevNode = ref.get_prev_dom(currNode,true);
    ref.move_node(currNode,prevNode,'before');
}

function movedown(){
    var ref = $('#jstree-root').jstree(true);
    var currNode = _getCurrNode();
    var nextNode = ref.get_next_dom(currNode,true);//返回兄弟節點的下一個節點
    ref.move_node(currNode,nextNode,'after');
}

/**
*	獲取當前所選中的結點
*/
function _getCurrNode(){
    var ref = $('#jstree-root').jstree(true),
    sel = ref.get_selected();
    console.log(sel);
    if(!sel.length) { 
        console.log("----");
        return false; 
    }
    sel = sel[0];
    return sel;
}