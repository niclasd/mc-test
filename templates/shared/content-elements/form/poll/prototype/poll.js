import Alpine from "@alpinejs/csp";

Alpine.data("formPoll", () => ({
  root: null,
  labelElement: null,
  requiredErrorElement: null,
  isStar: false,

  initRadioGroup() {
    this.root = this.$root;
    let label = this.$root.querySelector('label');
    let legend = document.createElement('legend');
    legend.setAttribute("class", "form-label");
    legend.innerText = label.innerText;
    this.$el.appendChild(legend);
    label.remove();

    let infoText = this.$root.querySelector('.form-text');
    if (infoText.innerText) {
      this.$el.appendChild(infoText);
    }
  
    let definitionInput = this.root.querySelector("input.bsi-poll-number-input");
    if (definitionInput === null) {
      return;
    }

    let min = parseInt(definitionInput.getAttribute("min") || 1);
    let max = parseInt(definitionInput.getAttribute("max") || 10);
    let step = parseInt(definitionInput.getAttribute("step") || 1);
    let name = definitionInput.getAttribute("name");
    var id = definitionInput.getAttribute("id");
    var required = definitionInput.hasAttribute('required');
    definitionInput.remove();

    this.isStar = this.root.classList.contains("bsi-poll-star");
    for (let value = min; value <= max; value += step) {
      var checked = value == definitionInput.getAttribute('value');
      this._initRadioElement(value, `${id}-${value}`, name, required, checked);
    }

    this.updateStatus();
  },

  initRequiredError() {
    this.requiredErrorElement = this.$el;
  },

  _initRadioElement(value, id, name, required, checked) {
    let div = document.createElement("div");
    div.setAttribute(
      "class",
      "form-check form-check-inline radio-group bsi-poll-radio-item"
    );
    var radioHTML = `<input type="radio" 
      class="form-check-input bsi-poll-radio-input" 
      value="${value}" 
      id="${id}" 
      name="${name}"
      @change="updateStatus" 
      ${required ? "required" : ""} 
      ${checked ? "checked" : ""}>`;
    var labelHTML = `<label for="${id}" class="form-check-label bsi-poll-radio-label">${value}</label>`;

    div.innerHTML = radioHTML + labelHTML;
    this.$el.appendChild(div);
  },

  updateStatus() {
    let radioItems = Array.from(this.root.querySelectorAll("input[type=radio]"));
    let selectedIndex = radioItems.findIndex(radio => radio.checked);
    radioItems.forEach((radio, i) => {
      let parentClassList = radio.parentElement.classList;
      let isActive = this.isStar ? i <= selectedIndex : i === selectedIndex;
      if (isActive) {
        parentClassList.add("bsi-poll-radio-checked");
      } else {
        parentClassList.remove("bsi-poll-radio-checked");
      }
    });
  },
}));
