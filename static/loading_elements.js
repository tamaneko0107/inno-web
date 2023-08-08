document.addEventListener('DOMContentLoaded', () => {
    // 建立 loading div
    const loading = new_node('div', {
        className: 'loading' 
    });
    
    // 建立 5 個 container div 
    for (let i = 0; i < 5; i++) {
    
        const container = new_node('div', {
            className: 'container'
        });
    
        loading.appendChild(container);
    
    }
    
    // 加到 body 上
    document.body.appendChild(loading);
});

window.addEventListener('load', () => {
    // 移除加載元素
    get('.loading')[0].remove();
    // setTimeout(() => {
    //     // 加載完成的操作
    //   }, 5000); // 延遲5秒
});