'use strict';

var DPR_convert_mod = ( function () {

function getSelected() {
  var txt = '';
  if (window.getSelection) {
    txt = window.getSelection();
  }
  else if (document.getSelection)  {
    txt = document.getSelection();
  }
  else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  return txt;
}

DPR_G.G_oldConvert = '';

function convert(check,lower)
{
  var spell = document.getElementById('cinput').value;

  if (check && spell == DPR_G.G_oldConvert)
    return;
  DPR_G.G_oldConvert = spell;

  var inScript = document.getElementById('cinform').selectedIndex
  var outScript = document.getElementById('coutform').selectedIndex

  appInsights.trackEvent({ name: 'DPR_convert_mod.convert',  properties: { inScript, outScript, length: spell && spell.length }});

  switch(inScript) {
    case 0:
      switch(outScript) {
        case 1:
          spell = DPR_translit_mod.toVel(spell);
          break;
        case 2:
          spell = DPR_translit_mod.toThai(spell);
          break;
        case 3:
          spell = DPR_translit_mod.toDeva(spell);
          break;
        case 4:
          spell = DPR_translit_mod.toMyanmar(spell);
          break;
        case 5:
          spell = DPR_translit_mod.toSin(spell);
          break;
        case 6:
          spell = DPR_translit_mod.toBengali(spell);
          break;
        case 7:
          spell = DPR_translit_mod.toTelugu(spell);
          break;
      }
      break;
    case 1:
      spell = DPR_translit_mod.toUni(spell);
      switch(outScript) {
        case 0:
          break;
        case 2:
          spell = DPR_translit_mod.toThai(spell);
          break;
        case 3:
          spell = DPR_translit_mod.toDeva(spell);
          break;
        case 4:
          spell = DPR_translit_mod.toMyanmar(spell);
          break;
        case 5:
          spell = DPR_translit_mod.toSin(spell);
          break;
        case 6:
          spell = DPR_translit_mod.toBengali(spell);
          break;
        case 7:
          spell = DPR_translit_mod.toTelugu(spell);
          break;
      }
      break;
    case 2: // from Thai
      spell = DPR_translit_mod.fromThai(spell);
      switch(outScript) {
        case 0:
          break;
        case 1:
          spell = DPR_translit_mod.toVel(spell);
          break;
        case 3:
          spell = DPR_translit_mod.toDeva(spell);
          break;
        case 4:
          spell = DPR_translit_mod.toMyanmar(spell);
          break;
        case 5:
          spell = DPR_translit_mod.toSin(spell);
          break;
        case 6:
          spell = DPR_translit_mod.toBengali(spell);
          break;
        case 7:
          spell = DPR_translit_mod.toTelugu(spell);
          break;
      }
      break;
    case 5: // from Sinhala
      spell = DPR_translit_mod.fromSin(spell);
      switch(outScript) {
        case 0:
          break;
        case 1:
          spell = DPR_translit_mod.toVel(spell);
          break;
        case 2:
          spell = DPR_translit_mod.toThai(spell);
          break;
        case 3:
          spell = DPR_translit_mod.toDeva(spell);
          break;
        case 4:
          spell = DPR_translit_mod.toMyanmar(spell);
          break;
        case 6:
          spell = DPR_translit_mod.toBengali(spell);
          break;
        case 7:
          spell = DPR_translit_mod.toTelugu(spell);
          break;
      }
      break;
  }
  if(lower)
    spell = spell.toLowerCase();
  document.getElementById('coutput').value = spell;
}



function changeConversion(inout)
{
  var ii = document.getElementById('cinform').selectedIndex;
  var oi = document.getElementById('coutform').selectedIndex;
  if(ii == oi) {
    if(inout == 1) {
      if(ii == 0)
        document.getElementById('coutform').selectedIndex = 1;
      else
        document.getElementById('coutform').selectedIndex = 0;
    }
    else {
      if(oi == 0)
        document.getElementById('cinform').selectedIndex = 1;
      else
        document.getElementById('cinform').selectedIndex = 0;
    }
  }

  convert();
}
function clearboth()
{
  document.getElementById('cinput').value = '';
  document.getElementById('coutput').value = '';
}

function sendtoconvert(data,shift)
{
  appInsights.trackEvent({ name: 'DPR_convert_mod.sendtoconvert',  properties: { }});

  data = data.replace(/” ”/g, '”');
  data = data.replace(/’ ’/g, '’');
  data = data.replace(/\u00B7/g, '\'');
  data = data.replace(/\u00B4/g, '\"');
  data = data.replace(/ M /g, ' ');
  data = data.replace(/ V /g, ' ');
  data = data.replace(/ P /g, ' ');
  data = data.replace(/ T /g, ' ');
  data = data.replace(/♦ */g, '');
  data = data.replace(/ VAR /g, ' ');
  data = data.replace(/  *,/g, ',')
  data = data.replace(/\.\.+/g, '.')

  moveFrame(2)
  document.getElementById('cinform').selectedIndex = 0;
  document.getElementById('coutform').selectedIndex = 1;
  document.getElementById('coutput').value = '';
  document.getElementById('cinput').value = data;
  convert();
}

function sendtoPad(data,shift)
{
  appInsights.trackEvent({ name: 'DPR_convert_mod.sendtoPad',  properties: { }});

  moveFrame(3)

  data = data.replace(/\t/g, ' ');
  data = data.replace(/” ”/g, '”');
  data = data.replace(/’ ’/g, '’');
  data = data.replace(/\u00B7/g, '\'');
  data = data.replace(/\u00B4/g, '\"');
  if(DPR_G.DPR_prefs['showPagesFull']) {
    data = data.replace(/ *[MVPT]\.[0-9]+\.[0-9]+/g, '');
  }
  else{
    data = data.replace(/ *[MVPT]([^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶA-Za-z])/g, "$1");
    data = data.replace(/ *[MVPT]$/g, "");
  }
  data = data.replace(/♦ */g, '');
  data = data.replace(/VAR/g, ' ');
  data = data.replace(/  *,/g, ',')
  data = data.replace(/\.\.\. pe \.\.\./g, '… pe …')
  data = data.replace(/\.\.+/g, '.')
  data = data.replace(/  +/g, ' ')

  document.getElementById('pad').value = (shift?document.getElementById('pad').value:'') + data + '\n';
}

function clearPad() {

  if(confirm('Are you sure you want to erase all text from the text pad?')) document.getElementById('pad').value = '';
}

function savePad() {
  appInsights.trackEvent({ name: 'DPR_convert_mod.savePad',  properties: { }});

  var data = document.getElementById('pad').value;
  file = DPR_io_mod.fileSaveDialog('Choose a location to export the text');
//  file = file.replace(/\\/g,'/');
  if(file == '') {
    sendAlertFlash('You must enter a file name', 'red');
    return;
  }

  if(DPR_io_mod.writeExtFile(file, data))
    sendAlertFlash('Data saved to '+file, 'green');
  else {
    sendAlertFlash('Error saving file', 'red');
  }
}

return {
changeConversion : changeConversion,
clearPad : clearPad,
clearboth : clearboth,
convert : convert,
savePad : savePad,
sendtoPad : sendtoPad,
sendtoconvert : sendtoconvert
}
})()
