import 'jasmine-core/lib/jasmine-core/boot.js';
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import './global-jasmine';

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';

// Requires 'zone.js/dist/proxy.js' and 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
 
// stuff to test
import './app/app.component.spec.ts';

jasmine.getEnv().configure({random: false});
bootstrap();

function bootstrap () {
  // @ts-ignore
  if (window.jasmineRef) {
    location.reload();
    return;
  } else {
      // @ts-ignore
    window.onload();
      // @ts-ignore
    window.jasmineRef = jasmine.getEnv();
  }

  // First, initialize the Angular testing environment.
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
}
