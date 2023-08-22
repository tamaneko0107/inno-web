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
async function fetchAPI(url, method, data={}, key=undefined){
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (!(response.ok || response.status === 400)) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then((data) => {
        if (data['status']!="ok") throw new Error(data['content']['message']);
        if (key) {
            if (key instanceof Array) {
                let res = {};
                for (let k of key) {
                    res[k] = data['content'][k];
                }
                return res;
            }
            else if (key instanceof String) {
                return data['content'][key];
            }
            else if (key === undefined) {
                return data['status'];
            }
            else {
                throw new Error("key must be a string or an array of strings or undefined");
            }

        }
        else {
            return data;
        }
    }).catch((error) => {
        alert(error);
    });
}