let create_button = (name, parent, callback) => {
    let button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', callback);
    button.id = 'button_' + name.replace(/\s+/g, '');
    parent.appendChild(button);
    return button;
};

let create_slider = (name, parent, min, max, value, step) => {
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.id = 'slider_' + name.replace(/\s+/g, '');
    parent.appendChild(slider);

    // remove all non-digit characters
    const parsedValue = parseFloat(value.replace(/\D/g, ''));
    slider.value = isNaN(parsedValue) ? min : parsedValue;

    return slider;
};

let rootStyles = getComputedStyle(document.documentElement);
let header = document.querySelector('header');
let css_var_names = ['white', 'red', 'blue', 'grey', 'moon-grey', 'moon-blue-one', 'moon-blue-two'];

let btns = [];
let celestial_bodies = [];

// Function that create a slider and label,
// append them to the header,
// add a listener to the slider,
// the slider change the css variable and change the text label with the new value of the css variable.
let create_slider_and_label_for_css_var = (css_var_prefix, css_var_name, css_var_unit, min, max, step) => {
    let current_value = rootStyles.getPropertyValue(`--${css_var_prefix}-${css_var_name}`);
    let slider = create_slider(`${css_var_unit}-${css_var_name}`, header, min, max, current_value, step);
    console.log(`--${css_var_prefix}-${css_var_name}` + ' ' + current_value);
    let slider_label = document.createElement('label');
    slider_label.innerText = current_value;

    header.appendChild(slider);
    header.appendChild(slider_label);

    slider.addEventListener('input', () => {
        document.documentElement.style.setProperty(`--${css_var_prefix}-${css_var_name}`, slider.value + css_var_unit)
        slider_label.innerText = slider.value + css_var_unit;
        console.log(slider_label.innerText);
        console.log(`--${css_var_prefix}-${css_var_name}`);
    })
}

css_var_names.forEach(css_var_name => {
    let isSelected = false;

    let celestial_body = document.querySelector(`.${css_var_name}`);

    let btn = create_button(css_var_name , header, () => {
        isSelected = !isSelected;
        if (isSelected) {
            celestial_body.style.outline = '10px dashed purple';
            btn.style.border = '3px solid purple';
        } 
        else {
            celestial_body.style.outline = 'none';
            btn.style.border = 'none';
        }
    })

    celestial_bodies.push(celestial_body);
    btns.push(btn);

    header.appendChild(btn);
    create_slider_and_label_for_css_var('tx',  css_var_name, 'px', 0, 1000, 1);
    create_slider_and_label_for_css_var('d',  css_var_name, 'px', 0, 100, 1);
    create_slider_and_label_for_css_var('s',  css_var_name, 's', 0, 10, 1);
});
