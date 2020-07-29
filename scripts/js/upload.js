    var droppedFiles;
    var isAdvancedUpload = true;
 
 (function (document, window, index) {
          // auto upload image on file upload
 
          // feature detection for drag&drop upload
          isAdvancedUpload = function () {
             var div = document.createElement('div');
             return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
          }();
 
          if (isAdvancedUpload)
          {
              var form = document.getElementById("drag_files");
              var input = form.querySelector('input[type="file"]');
 
              // needed for ajax upload
              var ajaxFlag = document.createElement('input');
              ajaxFlag.setAttribute('type', 'hidden');
              ajaxFlag.setAttribute('name', 'ajax');
              ajaxFlag.setAttribute('value', 1);
              form.appendChild(ajaxFlag);
 
              ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                  form.addEventListener(event, function (e) {
                      // preventing the unwanted behaviours
                      e.preventDefault();
                      e.stopPropagation();
                  });
              });
 
              ['dragover', 'dragenter'].forEach(function (event) {
                  form.addEventListener(event, function () {
                      form.classList.add('dragover');
                  });
              });
 
              ['dragleave', 'dragend', 'drop'].forEach(function (event) {
                  form.addEventListener(event, function () {
                      form.classList.remove('dragover');
                  });
              });
 
              form.addEventListener('drop', function (e) {
                  droppedFiles = e.dataTransfer.files; // the files that were dropped
 
                  if (droppedFiles.length > 0)
                  {
                      form.querySelector(".drag-files-label").innerHTML = droppedFiles[0].name;
                      var event = document.createEvent('HTMLEvents');
                      event.initEvent('submit', true, false);
                      form.dispatchEvent(event);
                  }
              });
 
              form.addEventListener('submit', function (e) {
                  if (form.classList.contains('uploading'))
                      return false;
 
                  form.classList.add('uploading');
                  form.classList.remove('is-error');
 
                  if (isAdvancedUpload) // ajax file upload for modern browsers
                  {
                      e.preventDefault();
 
                      // gathering the form data
                      var ajaxData = new FormData(form);
                      if (droppedFiles) {
                          console.log(droppedFiles.length);
                          Array.prototype.forEach.call(droppedFiles, function (file) {
                              ajaxData.append(input.getAttribute('name'), file);
                          });
                      }
 
                      // ajax request
                      var ajax = new XMLHttpRequest();
                      ajax.open(form.getAttribute('method'), form.getAttribute('action'), true);
 
                      ajax.onload = function () {
                          console.log('ajax onload');
                          form.classList.remove('uploading');
                          if (ajax.status >= 200 && ajax.status < 400) {
                             console.log('win');
                          }
                          else {
                              console.log('whoops');
                              alert('Error. Please, contact the webmaster!');
                          }
                      };
 
                      ajax.send(ajaxData);
                  }
              });
          }
     }(document, window, 0));
 

  