(()=> {

    document.addEventListener('DOMContentLoaded', () => {
        let teacher = get('#teacher-button')[0];
        let student = get('#student-button')[0];

        function teacher_create() {
            teacher.removeEventListener('click', teacher_create);

            teacher.className = 'button-frame role-open';

            let return_button = new_node('button', {
                className: 'button-frame button-anime return-button',
                innerHTML: '<i class="fa-solid fa-arrow-left-long"></i>',
            })

            let input_frame = new_node('div', {
                className: 'input-frame',
                innerHTML: `
                <div>
                    <input type="text" class="button-frame login-frame" placeholder="username">
                    <input type="password" class="button-frame login-frame" placeholder="password">
                </div>
                <div>
                    <a class="forget-password" href="/">forget password?</a>
                    <div>
                        <a href="/register"><button class="button-frame button-anime medium-button" id="index-register">register</button></a>
                        <button class="button-frame button-anime medium-button" id="index-login">login</button>
                    </div>
                </div>`
            });

            teacher.insertBefore(return_button, teacher.firstChild);
            teacher.appendChild(input_frame);

            return_button.addEventListener('click', (event) => {
                event.stopPropagation();

                teacher.className = 'button-frame button-anime';
                student.style.display = 'flex';

                return_button.remove();
                input_frame.remove();
                
                teacher.addEventListener('click', teacher_create);
            });
        }
        
        teacher.addEventListener('click', teacher_create);
    });
})();