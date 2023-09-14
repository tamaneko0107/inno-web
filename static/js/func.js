/**
    * @param {string} selector
    * @param {HTMLElement} ref
    * @returns {HTMLElement[]}
    */
function get(selector, ref = document) {
    return Array.from(ref.querySelectorAll(selector)).map((e) => {
        e.get = (selector) => window.get(selector, e);
        return e;
    });
}


/**
 * @param {string} tagname
 * @param {object} properties
 * @returns {HTMLElement}
 */
function new_node(tagname, properties = {}) {
    let property_modifier = (obj, properties) => {
        for (let key of Object.keys(properties)) {
            (
                (typeof (obj[key]) === 'object') ?
                    (property_modifier(obj[key], properties[key]))
                    :
                    (obj[key] = properties[key])
            );
        }

        return obj;
    };
    return property_modifier(document.createElement(tagname), properties);
}

/**
 * @param {string} url
 * @param {string} method
 * @param {object} data
 * @param {string} key
*/
// url format: /api/...
async function fetchAPI(url, method = 'POST', data = {}, key = undefined, content_type = undefined) {
    let headers = new Headers();
    if (content_type) {
        headers.append('Content-Type', content_type);
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
    }
    return await fetch(url, {
        method: method,
        headers: headers,
        body: data
    }).then((response) => {
        if (!(response.ok || response.status === 400)) {
            console.log(response);
            alert(`Unexpected response status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        if (data['status'] === "error") throw new Error(data['content']['message']);
        if (key) {
            if (Array.isArray(key)) {
                let res = {};
                for (let k of key) {
                    res[k] = data['content'][k];
                }
                return res;
            }
            else if (typeof (key) === 'string') {
                return data['content'][key];
            }
            else {
                throw new Error("key must be a string or an array of strings or undefined");
            }

        }
        else {
            return data;
        }
    }).catch((error) => {
        alert(`ERROR RECEIVED: \n${error}`);
    });
}

function getStatus(task_id, statusbar) { // TODO use setInterval to check status every 1s
    let timer = setInterval(() => {
        fetch(`/api/status?task_id=${task_id}`, {
            method: "get",
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(
            (res) => {
                var content = res['content'];
                if (res['status'] == 'FAILURE') {
                    throw new Error(`Task failed!${res['error']}`);
                }
                if (res['status'] == 'PENDING') {
                    console.log('generating, please wait...');
                }
                else if (content['status'] == 'PROGRESS') {
                    console.log('generating, please wait...');
                    let current = res['info']['current'];
                    let total = res['info']['total'];
                    let percent = (current / total) * 100;
                    statusbar.style.width = percent + '%';
                    statusbar.innerHTML = percent + '%';
                    statusbar.setAttribute('aria-valuenow', percent);
                }
                else if (content['status'] == 'SUCCESS') {
                    statusbar.style.width = '100%';
                    statusbar.innerHTML = '100%';
                    statusbar.setAttribute('aria-valuenow', 100);
                    // get(".chat_window")[0].style.width = "300px";
                    // let videoPath = res['result'];
                    // get("#video")[0].src = videoPath;
                    alert("generate success!");
                    clearInterval(timer);
                }
            }
        ).catch((error) => {
            alert(`Error: ${error.message}`);
            clearInterval(timer);
        });
    }, 1000);
};