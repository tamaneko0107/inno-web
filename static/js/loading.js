document.addEventListener('DOMContentLoaded', create_loading);

function create_loading(nonstatus = false) {

    // 建立 loading-overlay div
    const loading_overlay = new_node('div', {
        className: 'loading-overlay' 
    });

    // 建立 loading div
    const loading = new_node('div', {
        className: 'loading' 
    });

    loading_overlay.appendChild(loading);
    
    // 建立 5 個 container div 
    for (let i = 0; i < 5; i++) {
    
        const container = new_node('div', {
            className: 'container'
        });
    
        loading.appendChild(container);
    
    }
    
    // 加到 body 上
    document.body.appendChild(loading_overlay);

    if (nonstatus) {
        window.addEventListener('load', () => {
            // 移除加載元素
            // get('.loading-overlay')[0].remove();
            loading_overlay.remove();
            // setTimeout(() => {
                //     // 加載完成的操作
                //   }, 500); // 延遲0.5秒
        });
        let iframe = get('iframe')[0];
        let video = get('video')[0];
        if ( iframe && video) {
            console.log(iframe);
            let loadedCount = 0;
            iframe.onload = () => {
                loadedCount++;
                if (loadedCount === 1) {
                    loading_overlay.remove();
                }
            }
            video.onloadeddata = (event) => {
                loadedCount++;
                if (loadedCount === 2) {
                    loading_overlay.remove();
                }
            };
        }
    } else {
        console.log('loading');
        return loading_overlay;
    }
}

function create_status(loading_overlay) {
    const status_overlay = new_node('div', {
        className: 'progress',
        innerHTML: '<div class="progress-bar progress-bar-striped progress-bar-animated" \
                    role="progressbar" \
                    aria-valuenow="75" \
                    aria-valuemin="0" \
                    aria-valuemax="100" \
                    style="width: 0%">0%</div>'
    });
    loading_overlay.appendChild(status_overlay);

    return status_overlay.childNodes[0];
}
