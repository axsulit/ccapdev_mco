//bella work here
const editButton = document.querySelector('.edit-button');
const contentText = document.querySelector('.content-text');
const contentEdit = document.querySelector('.content-edit');
const saveButton=document.querySelector('.save-button');

  editButton.addEventListener('click', () => {
    contentText.style.display = 'none';
    contentEdit.style.display = 'block';
    saveButton.style.display = 'block';
    contentEdit.focus();
  });

 saveButton.addEventListener('click', () => {
    contentText.style.display = 'block';
    contentEdit.style.display = 'none';
    saveButton.style.display = 'none';
    
  });