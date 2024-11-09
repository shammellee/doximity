const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const dropdown = $('#dropdown');
const dropdownOptions = $$('.dropdown-list__option');
const dropdownToggle = $('#dropdown-list-toggle');


function toggleDropdown(value) {
  const checked = undefined !== value ? value : !dropdownToggle.checked;
  dropdownToggle.checked = checked;

  if(checked) {
    console.log('checked');
    dropdownOptions.forEach(option => {
      option.tabIndex = 0;
    });
  } else {
    console.log('not checked');
    dropdownOptions.forEach(option => {
      option.tabIndex = -1;
    });
  }
}

function selectDropdownOption(option) {
  $('#dropdown__readout').textContent = option.textContent;

  dropdownOptions.forEach(option => {
    option.ariaSelected = 'false';
  });

  option.ariaSelected = 'true';
}

dropdown.addEventListener('click', event => {
  event.stopPropagation();
});

dropdown.addEventListener('keyup', event => {
  event.stopPropagation();
  switch(event.code) {
    default: break;
    case 'Space':
    case 'Enter':
    case 'NumpadEnter':
      toggleDropdown();
      break;
    case 'ArrowDown':
      toggleDropdown(true);
      break;
    case 'Escape':
      if(dropdownToggle.checked) toggleDropdown(false);
      break;
  }
});

dropdownOptions.forEach(option => {
  option.addEventListener('click', event => {
    event.stopPropagation();
    selectDropdownOption(event.currentTarget);
  });

  option.addEventListener('keyup', event => {
    event.stopPropagation();
    switch(event.code) {
      default: break;
      case 'Space':
      case 'Enter':
      case 'NumpadEnter':
        selectDropdownOption(event.currentTarget);
        toggleDropdown();
        break;
      case 'Escape':
        toggleDropdown(false);
        break;
    }
  });
});

document.addEventListener('mousedown', event => {
  switch(true) {
    default:
      toggleDropdown(false);
      break;
    case event.target === dropdown:
    case event.target.classList.contains('dropdown-list__option'):
      break;
  }
});

