(function () {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function (k) {
      // if (elements[k].name === "honeypot") {
      //   honeypot = elements[k].value;
      //   return false;
      // }
      return true;
    }).map(function (k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter(function (item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
    // we are submitting via xhr below

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });
    // we are submitting via xhr below

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return { data: formData };
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    const loading = document.getElementById('loading-message-sending');
    const ready = document.getElementById('loading-message-ready');
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    event.preventDefault();
        ready.style.display = "none";
    loading.style.display = "block";
    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var formElements = form.querySelector(".form-elements")
        loading.style.display = "none";
        ready.style.display = "block";
        form.reset();
        enableAllButtons(form);
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
  function enableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  }
})();