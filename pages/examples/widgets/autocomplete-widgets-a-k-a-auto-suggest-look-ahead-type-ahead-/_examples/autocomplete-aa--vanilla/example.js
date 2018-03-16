var defaultOptions = {
  i18n: {
    selected: '#{value}. Selected #{selected} of #{total}.',
    complete: 'You have selected #{value}',
    found: '#{count} suggestions found. Use up or down key to select.',
    notfound: 'No suggestions found.'
  },
  render: {
    ul: function() {
      var el = document.createElement('ul');
      el.classList.add('autocomplete--suggestions');
      return el;
    },
    li: function(data) {
      var el = document.createElement('li');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('role', 'button');
      el.innerText = data;
      return el;
    }
  }
};

function autocomplete(inputEl, listFromValue, prefs) {
  var opened = false;
  var liveEl, suggestionsEl;
  var initialised = false;
  var completed = false;
  var selected = -1;
  var savedValue;
  
  if (!prefs) { prefs = {} }
  var options = {
    i18n: Object.assign({}, defaultOptions.i18n, prefs.i18n || {}),
    render: Object.assign({}, defaultOptions.render, prefs.render || {})
  };

  inputEl.addEventListener('focus', handleInputFocus, false);
  
  return {
    destroy: destroy,
    close: close
  };
  
  function start() {
    if (initialised) return;
    console.log('start');
    
    // create live region to indicate results
    liveEl = document.createElement('div');
    liveEl.setAttribute('role', 'status');
    liveEl.setAttribute('aria-live', 'assertive');
    liveEl.setAttribute('aria-relevant', 'additions');
    // hide for all but screenreader
    liveEl.style.position = 'absolute';
    liveEl.style.pointerEvents = 'none';
    liveEl.style.opacity = '0';
    liveEl.style.left = '-9999px';
    document.body.appendChild(liveEl);
    
    // create list of suggestions to show
    suggestionsEl = options.render.ul();
    suggestionsEl.style.display = 'none'; // hide by default
    if (inputEl.nextSibling) {
      inputEl.parentNode.insertBefore(suggestionsEl, inputEl.nextSibling);
    } else {
      inputEl.parentNode.appendChild(suggestionsEl);
    }
    
    // listen to input events
    inputEl.addEventListener('change', handleInputChange, false);
    inputEl.addEventListener('input', handleInput, false);
    inputEl.addEventListener('keydown', handleKey, false);
    document.addEventListener('focusin', handleDocumentFocus, false);
    document.addEventListener('click', handleDocumentClick, false);
    
    initialised = true;
  }
  
  function stop() {
    if (!initialised) return;
    console.log('stop');

    inputEl.removeEventListener('change', handleInputChange, false);
    inputEl.removeEventListener('input', handleInput, false);
    inputEl.removeEventListener('keydown', handleKey, false);
    document.removeEventListener('focusin', handleDocumentFocus, false);
    document.removeEventListener('click', handleDocumentClick, false);

    liveEl.parentNode.removeChild(liveEl);
    suggestionsEl.parentNode.removeChild(suggestionsEl);

    initialised = false;
  }
  
  function destroy() {
    close();
    stop();
    inputEl.removeEventListener('focus', handleInputFocus, false);
  }
  
  // interation event handler
  
  function handleInputFocus(event) {
    console.log('handleInputFocus');
    start();
    // select all text on focus
    selectAll();
    if (completed) {
      return;
    }
    updateSuggestions();
  }
  
  function handleInputChange(event) {
    if (savedValue !== event.target.value) {
      console.log('handleInputChange');
      completed = false;
    }
  };
  
  function handleInput(event) {
    if (savedValue !== event.target.value) {
      console.log('handleInput');
      completed = false;
      updateSuggestions();
    }
  }
  
  function handleDocumentClick(event) {
    console.log('handleDocumentClick');
    if (containsElement(inputEl, event.target)) {
      return;
    }
    if (event.target.parentNode === suggestionsEl) {
      setValueOfItem(event.target);
      complete();
    } else {
      stop();
    }
    close();
  }
  
  function handleDocumentFocus(event) {
    console.log('handleDocumentFocus');
    if (!containsElement(inputEl, event.target) && !containsElement(suggestionsEl, event.target)) {
      close();
      stop();
    }
  }
    
  function handleKey(event) {
    console.log('handleKey');
    if (!opened) {
      return;
    }
    switch (event.keyCode) {
      case 40: // down
        event.preventDefault();
        event.stopPropagation();
        selectSuggestion(1);
        break;
      case 38: // up
        event.preventDefault();
        event.stopPropagation();
        selectSuggestion(-1);
        break;
      case 27: // escape
        event.preventDefault();
        event.stopPropagation();
        inputEl.value = savedValue;
        inputEl.focus();
        inputEl.select();
        close();
        break;
      case 13: // enter
        event.preventDefault();
        event.stopPropagation();
        complete();
        break;
      case 9: // tab
        complete();
        break;
    }
  }
  
  
  
  function selectSuggestion(value) {
    var inputEls = suggestionsEl.children;
    selected = (selected + value + inputEls.length) % inputEls.length;
    var text;
    for (var i = 0; i < inputEls.length; i++) {
      if (i === selected) {
        inputEls[i].classList.add('is-selected');
        text = setValueOfItem(inputEls[i])
      } else {
        inputEls[i].classList.remove('is-selected');
      }
    }
    selectAll();
    say(fillString(options.i18n.selected, {
      selected: selected + 1,
      total: inputEls.length,
      value: text
    }));
  }
  
  function setValueOfItem(itemEl) {
    var text = itemEl.innerText;
    inputEl.value = text;
    return text;
  }
  
  function complete() {
    console.log('complete');
    savedValue = inputEl.value;
    completed = true;
    say(fillString(options.i18n.complete, {
      value: inputEl.value
    }));
    inputEl.focus();
    selectAll();
    setTimeout(function() {
      close();
    }, 0);
  }
    
  function open() {
    console.log('open');
    opened = true;
    suggestionsEl.style.display = '';
  }
  
  function close() {
    console.log('close');
    opened = false;
    selected = -1;
    suggestionsEl.style.display = 'none';
  }
  
  var sayTimeout;
  function say(message, delay) {
    clearTimeout(sayTimeout);
    sayTimeout = setTimeout(function() {
      var children = liveEl.children;
      for (var i = 0; i < children; i++) {
        children[i].style.display = 'none';
      }
      liveEl.insertAdjacentHTML('beforeend', '<p>' + message + '</p>');
    }, delay || 0);
  }
  
  function updateSuggestions() {
    var val = inputEl.value;
    savedValue = val;
    listFromValue(val, function(list) {
      var index = 0;
      // render list
      suggestionsEl.innerHTML = '';
      list.forEach(function(data) {
        index++;
        var liEl = options.render.li(data);
        suggestionsEl.appendChild(liEl);
      });
      if (list.length) {
        open();
        say(fillString(options.i18n.found, {
          count: list.length,
          value: val
        }), 1500);
      } else {
        close();
        say(fillString(options.i18n.notfound, {
          count: 0,
          value: val
        }), 1500);
      }
    });
  }
  
  
  function selectAll() {
    var start = 0;
    var end = inputEl.value.length;
    inputEl.select();
    setTimeout(function() {
      inputEl.selectionStart = start;
      inputEl.selectionEnd = end;
      inputEl.setSelectionRange(start, end);
    }, 1);
  }
}


// helpers

function fillString(str, data) {
  if (typeof str === 'function') {
    return str(data);
  }
  for (var key in data) {
    str = str.replace(new RegExp('#\{' + key + '\}', 'g'), data[key]);
  }
  return str;
}

function containsElement(container, element) {
  while (element) {
    if (container === element) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
}



// Demo Code:


autocomplete(document.getElementById('autocomplete'), function(value, cb) {
  cb(values.filter(function(v) {
    return v.toLowerCase().indexOf(value.toLowerCase()) === 0;
  }));
});


var values = ["Aarau","Aarberg","Aarburg","Adliswil","Aesch (BL)","Affoltern am Albis","Agno","Aigle","Allschwil","Altdorf (UR)","Altstätten","Amriswil","Appenzell","Arbon","Arlesheim","Arosa","Arth","Ascona","Aubonne","Avenches","Baar","Baden","Basel","Bassersdorf","Bellinzona","Belp","Bern","Beromünster","Biasca","Biel/Bienne","Binningen","Birsfelden","Bischofszell","Boudry","Bourg-Saint-Pierre","Bremgarten (AG)","Brig-Glis","Brugg","Buchs (SG)","Bülach","Büren a.A.","Bulle","Burgdorf","Bussigny","Carouge (GE)","Cham","Châtel-Saint-Denis","Chêne-Bougeries","Chiasso","Chur","Conthey","Coppet","Cossonay","Croglio","Crissier","Cudrefin","Cully","Davos*","Delémont","Diessenhofen","Dietikon","Dübendorf","Ebikon","Échallens","Ecublens (VD)","Eglisau","Einsiedeln","Elgg","Emmen","Erlach","Estavayer-le-Lac","Flawil","Frauenfeld","Freienbach","Fribourg","Geneva","Gland","Glarus","Glarus Nord*","Gordola","Gossau (SG)","Grandcour","Grandson","Greifensee","Grenchen","Grüningen","Gruyères","Herisau","Hermance","Hinwil","Horgen","Horw","Huttwil","Ilanz","Illnau-Effretikon","Interlaken","Ittigen","Kaiserstuhl (AG)","Klingnau","Kloten","Köniz","Kreuzlingen","Kriens","Küsnacht (ZH)","La Chaux-de-Fonds","La Neuveville","La Sarraz","La Tour-de-Peilz","La Tour-de-Trême","Lachen (SZ)","Lancy","Langenthal","Laufen (BL)","Laufenburg","Laupen","Lausanne","Le Grand-Saconnex","Le Landeron","Le Locle","Lenzburg","Les Clées","Leuk","Lichtensteig","Liestal","Locarno","Losone","Lugano","Lutry","Lucerne","Lyss","Männedorf","Maienfeld","Martigny","Meilen","Mellingen","Mendrisio","Meyrin","Möhlin","Monthey","Montreux","Morcote","Morges","Moudon","Moutier","Münchenbuchsee","Münchenstein","Münsingen","Muri bei Bern","Murten","Muttenz","Neuchâtel","Neuhausen am Rheinfall ","Neunkirch","Nidau","Nyon","Oberwil (BL)","Oftringen","Olten","Onex","Opfikon","Orbe","Orsières","Ostermundigen","Payerne","Peseux","Pfäffikon","Plan-les-Ouates","Porrentruy","Pratteln","Prilly","Pully","Rapperswil-Jona","Regensberg","Regensdorf","Reinach (BL)","Renens (VD)","Rheinau","Rheineck","Rheinfelden","Richterswil","Riehen","Risch","Riva San Vitale","Rolle","Romainmôtier","Romanshorn","Romont (FR)","Rorschach","Rue","Rüti (ZH)","Saillon","Saint-Maurice","Saint-Prex","Saint-Ursanne","Sargans","Sarnen","Schaffhausen","Schlieren","Schwyz","Sembrancher","Sempach","Sierre","Sion","Solothurn","Spiez","Spreitenbach","Splügen","St. Gallen","St. Moritz","Stäfa","Stans","Steckborn","Steffisburg","Steinhausen","Suhr","Stein am Rhein","Sursee","Thalwil","Thônex","Thun","Thusis","Unterseen","Urdorf","Uster","Uznach","Uzwil","Val-de-Travers","Valangin","Vernier","Versoix","Vevey","Veyrier","Villeneuve","Villars-sur-Glâne","Visp","Volketswil","Wädenswil","Waldenburg","Walenstadt","Wallisellen","Wangen an der Aare","Werdenberg","Weinfelden","Wettingen","Wetzikon (ZH)","Wiedlisbach","Wil (SG)","Willisau","Winterthur","Wohlen (AG)","Yverdon-les-Bains","Zermatt","Zofingen","Zollikofen","Zollikon","Zug","Zürich","Bad Zurzach"]