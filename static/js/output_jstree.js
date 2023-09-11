$(function () { 
    if (get('.mask')[0]) {
        get('.mask')[0].addEventListener('click', function () {
            get('.toggler:checked')[0].click();
        });
    }

    $('#jstree-root').off('changed.jstree');
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
        }
    });
});