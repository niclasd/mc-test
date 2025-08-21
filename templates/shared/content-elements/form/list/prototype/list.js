import Alpine from "@alpinejs/csp";
import Sortable from "sortablejs";

document.addEventListener("alpine:init", () => {
  Alpine.data("listElement", () => ({
    id: "list-" + Math.random().toString(36).substr(2, 9),
    items: [
      { id: 1, name: "Element 1" },
      { id: 2, name: "Element 2" },
      { id: 3, name: "Element 3" },
    ],

    initializeSortable() {
      const listElement = this.$refs.sortableList;

      new Sortable(listElement, {
        group: this.id,
        animation: 150,
        onEnd: this.handleSortEnd.bind(this),
      });
    },

    handleSortEnd(evt) {
      const movedItem = this.items.splice(evt.oldIndex, 1)[0];
      this.items.splice(evt.newIndex, 0, movedItem);
      showOrHideArrowIcons();
    }
  }));
});

const showOrHideArrowIcons = () => {
  const lists = document.querySelectorAll(".sortable-list-ul");

  lists.forEach(function (list) {
    const listItems = list.querySelectorAll("li");
    let listSorted = "";
    let listSortedArray = []; // Temporary array to store checked items
    listItems.forEach(function (item, index) {
      const upIcon = item.querySelector(".bi-chevron-up");
      const downIcon = item.querySelector(".bi-chevron-down");
      if (index === 0) {
        upIcon.style.display = "none";
      } else {
        upIcon.style.display = "inline-block";
      }

      if (index === listItems.length - 1) {
        downIcon.style.display = "none";
      } else {
        downIcon.style.display = "inline-block";
      }

      const listCheckboxes = item.querySelectorAll("input[type='checkbox']");
      let listItemContent = null;
      listCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          listItemContent = checkbox.nextElementSibling.innerHTML;
          listSortedArray.push(listItemContent);
        }
      });
      listSorted = listSortedArray.join(";");
    });
    const textHidden = list.closest("div").querySelector("input[type='text']");
    textHidden.value = listSorted;
  });
};

const changeListOrder = () => {
  const lists = document.querySelectorAll(".sortable-list-ul");

  lists.forEach(function (list) {
    list.addEventListener("click", (e) => {
      const target = e.target;

      if (target.classList.contains("group-list-up")) {
        const li = target.parentElement.parentElement;
        const prev = li.previousElementSibling;
        if (prev) {
          list.insertBefore(li, prev);
        }
      }

      if (target.classList.contains("group-list-down")) {
        const li = target.parentElement.parentElement;
        const next = li.nextElementSibling;
        if (next) {
          list.insertBefore(next, li);
        }
      }

      showOrHideArrowIcons();
    });
  });
 
};

document.addEventListener("DOMContentLoaded", function () {
  changeListOrder();
  showOrHideArrowIcons();
});

const checkboxes = document.querySelectorAll(
  "input[type='checkbox'].list-group-items-checkbox"
);
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    showOrHideArrowIcons();
  });
});
