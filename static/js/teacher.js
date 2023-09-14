
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

    get('#face_input')[0].addEventListener('change', function (event) {
        var fileURL = URL.createObjectURL(event.target.files[0]);
        get('#view_face')[0].href = fileURL;
    });

});

function code_copy() {
    let code = get('#code')[0].textContent;
    navigator.clipboard.writeText(code);
}

// 切換至資料輸入畫面
function data_input_frame() {
    if (get('input[name="file_name"]')[0].value) {
        get('.create-course')[0].style.transform = 'translateY(2000px)';
        get('.data-input-frame')[0].style.transform = '';
        get('.course')[0].style.display = '';
    }
}

// 切換至創建課程畫面
function create_course() {
    get('.data-input-frame')[0].style.transform = 'translateY(-2000px)';
    get('.create-course')[0].style.transform = '';
    get('.toggler:checked')[0].click();
    get('.course')[0].style.display = 'none';
}

function create_code(course_name, id) {
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
    new_code.querySelector('#code').textContent = id;

    // 檢查課程是否已存在
    if ($('#jstree-root').jstree(true).get_node(id)) {
        alert('課程已存在');
    }
    else {
        $('#jstree-root').jstree(true).create_node('#', { "id": new_code.querySelector('#code').textContent, "type": "folder", "text": course_name  });
    }
    get('.create-course')[0].appendChild(new_code);
    [get('button[title="close-code"]')[0], get('.create-course-mask')[0], get('.toggler')[0]].forEach((element) => {
        element.addEventListener('click', function (e) {
            if (e.target === e.currentTarget) {
                // console.log(e.target);
                new_code.remove();
                element.removeEventListener('click', arguments.callee, false);
                if (get('.toggler:not(:checked)')[0])
                    get('.toggler:not(:checked)')[0].click();
            }
        });
    });
}
// function hashFunc(acc, pw){
//     let token = acc + pw;
//     let hashPromise = window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)).then(
//         (hashBuffer) => {
//             return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
//         }
//     ).then((hash) => {
//         //
//         });
//     console.log(hashPromise);
// }



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
    if (get(sel_id)[0].value != 0) {
        get('#view_face')[0].style.display = 'none';
    }
    else {
        get('#view_face')[0].style.display = '';
    }
}

function createStep(num) {
    let step = get('#dates')[0];
    let step_data = get('#issues')[0];

    // 尋找有沒有相應 step 元素
    // create new step element if provided step element is not exist
    let old_step = step.get('li')[num - 1];
    // console.log(old_step);
    if (!old_step) {
        // 沒有的話，新增一個新的元素
        new_step = new_node('li', {
            innerHTML: `<a href="#step-${num}">Step.${num}</a>`
        });
        step.appendChild(new_step);
    } else {
        new_step = old_step;
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
                    <input type="button" value="confirm" class="button-frame button-anime">
                    <input type="button" value="reset" class="button-frame button-anime">
                </div>
            </div>
            `
        });
        step_data.appendChild(new_step_data);
    } else {
        old_step_data.get('.data > textarea')[0].value = '';
        new_step_data = old_step_data;
    }


    $().timelinr({
        arrowKeys: 'true'
    });
    const newStepLink = $('#dates li').last().find('a');

    // add trigger for click add or replace step link
    newStepLink.trigger('click');

    return [new_step_data, new_step];
}

function newForm() {
    var data = new FormData(get("form")[0]);
    
    data.append('keypoint_type', get('input[type=radio]:checked + div span')[0].innerHTML.toLowerCase());
    // 新增step-2的圖片至formdata
    if (get('#setting2')[0].value != 0) {
        data.delete('uploadface');
        fetch(get('.face_img_frame input[type=radio]:checked+.face_img')[0].src)
            .then(response => response.blob())
            .then(blob => {
                // 將Blob物件加入至FormData中
                data.append('uploadface', blob, 'image.png');
            })
            .catch(error => console.error('Error:', error));
    }

    return data;
}

async function uploadKeypoint(step_num) {
    var new_node = createStep(step_num + 1);
    var data = newForm();
    
    var loading_overlay = create_loading();
    var statusbar = create_status(loading_overlay);
    fetchAPI('http://c8763yee.mooo.com:7414/api/upload/keypoint', 'POST', data, 'keypoint_content')
    .then((result) => {
        if (!result) { throw new Error('upload failed'); }
        get('.data > textarea')[0].value = result
        get('input[value="reset"]')[0].addEventListener('click', function () {
            if (window.confirm("You sure you want to reset?")){
                get('.data > textarea')[0].value = result;
            }
        });
    })
    .catch((error) => { 
        console.log(error);
        new_node.forEach((element) => {
            element.remove();
        });
        get('#dates li').pop().childNodes[0].click();
    })
    .finally(() => {
        statusbar.style.width = '100%';
        statusbar.innerHTML = '100%';
        statusbar.setAttribute('aria-valuenow', 100);
        setTimeout(() => {
            loading_overlay.remove();
        }, 1000);
    });
}

function uploadVideo() {
    var data = newForm();
    
    var loading_overlay = create_loading();
    var statusbar = create_status(loading_overlay);

    if (!confirm('Are you sure to generate video?')) return;
    fetchAPI('http://c8763yee.mooo.com:7414/api/upload/video', 'POST', data, 'task_id')
    .then((res) => {
        getStatus(res, statusbar);
    }).catch((error) => {
        alert(`Error: ${error.message}`);
    }).finally(() => {
        setTimeout(() => {
            loading_overlay.remove();
        }, 1000);
    });
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
    let body = JSON.stringify({ "subject_name": course_name, "author": 'admin' });
    fetchAPI('http://c8763yee.mooo.com:7414/api/create/subject', 'POST', body, 'ID', 'application/json').then((ID) => {
        console.log(ID);
        create_code(course_name, ID);
    });
}

function playAudio() {
    var audioPlayer = get('#audioPlayer')[0];
    var voices = get('#voices')[0];
    audioPlayer.src = `/static/sample/sample_${voices.value}.mp3`;
    audioPlayer.play();
}