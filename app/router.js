import EmberRouter from '@ember/routing/router';
import config from 'front-end/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('playground', { path: '/', resetNamespace: true }, function () {
    this.route('index', { path: '' });
  });
  this.route('user', { path: '/user', resetNamespace: true }, function () {
    this.route('new', { path: '/new' });
  });
});
