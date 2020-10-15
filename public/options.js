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

// Saves option to chrome.storage
function saveOptions() {
  var wchLoginApiGateway = document.getElementById('wchLoginApiGateway').value;
  chrome.storage.sync.set({
    wchLoginApiGateway: wchLoginApiGateway
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores wchLoginApiGateway state using the preferences stored in chrome.storage.
function restoreOptions() {
  // default wchLoginApiGateway value = 'https://content-us-1.content-cms.com/api/'.
  chrome.storage.sync.get({
    wchLoginApiGateway: 'https://content-us-1.content-cms.com/api/'
  }, function(items) {
    document.getElementById('wchLoginApiGateway').value = items.wchLoginApiGateway;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
