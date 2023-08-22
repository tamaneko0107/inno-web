// document.addEventListener('DOMContentLoaded', function () {
//     $('#dates li').eq(0).find('a').trigger('click');
// });

function toggleElements(sel_id) {
    var sel = get(sel_id)[0]
    var sel_val = sel.options[sel.selectedIndex].value
    var option = get(sel_id + '~.content_box')
    for (var i = 0; i < option.length; i++) {
        (i+1 == sel_val) ?
        option[i].style.display = 'block'
        :
        option[i].style.display = 'none';
    }
}

function createStep(step_num) {
    let step = get('#dates')[0];
    let step_data = get('#issues')[0];

    // 尋找有沒有 step 元素
    let old_step = step.get('li a[href="#step-6"]')[0];
    if (!old_step) {
        // 沒有的話，新增一個新的元素
        new_step = new_node('li', {
            innerHTML: `<a href="#step-${step_num}">Step.${step_num}</a>`
        });
        step.appendChild(new_step);
    }

    let old_step_data = step_data.get(`#step-${step}`)[0];
    
    $().timelinr({
        arrowKeys: 'true' 
    });
    const newStepLink = $('#dates li').last().find('a');

    // 触发点击新增或取代的步骤链接
    newStepLink.trigger('click');
}


  