document.addEventListener('DOMContentLoaded', function () {
    // $('#dates li').eq(0).find('a').trigger('click');
    if (get('.mask')[0]) {
        get('.mask')[0].addEventListener('click', function () {
            get('.toggler:checked')[0].click();
        });
    }

    let fileInputs = get('.file_input');
    let fileNames = get('.custom_file_input .file-name');
    if (fileInputs) {
        fileInputs.forEach((fileInput, index) => {
            fileInput.addEventListener('change', function (event) {
                const file_name = event.target.files[0].name;
                fileNames[index].textContent = file_name;
            });
        });
    }

    if (get('.non-data')[0]) {
        get('.non-data')[0].addEventListener('click', function () {
            get('.data-frame')[0].style.display = 'none';
            get('.create-course')[0].style.display = '';
        });
    }
    
    var dropArea = get('.drop-area');
    if (dropArea) {
        dropArea.forEach((dropArea) => {
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });
            dropArea.addEventListener('drop', handleDrop, false);
        });
    }

});

function preventDefaults(e) {
    e.stopPropagation();
    e.preventDefault();
}

function handleDrop(e) {
    preventDefaults(e);
    let files = e.dataTransfer.files;
    let file_input = e.target.querySelector('.file_input');
    let acceptedTypes = file_input.accept.split(',');
    acceptedTypes = acceptedTypes.map(type => type.replace('.', ''));
    if (!Array.prototype.every.call(files, file => acceptedTypes.includes(file.name.split('.').pop().toLowerCase()))) {
        alert('Some files are not accepted');
        return;
    }
    file_input.files = files;
    file_input.dispatchEvent(new Event('change'));
}

function toggleElements(sel_id, limit = []) {
    var sel = get(sel_id)[0]
    var sel_val = sel.options[sel.selectedIndex].value
    if (limit.length != 0) {
        for (option of get(sel_id + '~.content_box')) {
            option.style.display = 'none';
        }
        (limit.includes(sel_val)) ?
            get(sel_id + '~.content_box')[sel_val].style.display = 'block'
            :
            get(sel_id + '~.content_box')[limit.length-1].style.display = 'block';
    }
    else {
        for (const [i, option] of get(sel_id + '~.content_box').entries()) {
            (sel.options[i].value == sel_val) ?
                option.style.display = 'block'
                :
                option.style.display = 'none';
        }
    }
}

function face_select(sel_id, limit = []) {
    toggleElements(sel_id, limit);
    get('.face_img')[0].click();
}

function createStep(num) {
    let step = get('#dates')[0];
    let step_data = get('#issues')[0];

    // 尋找有沒有相應 step 元素
    let old_step = step.get('li')[num - 1];
    // console.log(old_step);
    if (!old_step) {
        // 沒有的話，新增一個新的元素
        new_step = new_node('li', {
            innerHTML: `<a href="#step-${num}">Step.${num}</a>`
        });
        step.appendChild(new_step);
    }

    let old_step_data = step_data.get('#issues > li')[num - 1];
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


async function uploadKeypoint(step_num) {
    createStep(step_num + 1);
    data = new FormData(get("form")[0]);

    // let keypointContent = await fetchAPI('/api/upload/keypoint', 'multipart/form-data', 'POST', data, 'keypoint_content');
    // console.log(keypointContent);

    // data.append('tset', get('#file_input')[0]);
    fetch('/test', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: data
        }).then((response) => {
            return response.text();
        }).then((text) => {
            console.log(text);
        });

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


function register() {
    const teacher_name = get('#teacher-register-username')[0].value;
    const teacher_password = get('#teacher-register-password')[0].value;
    const teacher_password_confirm = get('#teacher-register-password-confirm')[0].value;
    if (teacher_password != teacher_password_confirm) {
        alert('密碼不一致');
        return;
    }
    let body = JSON.stringify({ "username": teacher_name, "password": teacher_password });
    fetchAPI('/api/auth/register', 'application/json', 'POST', body, 'url').then((url) => {
        alert('register success, redirect to login page');
        window.location.replace(url);
    }).catch((err) => {
        window.location.href = url;
    }).catch((err) => {
        alert('register failed:')
    });


}

function login() {
    let teacher_name = get('#index-login-username')[0].value;
    let teacher_password = get('#index-login-password')[0].value;
    let body = JSON.stringify({ "username": teacher_name, "password": teacher_password });
    fetchAPI('/api/auth/login', 'application/json', 'POST', body, 'url').then((url) => {
        console.log(url);
        if (!url || url == undefined) throw new Error('');
        alert('login success');
        window.location.href = url;
    }).catch((err) => {
        alert('login failed');
        const course_name = get('#course-name')[0].value;
        let body = JSON.stringify({ "subject_name": course_name, "author": "test" });
        fetchAPI('/api/create/subject', 'application/json', 'POST', body);
    });
}