(() => {

    /* Role_selection */
    document.addEventListener('DOMContentLoaded', function () {
        const IO_code_convert = {
            0: "teacher",
            1: "student"
        };

        [0, 1].forEach((IO_code) => {
            const [this_IO, target_IO] = [IO_code_convert[IO_code], IO_code_convert[+!IO_code]];
            let this_button = get(`#${this_IO}-button`)[0];
            if (this_button) {
                this_button.addEventListener('click', () => {
                    get(`#${target_IO}-button`)[0].style.display = 'none';
                });
            }
        });

    });
})();