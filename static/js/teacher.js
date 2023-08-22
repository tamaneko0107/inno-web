document.addEventListener('DOMContentLoaded', function () {
    // $('#dates li').eq(0).find('a').trigger('click');
    get('.mask')[0].addEventListener('click', function () {
        get('.toggler:checked')[0].click();
    });

    fname = get('.custom_file_input span')[0];
    get('#file_input')[0].addEventListener('change', function (event) {
        const file_name = event.target.files[0].name;
        fname.textContent = file_name;
    });

    
    // const select = document.querySelector('select[name="face_box"]');
    // const imgFrame = document.querySelector('.face_img_frame');

    // select.addEventListener('change', function() {
    //     const selectedValue = this.value;
    //     imgFrame.innerHTML = `<img src="../static/test_img/${selectedValue}" alt="${selectedValue}">`;
    // });
});

function toggleElements(sel_id) {
    var sel = get(sel_id)[0]
    var sel_val = sel.options[sel.selectedIndex].value
    var option = get(sel_id + '~.content_box')
    for (var i = 0; i < option.length; i++) {
        ((i+1).toString() == sel_val) ?
        option[i].style.display = 'block'
        :
        option[i].style.display = 'none';
    }
}

function createStep(num) {
    let step = get('#dates')[0];
    let step_data = get('#issues')[0];
    
    // 尋找有沒有相應 step 元素
    let old_step = step.get('li')[num-1];
    // console.log(old_step);
    if (!old_step) {
        // 沒有的話，新增一個新的元素
        new_step = new_node('li', {
            innerHTML: `<a href="#step-${num}">Step.${num}</a>`
        });
        step.appendChild(new_step);
    }

    let old_step_data = step_data.get('#issues > li')[num-1];
    // console.log(old_step_data);
    if (!old_step_data) {
        new_step_data = new_node('li', {
            id: `step-${num}`,
            innerHTML: `
            <div class="data">
                <p>generate content</p>
                <textarea class="textbox" placeholder="尚未生成任何資料"></textarea>
                <div class="send">
                    <input type="submit" value="confirm" class="button-frame button-anime">
                    <input type="button" value="reset" class="button-frame button-anime">
                </div>
            </div>
            `
        });
        step_data.appendChild(new_step_data);
    } else {
        old_step_data.get('.data > textarea')[0].value = '';
    }

    
    $().timelinr({
        arrowKeys: 'true' 
    });
    const newStepLink = $('#dates li').last().find('a');

    // 触发点击新增或取代的步骤链接
    newStepLink.trigger('click');
}


async function upload(step_num) {
    createStep(step_num+1);
    data = new FormData(get("#dataForm")[0]);
    let text = fetch('/api', {
        method: 'POST',
        body: data
    }).then((response) => {
        return (response.text());
    }).then((e) => {
        get('.textbox')[0].value = e;
    });
    console.log(text);
    // file = get('#file_input')[0].files[0]
    // result = {f: file}
    // console.log(result);
    // await fetch('/api', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(result)
    // }).then((response) => {
    //     console.log(response);
    // });
    // var data = new FormData(get("#uploaddata")[0]);
    // if (step_num == 4) {
    //     document.uploaddata.submit();
    // }
}

// function upload(step_num) {
//     event.preventDefault()
//     document.uploaddata.submit();
// }


