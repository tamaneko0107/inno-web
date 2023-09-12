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