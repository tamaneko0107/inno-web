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

    // if (get('.non-data')[0]) {
    //     get('.non-data')[0].addEventListener('click', create_course);
    // }

    if (get('button[title=create_course]')[0]) {
        get('button[title=create_course]')[0].addEventListener('click', data_input_frame);
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

    get('#file_input')[0].addEventListener('change', function (event) {
        var fileURL = URL.createObjectURL(event.target.files[0]);
        get('#view_file')[0].href = fileURL;
    });

    get('#url_input')[0].addEventListener('input', function (event) {
        get('#view_file')[0].href = event.target.value;
    });

});

function code_copy() {
    let code = get('#code')[0].textContent;
    navigator.clipboard.writeText(code);
}

function data_input_frame() {
    if (get('input[name="file_name"]')[0].value) {
        get('.create-course')[0].style.transform = 'translateY(2000px)';
        get('.data-input-frame')[0].style.transform = '';
    }
}

function create_course() {
    get('.data-input-frame')[0].style.transform = 'translateY(-1000px)';
    get('.create-course')[0].style.transform = '';
    get('.toggler:checked')[0].click();
}

function create_code(course_name) {
    let new_code = new_node('div', {
        className: 'create-course-mask',
        innerHTML: `
        <div class="button-frame role-open role-selection code-create">
            <button title="close-code" class="button-frame button-anime return-button">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <span>課程代碼</span>
            <div class="input-frame">
                <div>
                    <div class="input-box">
                        <label id="code"></label>
                    </div>
                </div>
                <div>
                    <div class="register-button-frame">
                        <button type="button" class="button-frame button-anime" id="code-copy" onclick="code_copy()">
                            <div>COPY</div>
                            <i class="fa-solid fa-check"></i>
                        </button>     
                    </div>
                </div>
            </div>
        </div>`
    });

    new_code.querySelector('#code').textContent = Math.random().toString(36).slice(2, 10).toUpperCase();
    $('#jstree-root').jstree(true).create_node('#', { "id": new_code.querySelector('#code').textContent, "type": "folder", "text": course_name  });
    get('.create-course')[0].appendChild(new_code);
    [get('button[title="close-code"]')[0], get('.create-course-mask')[0], get('.toggler')[0]].forEach((element) => {
        element.addEventListener('click', function (e) {
            if (e.target === e.currentTarget) {
                // console.log(e.target);
                new_code.remove();
                if (get('.toggler:not(:checked)')[0])
                    get('.toggler:not(:checked)')[0].click();
            }
        }, { once: true });
    });
    function remove_code_frame (e) {
        if (e.target === e.currentTarget) {
            // console.log(e.target);
            new_code.remove();
            if (get('.toggler:not(:checked)')[0])
                get('.toggler:not(:checked)')[0].click();
        }
        else
            e.addEventListener('click', remove_code_frame, { once: true });
    }
}

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
            get(sel_id + '~.content_box')[limit.length - 1].style.display = 'block';
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

    fetchAPI('/api/upload/keypoint', 'POST', new FormData(get('#dataForm')[0]), 'keypoint_content')
        .then((result) => { get('.data > textarea')[0].value = result })
        .catch((error) => { console.log(error) });
}

function register() {
    const teacher_name = get('#teacher-register-username')[0].value;
    const teacher_password = get('#teacher-register-password')[0].value;
    const teacher_password_confirm = get('#teacher-register-password-confirm')[0].value;
    if (teacher_password != teacher_password_confirm) {
        alert('密碼不一致');
        return;
    }
    let body = JSON.stringify({ "username": teacher_name, "password": teacher_password });
    fetchAPI('/api/auth/register', 'POST', body, 'url', 'application/json').then((url) => {
        console.log(url);
        if (!url) { alert('register failed'); return; }
        alert('register success, redirect to login page');
        window.location.href = url;
    });
}

function login() {
    let username = get('#index-login-username')[0].value;
    let password = get('#index-login-password')[0].value;
    let body = JSON.stringify({ "username": username, "password": password });
    fetchAPI('/api/auth/login', 'POST', body, 'url', 'application/json')
        .then((url) => {
            console.log(url);
            if (!url) { alert('login failed'); return; }
            alert('login success');
            window.location.href = url;
        });
}

function create_subject() {
    const course_name = get('#course-name')[0].value;
    // get author from cookie
    // const author = document.cookie.split('; ').find(row => row.startsWith('username')).split('=')[1];
    // let body = JSON.stringify({ "subject_name": course_name, "author": author });
    // fetchAPI('/api/create/subject', 'POST', body, undefined, 'application/json');
    create_code(course_name);
}