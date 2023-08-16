document.addEventListener('DOMContentLoaded', () => {

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
});

window.addEventListener('load', () => {
    // 移除加載元素
    get('.loading-overlay')[0].remove();
    // setTimeout(() => {
    //     // 加載完成的操作
    //   }, 500); // 延遲0.5秒
});