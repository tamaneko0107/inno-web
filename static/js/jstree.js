$(function () { 
    $('#jstree-root').jstree({ 'core' : {
        'data' : [
        //    { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
        //    { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
        //    { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1asdasdadsadadasdasdasdasdadasdasdasdsadsadafasfasfafagadsadadadasdas" },
        //    { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
        ],
        'check_callback': function (operation, node, node_parent, node_position, more) {
            if (operation === 'create_node') {
                var depth = 1;
                var current_node = node_parent;
                while (current_node.parent) {
                    depth += 1;
                    current_node = this.get_node(current_node.parent);
                }
                if (depth > 3) {
                    alert("You can't create more than 3 levels");
                    return false;
                }
            }
            return true;
        }
    },
    "plugins" : [ "search", "state", "types", "unique"],
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
    },
    });
    $('#jstree-root').on('changed.jstree', function (e, data) {
        node = data.instance.get_node(data.selected[0])
        if (node.type == "file") {
            file_name = [node.text];
            while (node.parent != "#") {
                node = data.instance.get_node(node.parent);
                file_name.push(node.text);
            }
            console.log(file_name);
            file_name = [...file_name.slice(0, -1).reverse(), file_name[file_name.length - 1]];
            ['subject_name', 'file_name', 'chapter_name'].forEach((element) => {
                if (file_name) get(`input[name=${element}`)[0].value = file_name.pop();
            });
            
            data_input_frame();
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
}
    
function rename(){
    var ref = $('#jstree-root').jstree(true);
    var currNode = _getCurrNode();
    ref.edit(currNode);
}

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