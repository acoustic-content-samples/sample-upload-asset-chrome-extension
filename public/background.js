'use strict';
/*******************************************************************************
 * Copyright IBM Corp. 2016

 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

var wchLoginApiGateway;
var baseTenantUrl;
const wchLoginEndpoint = '/login/v1/basicauth';
const resourceService = '/authoring/v1/resources';
const assetService = '/authoring/v1/assets';
// Content Hub blueid username and password - replace these or add code to get these from inputs
const username = '';
const password = '';

function wchLogin() {
  var xhr = new XMLHttpRequest();
  var url = wchLoginApiGateway + wchLoginEndpoint;
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
  xhr.send(null);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        baseTenantUrl = xhr.getResponseHeader('x-ibm-dx-tenant-base-url');

        createContextMenuEntry();
      } else {
        notify('Error occurred logging in.');
      }
    }
  };
}

function notify(message) {
  chrome.notifications.create('wch-notification', {
    title: 'Watson Content Hub',
    type: 'basic',
    message: message,
    iconUrl: chrome.runtime.getURL('images/ico-48.png')
  });
}

function wchCreateAssetFromResource(resourceId, fileName) {
  var xhr = new XMLHttpRequest();
  var params = 'analyze=true&autocurate=true&notify=false';
  xhr.open('POST', baseTenantUrl + assetService + '?' + params, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({
    name: fileName,
    resource: resourceId,
    description: ''
  }));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        notify('Asset uploaded');
      } else {
        notify('Error occurred creating asset.');
      }
    }
  };
}

function wchCreateResource(imageData, fileName, contentType) {
  var xhr = new XMLHttpRequest();
  var params = 'name=' + encodeURIComponent(fileName);
  xhr.open('POST', baseTenantUrl + resourceService + '?' + params, true);
  xhr.setRequestHeader('Content-type', contentType);
  xhr.send(imageData);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        wchCreateAssetFromResource(JSON.parse(xhr.responseText).id, fileName);
      } else {
        notify('Error occurred creating resource.');
      }
    }
  };
}

function getImageData(srcUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', srcUrl, true);
  xhr.responseType = 'blob';
  xhr.send(null);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var fileName = xhr.responseURL.replace(/^.*[\\\/]/, '');
        var contentType = xhr.getResponseHeader('content-type');
        wchCreateResource(xhr.response, fileName, contentType);
      } else {
        notify('Error occurred retrieving image data.');
      }
    }
  };
}

function contextMenuEntryClickHandler(e) {
  if (e.mediaType === 'image') {
    getImageData(e.srcUrl);
  }
}

function createContextMenuEntry() {
  chrome.contextMenus.create({
    'title': 'Upload asset to Watson Content Hub',
    'contexts': ['image'],
    'onclick': contextMenuEntryClickHandler
  });
}

chrome.storage.sync.get({
  wchLoginApiGateway: 'https://my.digitalexperience.ibm.com/api/',
}, function(items) {
  wchLoginApiGateway = items.wchLoginApiGateway;

  wchLogin();
});

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.wchLoginApiGateway.newValue !== changes.wchLoginApiGateway.oldValue) {
    wchLoginApiGateway = changes.wchLoginApiGateway.newValue;

    wchLogin();
  }
});
