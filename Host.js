const slider_input = document.getElementById('slider_input'),
      slider_thumb = document.getElementById('slider_thumb'),
      slider_line = document.getElementById('slider_line');

function showSliderValue() {
  slider_thumb.innerHTML = slider_input.value;
  const bulletPosition = (slider_input.value /slider_input.max),
        space = slider_input.offsetWidth - slider_thumb.offsetWidth;

  slider_thumb.style.left = (bulletPosition * space) + 'px';
  slider_line.style.width = slider_input.value + '%';
}

showSliderValue();
window.addEventListener("resize",showSliderValue);
slider_input.addEventListener('input', showSliderValue, false);



//app-collapse

const collapses = document.querySelectorAll("[app-collapse-header-btn]");

const handleInitCollapse = (btnElement, parentEle) => {
  const collapses = parentEle.querySelectorAll("[app-collapse-header-btn]");
  collapses.forEach(collapse => {
    const isIndipendente =  collapse.getAttribute('indipendente') === 'true';
    const controlsId = collapse.getAttribute('aria-controls');
    const contentEl = document.getElementById(controlsId);
    
    if(!isIndipendente && collapse !== btnElement){
      collapse.setAttribute('aria-expanded', false);
      contentEl.classList.remove('app-collapse-expanded');
    }
  })
}

const handleExpandToggle = (event) => { 
  // console.log("handle Expand Toggle test log");
  const btnElement = event.currentTarget;
  const controlsId = btnElement.getAttribute('aria-controls');
  const contentEl = document.getElementById(controlsId);
  const parentEle = btnElement.closest("[app-accordian]");
  const indipendente = btnElement.getAttribute('indipendente') === 'true';
  
  if(!indipendente && parentEle){
    handleInitCollapse(btnElement, parentEle);
  }

  let open = btnElement.getAttribute('aria-expanded') === 'true';
  if (open) {
    btnElement.setAttribute('aria-expanded', `${!open}`);
    contentEl.classList.remove('app-collapse-expanded');
  } else {
    btnElement.setAttribute('aria-expanded', `${!open}`);
    contentEl.classList.add('app-collapse-expanded');
  }

} 
collapses.forEach(collapse => collapse.addEventListener('click', handleExpandToggle));