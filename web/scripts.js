document.addEventListener('DOMContentLoaded', function() {
  const courseSelect = document.getElementById('course');
  const financingCheckboxes = document.querySelectorAll('.financing-options input[type="checkbox"]');
  const priorityInputs = document.querySelectorAll('.financing-options input[type="number"]');
  const saveRowBtn = document.querySelector('.save-row');
  const tableBody = document.querySelector('.table-section tbody');
  let editingRowIndex = null;

  function resetForm() {
    courseSelect.value = '';
    financingCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = false;
      priorityInputs[index].value = '';
      priorityInputs[index].disabled = true;
    });
  }

  function isCourseNameDuplicate(courseName) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    return rows.some(row => row.cells[0].innerText === courseName);
  }

  function arePrioritiesUniqueForBudget(financing1, financing2) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const prioritiesInColumn1 = rows.map(row => row.cells[1].innerText);
    const prioritiesInColumn2 = rows.map(row => row.cells[2].innerText);
  
    if (financing1 && (prioritiesInColumn1.includes(financing1) || prioritiesInColumn2.includes(financing1))) {
      return false;
    }
  
    if (financing2 && (prioritiesInColumn1.includes(financing2) || prioritiesInColumn2.includes(financing2))) {
      return false;
    }
  
    return true;
  }  

  function arePrioritiesUniqueForPaid(financing3) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const prioritiesInColumn3 = rows.map(row => row.cells[3].innerText);
  
    if (financing3 && (prioritiesInColumn3.includes(financing3))) {
      return false;
    }
  
    return true;
  }  

  function addRowToTable(data, rowIndex = null) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${data.courseName}</td>
      <td>${data.financing1}</td>
      <td>${data.financing2}</td>
      <td>${data.financing3}</td>
      <td>
        <button class="button edit">Редактировать</button>
        <button class="button delete">Удалить</button>
      </td>
    `;

    if (rowIndex !== null) {
      if (tableBody.childNodes[rowIndex]) {
        // Replace the row if the rowIndex is still valid
        tableBody.replaceChild(row, tableBody.childNodes[rowIndex]);
      } else {
        // If rowIndex is not valid (row was deleted), append the row as a new one
        tableBody.appendChild(row);
        editingRowIndex = null;
      }
    } else {
      tableBody.appendChild(row);
    }
    

    row.querySelector('.edit').addEventListener('click', function() {
      editingRowIndex = Array.prototype.indexOf.call(tableBody.childNodes, row);
      courseSelect.value = data.courseName;
      financingCheckboxes.forEach((checkbox, index) => {
        checkbox.checked = data['financing' + (index + 1)] !== '';
        priorityInputs[index].value = data['financing' + (index + 1)];
        priorityInputs[index].disabled = !checkbox.checked;
      });
    });

    row.querySelector('.delete').addEventListener('click', function() {
      tableBody.removeChild(row);
    });
  }

  financingCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
      priorityInputs[index].disabled = !checkbox.checked;
      if (!checkbox.checked) {
        priorityInputs[index].value = '';
      }
    });
  });  

  saveRowBtn.addEventListener('click', function() {
    const courseName = courseSelect.value;
    const financing1 = financingCheckboxes[0].checked ? priorityInputs[0].value : '';
    const financing2 = financingCheckboxes[1].checked ? priorityInputs[1].value : '';
    const financing3 = financingCheckboxes[2].checked ? priorityInputs[2].value : '';
  
    if (!courseName) {
      alert('Пожалуйста, выберите направление.');
      return;
    }
  
    if (editingRowIndex === null && isCourseNameDuplicate(courseName)) {
      alert('Вы уже выбрали данное направление.');
      return;
    }

    if (!arePrioritiesUniqueForBudget(financing1, financing2)) {
      alert('Приоритеты для Бюджетных и целевых направлений должны быть уникальны');
      return;
    }  

    if (!arePrioritiesUniqueForPaid(financing3)) {
      alert('Приоритеты для платных направлений должны быть уникальны');
      return;
    }  
  
    addRowToTable({ courseName, financing1, financing2, financing3 }, editingRowIndex);
    editingRowIndex = null;
    resetForm();
  });
});
