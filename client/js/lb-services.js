// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__findById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__destroyById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__updateById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__get__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Users/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__create__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__delete__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__count__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Counts accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#create
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#createMany
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Users",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#exists
         * @methodOf lbServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Users/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Users/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#find
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Users",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findOne
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Users/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#updateAll
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Users/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#deleteById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Users/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#count
         * @methodOf lbServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Users/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#createChangeStream
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Users/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#login
         * @methodOf lbServices.User
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Users/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#logout
         * @methodOf lbServices.User
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Users/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#confirm
         * @methodOf lbServices.User
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Users/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#resetPassword
         * @methodOf lbServices.User
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Users/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.User#modelName
    * @propertyOf lbServices.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Student
 * @header lbServices.Student
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Student` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Student",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Students/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__findById__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__updateById__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Student.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Students/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Student.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/Students/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents.findById() instead.
        "prototype$__findById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents.destroyById() instead.
        "prototype$__destroyById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Student.studentParents.updateById() instead.
        "prototype$__updateById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Student.busSubscriptions() instead.
        "prototype$__get__busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "GET"
        },

        // INTERNAL. Use Student.busSubscriptions.create() instead.
        "prototype$__create__busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "POST"
        },

        // INTERNAL. Use Student.busSubscriptions.update() instead.
        "prototype$__update__busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "PUT"
        },

        // INTERNAL. Use Student.busSubscriptions.destroy() instead.
        "prototype$__destroy__busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__get__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Queries accessTokens of Student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Students/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__create__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Students/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__delete__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Students/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$__count__accessTokens
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Counts accessTokens of Student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Students/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents() instead.
        "prototype$__get__studentParents": {
          isArray: true,
          url: urlBase + "/Students/:id/studentParents",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents.create() instead.
        "prototype$__create__studentParents": {
          url: urlBase + "/Students/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Student.studentParents.destroyAll() instead.
        "prototype$__delete__studentParents": {
          url: urlBase + "/Students/:id/studentParents",
          method: "DELETE"
        },

        // INTERNAL. Use Student.studentParents.count() instead.
        "prototype$__count__studentParents": {
          url: urlBase + "/Students/:id/studentParents/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#create
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Students",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#createMany
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Students",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#upsert
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Students",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#exists
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Students/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#findById
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Students/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#find
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Students",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#findOne
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Students/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#updateAll
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Students/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#deleteById
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Students/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#count
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Students/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#prototype$updateAttributes
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Students/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#createChangeStream
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Students/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#login
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Students/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#logout
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Students/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#confirm
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Students/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#resetPassword
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Students/reset",
          method: "POST"
        },

        // INTERNAL. Use School.students.findById() instead.
        "::findById::School::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.students.destroyById() instead.
        "::destroyById::School::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.students.updateById() instead.
        "::updateById::School::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.students() instead.
        "::get::School::students": {
          isArray: true,
          url: urlBase + "/Schools/:id/students",
          method: "GET"
        },

        // INTERNAL. Use School.students.create() instead.
        "::create::School::students": {
          url: urlBase + "/Schools/:id/students",
          method: "POST"
        },

        // INTERNAL. Use School.students.createMany() instead.
        "::createMany::School::students": {
          isArray: true,
          url: urlBase + "/Schools/:id/students",
          method: "POST"
        },

        // INTERNAL. Use School.students.destroyAll() instead.
        "::delete::School::students": {
          url: urlBase + "/Schools/:id/students",
          method: "DELETE"
        },

        // INTERNAL. Use School.students.count() instead.
        "::count::School::students": {
          url: urlBase + "/Schools/:id/students/count",
          method: "GET"
        },

        // INTERNAL. Use Class.students.findById() instead.
        "::findById::Class::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.students.destroyById() instead.
        "::destroyById::Class::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.students.updateById() instead.
        "::updateById::Class::students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.students() instead.
        "::get::Class::students": {
          isArray: true,
          url: urlBase + "/Classes/:id/students",
          method: "GET"
        },

        // INTERNAL. Use Class.students.create() instead.
        "::create::Class::students": {
          url: urlBase + "/Classes/:id/students",
          method: "POST"
        },

        // INTERNAL. Use Class.students.createMany() instead.
        "::createMany::Class::students": {
          isArray: true,
          url: urlBase + "/Classes/:id/students",
          method: "POST"
        },

        // INTERNAL. Use Class.students.destroyAll() instead.
        "::delete::Class::students": {
          url: urlBase + "/Classes/:id/students",
          method: "DELETE"
        },

        // INTERNAL. Use Class.students.count() instead.
        "::count::Class::students": {
          url: urlBase + "/Classes/:id/students/count",
          method: "GET"
        },

        // INTERNAL. Use StudentParent.student() instead.
        "::get::StudentParent::student": {
          url: urlBase + "/StudentParents/:id/student",
          method: "GET"
        },

        // INTERNAL. Use Attendance.student() instead.
        "::get::Attendance::student": {
          url: urlBase + "/Attendances/:id/student",
          method: "GET"
        },

        // INTERNAL. Use BusSubscription.student() instead.
        "::get::BusSubscription::student": {
          url: urlBase + "/BusSubscriptions/:id/student",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Student#getCurrent
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Students" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Student#updateOrCreate
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Student#update
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Student#destroyById
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Student#removeById
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Student#getCachedCurrent
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Student#login} or
         * {@link lbServices.Student#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Student instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Student#isAuthenticated
         * @methodOf lbServices.Student
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Student#getCurrentId
         * @methodOf lbServices.Student
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Student#modelName
    * @propertyOf lbServices.Student
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Student`.
    */
    R.modelName = "Student";


        /**
         * @ngdoc method
         * @name lbServices.Student#school
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Student::school"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student#class
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Student::class"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Student.studentParents
     * @header lbServices.Student.studentParents
     * @object
     * @description
     *
     * The object `Student.studentParents` groups methods
     * manipulating `StudentParent` instances related to `Student`.
     *
     * Call {@link lbServices.Student#studentParents Student.studentParents()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Student#studentParents
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Queries studentParents of Student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::get::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#count
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Counts studentParents of Student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.studentParents.count = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::count::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#create
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Creates a new instance in studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.create = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::create::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#createMany
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Creates a new instance in studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.createMany = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::createMany::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#destroyAll
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Deletes all studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.studentParents.destroyAll = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::delete::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#destroyById
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Delete a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.studentParents.destroyById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::destroyById::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#findById
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Find a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.findById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::findById::Student::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.studentParents#updateById
         * @methodOf lbServices.Student.studentParents
         *
         * @description
         *
         * Update a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.updateById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::updateById::Student::studentParents"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Student.busSubscriptions
     * @header lbServices.Student.busSubscriptions
     * @object
     * @description
     *
     * The object `Student.busSubscriptions` groups methods
     * manipulating `BusSubscription` instances related to `Student`.
     *
     * Call {@link lbServices.Student#busSubscriptions Student.busSubscriptions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Student#busSubscriptions
         * @methodOf lbServices.Student
         *
         * @description
         *
         * Fetches hasOne relation busSubscriptions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R.busSubscriptions = function() {
          var TargetResource = $injector.get("BusSubscription");
          var action = TargetResource["::get::Student::busSubscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.busSubscriptions#create
         * @methodOf lbServices.Student.busSubscriptions
         *
         * @description
         *
         * Creates a new instance in busSubscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R.busSubscriptions.create = function() {
          var TargetResource = $injector.get("BusSubscription");
          var action = TargetResource["::create::Student::busSubscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.busSubscriptions#createMany
         * @methodOf lbServices.Student.busSubscriptions
         *
         * @description
         *
         * Creates a new instance in busSubscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R.busSubscriptions.createMany = function() {
          var TargetResource = $injector.get("BusSubscription");
          var action = TargetResource["::createMany::Student::busSubscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.busSubscriptions#destroy
         * @methodOf lbServices.Student.busSubscriptions
         *
         * @description
         *
         * Deletes busSubscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.busSubscriptions.destroy = function() {
          var TargetResource = $injector.get("BusSubscription");
          var action = TargetResource["::destroy::Student::busSubscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Student.busSubscriptions#update
         * @methodOf lbServices.Student.busSubscriptions
         *
         * @description
         *
         * Update busSubscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R.busSubscriptions.update = function() {
          var TargetResource = $injector.get("BusSubscription");
          var action = TargetResource["::update::Student::busSubscriptions"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Staff
 * @header lbServices.Staff
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Staff` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Staff",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Staffs/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__findById__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Staffs/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Staffs/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__updateById__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Staffs/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Staff.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Staffs/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Staff.subject() instead.
        "prototype$__get__subject": {
          url: urlBase + "/Staffs/:id/subject",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__get__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Queries accessTokens of Staff.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Staffs/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__create__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Staffs/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__delete__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Staffs/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$__count__accessTokens
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Counts accessTokens of Staff.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Staffs/:id/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#create
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Staffs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#createMany
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Staffs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#upsert
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Staffs",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#exists
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Staffs/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#findById
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Staffs/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#find
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Staffs",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#findOne
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Staffs/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#updateAll
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Staffs/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#deleteById
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Staffs/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#count
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Staffs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#prototype$updateAttributes
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Staffs/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#createChangeStream
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Staffs/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#login
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Staffs/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#logout
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Staffs/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#confirm
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Staffs/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#resetPassword
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Staffs/reset",
          method: "POST"
        },

        // INTERNAL. Use School.staffs.findById() instead.
        "::findById::School::staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.staffs.destroyById() instead.
        "::destroyById::School::staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.staffs.updateById() instead.
        "::updateById::School::staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.staffs() instead.
        "::get::School::staffs": {
          isArray: true,
          url: urlBase + "/Schools/:id/staffs",
          method: "GET"
        },

        // INTERNAL. Use School.staffs.create() instead.
        "::create::School::staffs": {
          url: urlBase + "/Schools/:id/staffs",
          method: "POST"
        },

        // INTERNAL. Use School.staffs.createMany() instead.
        "::createMany::School::staffs": {
          isArray: true,
          url: urlBase + "/Schools/:id/staffs",
          method: "POST"
        },

        // INTERNAL. Use School.staffs.destroyAll() instead.
        "::delete::School::staffs": {
          url: urlBase + "/Schools/:id/staffs",
          method: "DELETE"
        },

        // INTERNAL. Use School.staffs.count() instead.
        "::count::School::staffs": {
          url: urlBase + "/Schools/:id/staffs/count",
          method: "GET"
        },

        // INTERNAL. Use Class.staff() instead.
        "::get::Class::staff": {
          url: urlBase + "/Classes/:id/staff",
          method: "GET"
        },

        // INTERNAL. Use Subject.staff() instead.
        "::get::Subject::staff": {
          url: urlBase + "/Subjects/:id/staff",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Staff#getCurrent
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Staffs" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Staff#updateOrCreate
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Staff#update
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Staff#destroyById
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Staff#removeById
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Staff#getCachedCurrent
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Staff#login} or
         * {@link lbServices.Staff#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Staff instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Staff#isAuthenticated
         * @methodOf lbServices.Staff
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Staff#getCurrentId
         * @methodOf lbServices.Staff
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Staff#modelName
    * @propertyOf lbServices.Staff
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Staff`.
    */
    R.modelName = "Staff";


        /**
         * @ngdoc method
         * @name lbServices.Staff#school
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Staff::school"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Staff#subject
         * @methodOf lbServices.Staff
         *
         * @description
         *
         * Fetches belongsTo relation subject.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        R.subject = function() {
          var TargetResource = $injector.get("Subject");
          var action = TargetResource["::get::Staff::subject"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Parent
 * @header lbServices.Parent
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Parent` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Parent",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Parents/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__findById__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__updateById__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Parent.studentParents.findById() instead.
        "prototype$__findById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents.destroyById() instead.
        "prototype$__destroyById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Parent.studentParents.updateById() instead.
        "prototype$__updateById__studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__get__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Queries accessTokens of Parent.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Parents/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__create__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Parents/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__delete__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Parents/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$__count__accessTokens
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Counts accessTokens of Parent.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Parents/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents() instead.
        "prototype$__get__studentParents": {
          isArray: true,
          url: urlBase + "/Parents/:id/studentParents",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents.create() instead.
        "prototype$__create__studentParents": {
          url: urlBase + "/Parents/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Parent.studentParents.destroyAll() instead.
        "prototype$__delete__studentParents": {
          url: urlBase + "/Parents/:id/studentParents",
          method: "DELETE"
        },

        // INTERNAL. Use Parent.studentParents.count() instead.
        "prototype$__count__studentParents": {
          url: urlBase + "/Parents/:id/studentParents/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#create
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Parents",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#createMany
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Parents",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#upsert
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Parents",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#exists
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Parents/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#findById
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Parents/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#find
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Parents",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#findOne
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Parents/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#updateAll
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Parents/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#deleteById
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Parents/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#count
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Parents/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#prototype$updateAttributes
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Parents/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#createChangeStream
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Parents/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#login
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Parents/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#logout
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Parents/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#confirm
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Parents/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#resetPassword
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Parents/reset",
          method: "POST"
        },

        // INTERNAL. Use StudentParent.parent() instead.
        "::get::StudentParent::parent": {
          url: urlBase + "/StudentParents/:id/parent",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Parent#getCurrent
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Parents" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Parent#updateOrCreate
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Parent#update
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Parent#destroyById
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Parent#removeById
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Parent#getCachedCurrent
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Parent#login} or
         * {@link lbServices.Parent#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Parent instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent#isAuthenticated
         * @methodOf lbServices.Parent
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent#getCurrentId
         * @methodOf lbServices.Parent
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Parent#modelName
    * @propertyOf lbServices.Parent
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Parent`.
    */
    R.modelName = "Parent";

    /**
     * @ngdoc object
     * @name lbServices.Parent.studentParents
     * @header lbServices.Parent.studentParents
     * @object
     * @description
     *
     * The object `Parent.studentParents` groups methods
     * manipulating `StudentParent` instances related to `Parent`.
     *
     * Call {@link lbServices.Parent#studentParents Parent.studentParents()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Parent#studentParents
         * @methodOf lbServices.Parent
         *
         * @description
         *
         * Queries studentParents of Parent.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::get::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#count
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Counts studentParents of Parent.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.studentParents.count = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::count::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#create
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Creates a new instance in studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.create = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::create::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#createMany
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Creates a new instance in studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.createMany = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::createMany::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#destroyAll
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Deletes all studentParents of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.studentParents.destroyAll = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::delete::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#destroyById
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Delete a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.studentParents.destroyById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::destroyById::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#findById
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Find a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.findById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::findById::Parent::studentParents"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Parent.studentParents#updateById
         * @methodOf lbServices.Parent.studentParents
         *
         * @description
         *
         * Update a related item by id for studentParents.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for studentParents
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R.studentParents.updateById = function() {
          var TargetResource = $injector.get("StudentParent");
          var action = TargetResource["::updateById::Parent::studentParents"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.School
 * @header lbServices.School
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `School` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "School",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Schools/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use School.staffs.findById() instead.
        "prototype$__findById__staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.staffs.destroyById() instead.
        "prototype$__destroyById__staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.staffs.updateById() instead.
        "prototype$__updateById__staffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/staffs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.students.findById() instead.
        "prototype$__findById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.students.destroyById() instead.
        "prototype$__destroyById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.students.updateById() instead.
        "prototype$__updateById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/students/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.classes.findById() instead.
        "prototype$__findById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.classes.destroyById() instead.
        "prototype$__destroyById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.classes.updateById() instead.
        "prototype$__updateById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.timetables() instead.
        "prototype$__get__timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "GET"
        },

        // INTERNAL. Use School.timetables.create() instead.
        "prototype$__create__timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "POST"
        },

        // INTERNAL. Use School.timetables.update() instead.
        "prototype$__update__timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "PUT"
        },

        // INTERNAL. Use School.timetables.destroy() instead.
        "prototype$__destroy__timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "DELETE"
        },

        // INTERNAL. Use School.libraries.findById() instead.
        "prototype$__findById__libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.libraries.destroyById() instead.
        "prototype$__destroyById__libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.libraries.updateById() instead.
        "prototype$__updateById__libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.staffs() instead.
        "prototype$__get__staffs": {
          isArray: true,
          url: urlBase + "/Schools/:id/staffs",
          method: "GET"
        },

        // INTERNAL. Use School.staffs.create() instead.
        "prototype$__create__staffs": {
          url: urlBase + "/Schools/:id/staffs",
          method: "POST"
        },

        // INTERNAL. Use School.staffs.destroyAll() instead.
        "prototype$__delete__staffs": {
          url: urlBase + "/Schools/:id/staffs",
          method: "DELETE"
        },

        // INTERNAL. Use School.staffs.count() instead.
        "prototype$__count__staffs": {
          url: urlBase + "/Schools/:id/staffs/count",
          method: "GET"
        },

        // INTERNAL. Use School.students() instead.
        "prototype$__get__students": {
          isArray: true,
          url: urlBase + "/Schools/:id/students",
          method: "GET"
        },

        // INTERNAL. Use School.students.create() instead.
        "prototype$__create__students": {
          url: urlBase + "/Schools/:id/students",
          method: "POST"
        },

        // INTERNAL. Use School.students.destroyAll() instead.
        "prototype$__delete__students": {
          url: urlBase + "/Schools/:id/students",
          method: "DELETE"
        },

        // INTERNAL. Use School.students.count() instead.
        "prototype$__count__students": {
          url: urlBase + "/Schools/:id/students/count",
          method: "GET"
        },

        // INTERNAL. Use School.classes() instead.
        "prototype$__get__classes": {
          isArray: true,
          url: urlBase + "/Schools/:id/classes",
          method: "GET"
        },

        // INTERNAL. Use School.classes.create() instead.
        "prototype$__create__classes": {
          url: urlBase + "/Schools/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use School.classes.destroyAll() instead.
        "prototype$__delete__classes": {
          url: urlBase + "/Schools/:id/classes",
          method: "DELETE"
        },

        // INTERNAL. Use School.classes.count() instead.
        "prototype$__count__classes": {
          url: urlBase + "/Schools/:id/classes/count",
          method: "GET"
        },

        // INTERNAL. Use School.libraries() instead.
        "prototype$__get__libraries": {
          isArray: true,
          url: urlBase + "/Schools/:id/libraries",
          method: "GET"
        },

        // INTERNAL. Use School.libraries.create() instead.
        "prototype$__create__libraries": {
          url: urlBase + "/Schools/:id/libraries",
          method: "POST"
        },

        // INTERNAL. Use School.libraries.destroyAll() instead.
        "prototype$__delete__libraries": {
          url: urlBase + "/Schools/:id/libraries",
          method: "DELETE"
        },

        // INTERNAL. Use School.libraries.count() instead.
        "prototype$__count__libraries": {
          url: urlBase + "/Schools/:id/libraries/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#create
         * @methodOf lbServices.School
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Schools",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#createMany
         * @methodOf lbServices.School
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Schools",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#upsert
         * @methodOf lbServices.School
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Schools",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#exists
         * @methodOf lbServices.School
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Schools/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#findById
         * @methodOf lbServices.School
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Schools/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#find
         * @methodOf lbServices.School
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Schools",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#findOne
         * @methodOf lbServices.School
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Schools/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#updateAll
         * @methodOf lbServices.School
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Schools/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#deleteById
         * @methodOf lbServices.School
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Schools/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#count
         * @methodOf lbServices.School
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Schools/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#prototype$updateAttributes
         * @methodOf lbServices.School
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Schools/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.School#createChangeStream
         * @methodOf lbServices.School
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Schools/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Student.school() instead.
        "::get::Student::school": {
          url: urlBase + "/Students/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Staff.school() instead.
        "::get::Staff::school": {
          url: urlBase + "/Staffs/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Class.school() instead.
        "::get::Class::school": {
          url: urlBase + "/Classes/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Admin.school() instead.
        "::get::Admin::school": {
          url: urlBase + "/Admins/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Subject.school() instead.
        "::get::Subject::school": {
          url: urlBase + "/Subjects/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Bus.school() instead.
        "::get::Bus::school": {
          url: urlBase + "/Buses/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Timetable.school() instead.
        "::get::Timetable::school": {
          url: urlBase + "/Timetables/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Noticeboard.school() instead.
        "::get::Noticeboard::school": {
          url: urlBase + "/Noticeboards/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Library.school() instead.
        "::get::Library::school": {
          url: urlBase + "/Libraries/:id/school",
          method: "GET"
        },

        // INTERNAL. Use StudentParent.school() instead.
        "::get::StudentParent::school": {
          url: urlBase + "/StudentParents/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Attendance.school() instead.
        "::get::Attendance::school": {
          url: urlBase + "/Attendances/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Exam.school() instead.
        "::get::Exam::school": {
          url: urlBase + "/Exams/:id/school",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.School#updateOrCreate
         * @methodOf lbServices.School
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.School#update
         * @methodOf lbServices.School
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.School#destroyById
         * @methodOf lbServices.School
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.School#removeById
         * @methodOf lbServices.School
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.School#modelName
    * @propertyOf lbServices.School
    * @description
    * The name of the model represented by this $resource,
    * i.e. `School`.
    */
    R.modelName = "School";

    /**
     * @ngdoc object
     * @name lbServices.School.staffs
     * @header lbServices.School.staffs
     * @object
     * @description
     *
     * The object `School.staffs` groups methods
     * manipulating `Staff` instances related to `School`.
     *
     * Call {@link lbServices.School#staffs School.staffs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.School#staffs
         * @methodOf lbServices.School
         *
         * @description
         *
         * Queries staffs of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staffs = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::get::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#count
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Counts staffs of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.staffs.count = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::count::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#create
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Creates a new instance in staffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staffs.create = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::create::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#createMany
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Creates a new instance in staffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staffs.createMany = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::createMany::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#destroyAll
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Deletes all staffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.staffs.destroyAll = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::delete::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#destroyById
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Delete a related item by id for staffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for staffs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.staffs.destroyById = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::destroyById::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#findById
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Find a related item by id for staffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for staffs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staffs.findById = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::findById::School::staffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.staffs#updateById
         * @methodOf lbServices.School.staffs
         *
         * @description
         *
         * Update a related item by id for staffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for staffs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staffs.updateById = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::updateById::School::staffs"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.School.students
     * @header lbServices.School.students
     * @object
     * @description
     *
     * The object `School.students` groups methods
     * manipulating `Student` instances related to `School`.
     *
     * Call {@link lbServices.School#students School.students()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.School#students
         * @methodOf lbServices.School
         *
         * @description
         *
         * Queries students of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::get::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#count
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Counts students of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.students.count = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::count::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#create
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Creates a new instance in students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.create = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::create::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#createMany
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Creates a new instance in students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.createMany = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::createMany::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#destroyAll
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Deletes all students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.students.destroyAll = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::delete::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#destroyById
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Delete a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.students.destroyById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::destroyById::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#findById
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Find a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.findById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::findById::School::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.students#updateById
         * @methodOf lbServices.School.students
         *
         * @description
         *
         * Update a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.updateById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::updateById::School::students"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.School.classes
     * @header lbServices.School.classes
     * @object
     * @description
     *
     * The object `School.classes` groups methods
     * manipulating `Class` instances related to `School`.
     *
     * Call {@link lbServices.School#classes School.classes()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.School#classes
         * @methodOf lbServices.School
         *
         * @description
         *
         * Queries classes of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#count
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Counts classes of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.classes.count = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::count::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#create
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Creates a new instance in classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.create = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::create::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#createMany
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Creates a new instance in classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.createMany = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::createMany::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#destroyAll
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Deletes all classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.classes.destroyAll = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::delete::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#destroyById
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Delete a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.classes.destroyById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::destroyById::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#findById
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Find a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.findById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::findById::School::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.classes#updateById
         * @methodOf lbServices.School.classes
         *
         * @description
         *
         * Update a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.updateById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::updateById::School::classes"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.School.timetables
     * @header lbServices.School.timetables
     * @object
     * @description
     *
     * The object `School.timetables` groups methods
     * manipulating `Timetable` instances related to `School`.
     *
     * Call {@link lbServices.School#timetables School.timetables()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.School#timetables
         * @methodOf lbServices.School
         *
         * @description
         *
         * Fetches hasOne relation timetables.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R.timetables = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::get::School::timetables"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.timetables#create
         * @methodOf lbServices.School.timetables
         *
         * @description
         *
         * Creates a new instance in timetables of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R.timetables.create = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::create::School::timetables"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.timetables#createMany
         * @methodOf lbServices.School.timetables
         *
         * @description
         *
         * Creates a new instance in timetables of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R.timetables.createMany = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::createMany::School::timetables"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.timetables#destroy
         * @methodOf lbServices.School.timetables
         *
         * @description
         *
         * Deletes timetables of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.timetables.destroy = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::destroy::School::timetables"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.timetables#update
         * @methodOf lbServices.School.timetables
         *
         * @description
         *
         * Update timetables of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R.timetables.update = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::update::School::timetables"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.School.libraries
     * @header lbServices.School.libraries
     * @object
     * @description
     *
     * The object `School.libraries` groups methods
     * manipulating `Library` instances related to `School`.
     *
     * Call {@link lbServices.School#libraries School.libraries()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.School#libraries
         * @methodOf lbServices.School
         *
         * @description
         *
         * Queries libraries of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R.libraries = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::get::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#count
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Counts libraries of School.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.libraries.count = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::count::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#create
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Creates a new instance in libraries of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R.libraries.create = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::create::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#createMany
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Creates a new instance in libraries of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R.libraries.createMany = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::createMany::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#destroyAll
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Deletes all libraries of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.libraries.destroyAll = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::delete::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#destroyById
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Delete a related item by id for libraries.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for libraries
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.libraries.destroyById = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::destroyById::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#findById
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Find a related item by id for libraries.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for libraries
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R.libraries.findById = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::findById::School::libraries"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.School.libraries#updateById
         * @methodOf lbServices.School.libraries
         *
         * @description
         *
         * Update a related item by id for libraries.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for libraries
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R.libraries.updateById = function() {
          var TargetResource = $injector.get("Library");
          var action = TargetResource["::updateById::School::libraries"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Class
 * @header lbServices.Class
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Class` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Class",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Classes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Class.students.findById() instead.
        "prototype$__findById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.students.destroyById() instead.
        "prototype$__destroyById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.students.updateById() instead.
        "prototype$__updateById__students": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/students/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Classes/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Class.staff() instead.
        "prototype$__get__staff": {
          url: urlBase + "/Classes/:id/staff",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments.findById() instead.
        "prototype$__findById__assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments.destroyById() instead.
        "prototype$__destroyById__assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.assignments.updateById() instead.
        "prototype$__updateById__assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.feeSetups() instead.
        "prototype$__get__feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "GET"
        },

        // INTERNAL. Use Class.feeSetups.create() instead.
        "prototype$__create__feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use Class.feeSetups.update() instead.
        "prototype$__update__feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "PUT"
        },

        // INTERNAL. Use Class.feeSetups.destroy() instead.
        "prototype$__destroy__feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "DELETE"
        },

        // INTERNAL. Use Class.exams.findById() instead.
        "prototype$__findById__exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.exams.destroyById() instead.
        "prototype$__destroyById__exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.exams.updateById() instead.
        "prototype$__updateById__exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.students() instead.
        "prototype$__get__students": {
          isArray: true,
          url: urlBase + "/Classes/:id/students",
          method: "GET"
        },

        // INTERNAL. Use Class.students.create() instead.
        "prototype$__create__students": {
          url: urlBase + "/Classes/:id/students",
          method: "POST"
        },

        // INTERNAL. Use Class.students.destroyAll() instead.
        "prototype$__delete__students": {
          url: urlBase + "/Classes/:id/students",
          method: "DELETE"
        },

        // INTERNAL. Use Class.students.count() instead.
        "prototype$__count__students": {
          url: urlBase + "/Classes/:id/students/count",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments() instead.
        "prototype$__get__assignments": {
          isArray: true,
          url: urlBase + "/Classes/:id/assignments",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments.create() instead.
        "prototype$__create__assignments": {
          url: urlBase + "/Classes/:id/assignments",
          method: "POST"
        },

        // INTERNAL. Use Class.assignments.destroyAll() instead.
        "prototype$__delete__assignments": {
          url: urlBase + "/Classes/:id/assignments",
          method: "DELETE"
        },

        // INTERNAL. Use Class.assignments.count() instead.
        "prototype$__count__assignments": {
          url: urlBase + "/Classes/:id/assignments/count",
          method: "GET"
        },

        // INTERNAL. Use Class.exams() instead.
        "prototype$__get__exams": {
          isArray: true,
          url: urlBase + "/Classes/:id/exams",
          method: "GET"
        },

        // INTERNAL. Use Class.exams.create() instead.
        "prototype$__create__exams": {
          url: urlBase + "/Classes/:id/exams",
          method: "POST"
        },

        // INTERNAL. Use Class.exams.destroyAll() instead.
        "prototype$__delete__exams": {
          url: urlBase + "/Classes/:id/exams",
          method: "DELETE"
        },

        // INTERNAL. Use Class.exams.count() instead.
        "prototype$__count__exams": {
          url: urlBase + "/Classes/:id/exams/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#create
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Classes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#createMany
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Classes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#upsert
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Classes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#exists
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Classes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#findById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Classes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#find
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Classes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#findOne
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Classes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#updateAll
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Classes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#deleteById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Classes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#count
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Classes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#prototype$updateAttributes
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Classes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#createChangeStream
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Classes/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Student.class() instead.
        "::get::Student::class": {
          url: urlBase + "/Students/:id/class",
          method: "GET"
        },

        // INTERNAL. Use School.classes.findById() instead.
        "::findById::School::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.classes.destroyById() instead.
        "::destroyById::School::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.classes.updateById() instead.
        "::updateById::School::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/classes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.classes() instead.
        "::get::School::classes": {
          isArray: true,
          url: urlBase + "/Schools/:id/classes",
          method: "GET"
        },

        // INTERNAL. Use School.classes.create() instead.
        "::create::School::classes": {
          url: urlBase + "/Schools/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use School.classes.createMany() instead.
        "::createMany::School::classes": {
          isArray: true,
          url: urlBase + "/Schools/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use School.classes.destroyAll() instead.
        "::delete::School::classes": {
          url: urlBase + "/Schools/:id/classes",
          method: "DELETE"
        },

        // INTERNAL. Use School.classes.count() instead.
        "::count::School::classes": {
          url: urlBase + "/Schools/:id/classes/count",
          method: "GET"
        },

        // INTERNAL. Use Subject.class() instead.
        "::get::Subject::class": {
          url: urlBase + "/Subjects/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Assignment.class() instead.
        "::get::Assignment::class": {
          url: urlBase + "/Assignments/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Attendance.class() instead.
        "::get::Attendance::class": {
          url: urlBase + "/Attendances/:id/class",
          method: "GET"
        },

        // INTERNAL. Use FeeSetup.class() instead.
        "::get::FeeSetup::class": {
          url: urlBase + "/FeeSetups/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Exam.class() instead.
        "::get::Exam::class": {
          url: urlBase + "/Exams/:id/class",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Class#updateOrCreate
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Class#update
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Class#destroyById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Class#removeById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Class#modelName
    * @propertyOf lbServices.Class
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Class`.
    */
    R.modelName = "Class";

    /**
     * @ngdoc object
     * @name lbServices.Class.students
     * @header lbServices.Class.students
     * @object
     * @description
     *
     * The object `Class.students` groups methods
     * manipulating `Student` instances related to `Class`.
     *
     * Call {@link lbServices.Class#students Class.students()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Class#students
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Queries students of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::get::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#count
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Counts students of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.students.count = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::count::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#create
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Creates a new instance in students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.create = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::create::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#createMany
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Creates a new instance in students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.createMany = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::createMany::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#destroyAll
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Deletes all students of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.students.destroyAll = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::delete::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#destroyById
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Delete a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.students.destroyById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::destroyById::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#findById
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Find a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.findById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::findById::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.students#updateById
         * @methodOf lbServices.Class.students
         *
         * @description
         *
         * Update a related item by id for students.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for students
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.students.updateById = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::updateById::Class::students"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class#school
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Class::school"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class#staff
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Fetches belongsTo relation staff.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staff = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::get::Class::staff"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Class.assignments
     * @header lbServices.Class.assignments
     * @object
     * @description
     *
     * The object `Class.assignments` groups methods
     * manipulating `Assignment` instances related to `Class`.
     *
     * Call {@link lbServices.Class#assignments Class.assignments()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Class#assignments
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Queries assignments of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignments = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::get::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#count
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Counts assignments of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.assignments.count = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::count::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#create
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Creates a new instance in assignments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignments.create = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::create::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#createMany
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Creates a new instance in assignments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignments.createMany = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::createMany::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#destroyAll
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Deletes all assignments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.assignments.destroyAll = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::delete::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#destroyById
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Delete a related item by id for assignments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for assignments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.assignments.destroyById = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::destroyById::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#findById
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Find a related item by id for assignments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for assignments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignments.findById = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::findById::Class::assignments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.assignments#updateById
         * @methodOf lbServices.Class.assignments
         *
         * @description
         *
         * Update a related item by id for assignments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for assignments
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignments.updateById = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::updateById::Class::assignments"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Class.feeSetups
     * @header lbServices.Class.feeSetups
     * @object
     * @description
     *
     * The object `Class.feeSetups` groups methods
     * manipulating `FeeSetup` instances related to `Class`.
     *
     * Call {@link lbServices.Class#feeSetups Class.feeSetups()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Class#feeSetups
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Fetches hasOne relation feeSetups.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::get::Class::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.feeSetups#create
         * @methodOf lbServices.Class.feeSetups
         *
         * @description
         *
         * Creates a new instance in feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.create = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::create::Class::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.feeSetups#createMany
         * @methodOf lbServices.Class.feeSetups
         *
         * @description
         *
         * Creates a new instance in feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.createMany = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::createMany::Class::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.feeSetups#destroy
         * @methodOf lbServices.Class.feeSetups
         *
         * @description
         *
         * Deletes feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.feeSetups.destroy = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::destroy::Class::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.feeSetups#update
         * @methodOf lbServices.Class.feeSetups
         *
         * @description
         *
         * Update feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.update = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::update::Class::feeSetups"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Class.exams
     * @header lbServices.Class.exams
     * @object
     * @description
     *
     * The object `Class.exams` groups methods
     * manipulating `Exam` instances related to `Class`.
     *
     * Call {@link lbServices.Class#exams Class.exams()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Class#exams
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Queries exams of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R.exams = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::get::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#count
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Counts exams of Class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.exams.count = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::count::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#create
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Creates a new instance in exams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R.exams.create = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::create::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#createMany
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Creates a new instance in exams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R.exams.createMany = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::createMany::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#destroyAll
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Deletes all exams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.exams.destroyAll = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::delete::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#destroyById
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Delete a related item by id for exams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for exams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.exams.destroyById = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::destroyById::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#findById
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Find a related item by id for exams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for exams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R.exams.findById = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::findById::Class::exams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Class.exams#updateById
         * @methodOf lbServices.Class.exams
         *
         * @description
         *
         * Update a related item by id for exams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for exams
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R.exams.updateById = function() {
          var TargetResource = $injector.get("Exam");
          var action = TargetResource["::updateById::Class::exams"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Admin
 * @header lbServices.Admin
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Admin` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Admin",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Admins/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__findById__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Admins/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Admins/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__updateById__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Admins/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Admin.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Admins/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__get__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Queries accessTokens of Admin.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Admins/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__create__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Admins/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__delete__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Admins/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$__count__accessTokens
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Counts accessTokens of Admin.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Admins/:id/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#create
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Admins",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#createMany
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Admins",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#upsert
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Admins",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#exists
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Admins/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#findById
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Admins/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#find
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Admins",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#findOne
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Admins/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#updateAll
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Admins/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#deleteById
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Admins/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#count
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Admins/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#prototype$updateAttributes
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Admins/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#createChangeStream
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Admins/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#login
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Admins/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#logout
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Admins/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#confirm
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Admins/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#resetPassword
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Admins/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Admin#getCurrent
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Admins" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Admin#updateOrCreate
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Admin#update
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Admin#destroyById
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Admin#removeById
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Admin` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Admin#getCachedCurrent
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Admin#login} or
         * {@link lbServices.Admin#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Admin instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Admin#isAuthenticated
         * @methodOf lbServices.Admin
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Admin#getCurrentId
         * @methodOf lbServices.Admin
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Admin#modelName
    * @propertyOf lbServices.Admin
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Admin`.
    */
    R.modelName = "Admin";


        /**
         * @ngdoc method
         * @name lbServices.Admin#school
         * @methodOf lbServices.Admin
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Admin::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Subject
 * @header lbServices.Subject
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Subject` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Subject",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Subjects/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Subject.staff() instead.
        "prototype$__get__staff": {
          url: urlBase + "/Subjects/:id/staff",
          method: "GET"
        },

        // INTERNAL. Use Subject.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Subjects/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Subject.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/Subjects/:id/class",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#create
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Subjects",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#createMany
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Subjects",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#upsert
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Subjects",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#exists
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Subjects/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#findById
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Subjects/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#find
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Subjects",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#findOne
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Subjects/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#updateAll
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Subjects/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#deleteById
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Subjects/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#count
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Subjects/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#prototype$updateAttributes
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Subjects/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subject#createChangeStream
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Subjects/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Staff.subject() instead.
        "::get::Staff::subject": {
          url: urlBase + "/Staffs/:id/subject",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Subject#updateOrCreate
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Subject#update
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Subject#destroyById
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Subject#removeById
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subject` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Subject#modelName
    * @propertyOf lbServices.Subject
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Subject`.
    */
    R.modelName = "Subject";


        /**
         * @ngdoc method
         * @name lbServices.Subject#staff
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Fetches belongsTo relation staff.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Staff` object.)
         * </em>
         */
        R.staff = function() {
          var TargetResource = $injector.get("Staff");
          var action = TargetResource["::get::Subject::staff"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subject#school
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Subject::school"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subject#class
         * @methodOf lbServices.Subject
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Subject::class"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Bus
 * @header lbServices.Bus
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Bus` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Bus",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Buses/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Bus.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Buses/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Bus.busServices.findById() instead.
        "prototype$__findById__busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bus.busServices.destroyById() instead.
        "prototype$__destroyById__busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bus.busServices.updateById() instead.
        "prototype$__updateById__busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bus.busServices() instead.
        "prototype$__get__busServices": {
          isArray: true,
          url: urlBase + "/Buses/:id/busServices",
          method: "GET"
        },

        // INTERNAL. Use Bus.busServices.create() instead.
        "prototype$__create__busServices": {
          url: urlBase + "/Buses/:id/busServices",
          method: "POST"
        },

        // INTERNAL. Use Bus.busServices.destroyAll() instead.
        "prototype$__delete__busServices": {
          url: urlBase + "/Buses/:id/busServices",
          method: "DELETE"
        },

        // INTERNAL. Use Bus.busServices.count() instead.
        "prototype$__count__busServices": {
          url: urlBase + "/Buses/:id/busServices/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#create
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Buses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#createMany
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Buses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#upsert
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Buses",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#exists
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Buses/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#findById
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Buses/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#find
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Buses",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#findOne
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Buses/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#updateAll
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Buses/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#deleteById
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Buses/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#count
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Buses/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#prototype$updateAttributes
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Buses/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bus#createChangeStream
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Buses/change-stream",
          method: "POST"
        },

        // INTERNAL. Use BusService.bus() instead.
        "::get::BusService::bus": {
          url: urlBase + "/BusServices/:id/bus",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Bus#updateOrCreate
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Bus#update
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Bus#destroyById
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Bus#removeById
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Bus#modelName
    * @propertyOf lbServices.Bus
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Bus`.
    */
    R.modelName = "Bus";


        /**
         * @ngdoc method
         * @name lbServices.Bus#school
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Bus::school"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Bus.busServices
     * @header lbServices.Bus.busServices
     * @object
     * @description
     *
     * The object `Bus.busServices` groups methods
     * manipulating `BusService` instances related to `Bus`.
     *
     * Call {@link lbServices.Bus#busServices Bus.busServices()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Bus#busServices
         * @methodOf lbServices.Bus
         *
         * @description
         *
         * Queries busServices of Bus.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busServices = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::get::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#count
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Counts busServices of Bus.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.busServices.count = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::count::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#create
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Creates a new instance in busServices of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busServices.create = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::create::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#createMany
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Creates a new instance in busServices of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busServices.createMany = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::createMany::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#destroyAll
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Deletes all busServices of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.busServices.destroyAll = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::delete::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#destroyById
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Delete a related item by id for busServices.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for busServices
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.busServices.destroyById = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::destroyById::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#findById
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Find a related item by id for busServices.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for busServices
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busServices.findById = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::findById::Bus::busServices"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bus.busServices#updateById
         * @methodOf lbServices.Bus.busServices
         *
         * @description
         *
         * Update a related item by id for busServices.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for busServices
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busServices.updateById = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::updateById::Bus::busServices"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.FeeType
 * @header lbServices.FeeType
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `FeeType` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "FeeType",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/FeeTypes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use FeeType.feeSetups.findById() instead.
        "prototype$__findById__feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "GET"
        },

        // INTERNAL. Use FeeType.feeSetups.destroyById() instead.
        "prototype$__destroyById__feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use FeeType.feeSetups.updateById() instead.
        "prototype$__updateById__feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "PUT"
        },

        // INTERNAL. Use FeeType.feeSetups() instead.
        "prototype$__get__feeSetups": {
          isArray: true,
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "GET"
        },

        // INTERNAL. Use FeeType.feeSetups.create() instead.
        "prototype$__create__feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use FeeType.feeSetups.destroyAll() instead.
        "prototype$__delete__feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "DELETE"
        },

        // INTERNAL. Use FeeType.feeSetups.count() instead.
        "prototype$__count__feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#create
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/FeeTypes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#createMany
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/FeeTypes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#upsert
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/FeeTypes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#exists
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/FeeTypes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#findById
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/FeeTypes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#find
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/FeeTypes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#findOne
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/FeeTypes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#updateAll
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/FeeTypes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#deleteById
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/FeeTypes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#count
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/FeeTypes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#prototype$updateAttributes
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/FeeTypes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeType#createChangeStream
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/FeeTypes/change-stream",
          method: "POST"
        },

        // INTERNAL. Use FeeSetup.feeType() instead.
        "::get::FeeSetup::feeType": {
          url: urlBase + "/FeeSetups/:id/feeType",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.FeeType#updateOrCreate
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.FeeType#update
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.FeeType#destroyById
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.FeeType#removeById
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.FeeType#modelName
    * @propertyOf lbServices.FeeType
    * @description
    * The name of the model represented by this $resource,
    * i.e. `FeeType`.
    */
    R.modelName = "FeeType";

    /**
     * @ngdoc object
     * @name lbServices.FeeType.feeSetups
     * @header lbServices.FeeType.feeSetups
     * @object
     * @description
     *
     * The object `FeeType.feeSetups` groups methods
     * manipulating `FeeSetup` instances related to `FeeType`.
     *
     * Call {@link lbServices.FeeType#feeSetups FeeType.feeSetups()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.FeeType#feeSetups
         * @methodOf lbServices.FeeType
         *
         * @description
         *
         * Queries feeSetups of FeeType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::get::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#count
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Counts feeSetups of FeeType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.feeSetups.count = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::count::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#create
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Creates a new instance in feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.create = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::create::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#createMany
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Creates a new instance in feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.createMany = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::createMany::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#destroyAll
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Deletes all feeSetups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.feeSetups.destroyAll = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::delete::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#destroyById
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Delete a related item by id for feeSetups.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for feeSetups
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.feeSetups.destroyById = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::destroyById::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#findById
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Find a related item by id for feeSetups.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for feeSetups
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.findById = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::findById::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeType.feeSetups#updateById
         * @methodOf lbServices.FeeType.feeSetups
         *
         * @description
         *
         * Update a related item by id for feeSetups.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for feeSetups
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R.feeSetups.updateById = function() {
          var TargetResource = $injector.get("FeeSetup");
          var action = TargetResource["::updateById::FeeType::feeSetups"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Timetable
 * @header lbServices.Timetable
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Timetable` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Timetable",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Timetables/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Timetable.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Timetables/:id/school",
          method: "GET"
        },

        // INTERNAL. Use Timetable.schedules.findById() instead.
        "prototype$__findById__schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "GET"
        },

        // INTERNAL. Use Timetable.schedules.destroyById() instead.
        "prototype$__destroyById__schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Timetable.schedules.updateById() instead.
        "prototype$__updateById__schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Timetable.schedules() instead.
        "prototype$__get__schedules": {
          isArray: true,
          url: urlBase + "/Timetables/:id/schedules",
          method: "GET"
        },

        // INTERNAL. Use Timetable.schedules.create() instead.
        "prototype$__create__schedules": {
          url: urlBase + "/Timetables/:id/schedules",
          method: "POST"
        },

        // INTERNAL. Use Timetable.schedules.destroyAll() instead.
        "prototype$__delete__schedules": {
          url: urlBase + "/Timetables/:id/schedules",
          method: "DELETE"
        },

        // INTERNAL. Use Timetable.schedules.count() instead.
        "prototype$__count__schedules": {
          url: urlBase + "/Timetables/:id/schedules/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#create
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Timetables",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#createMany
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Timetables",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#upsert
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Timetables",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#exists
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Timetables/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#findById
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Timetables/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#find
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Timetables",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#findOne
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Timetables/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#updateAll
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Timetables/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#deleteById
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Timetables/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#count
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Timetables/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#prototype$updateAttributes
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Timetables/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Timetable#createChangeStream
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Timetables/change-stream",
          method: "POST"
        },

        // INTERNAL. Use School.timetables() instead.
        "::get::School::timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "GET"
        },

        // INTERNAL. Use School.timetables.create() instead.
        "::create::School::timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "POST"
        },

        // INTERNAL. Use School.timetables.createMany() instead.
        "::createMany::School::timetables": {
          isArray: true,
          url: urlBase + "/Schools/:id/timetables",
          method: "POST"
        },

        // INTERNAL. Use School.timetables.update() instead.
        "::update::School::timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "PUT"
        },

        // INTERNAL. Use School.timetables.destroy() instead.
        "::destroy::School::timetables": {
          url: urlBase + "/Schools/:id/timetables",
          method: "DELETE"
        },

        // INTERNAL. Use Schedule.timetable() instead.
        "::get::Schedule::timetable": {
          url: urlBase + "/Schedules/:id/timetable",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Timetable#updateOrCreate
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Timetable#update
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Timetable#destroyById
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Timetable#removeById
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Timetable#modelName
    * @propertyOf lbServices.Timetable
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Timetable`.
    */
    R.modelName = "Timetable";


        /**
         * @ngdoc method
         * @name lbServices.Timetable#school
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Timetable::school"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Timetable.schedules
     * @header lbServices.Timetable.schedules
     * @object
     * @description
     *
     * The object `Timetable.schedules` groups methods
     * manipulating `Schedule` instances related to `Timetable`.
     *
     * Call {@link lbServices.Timetable#schedules Timetable.schedules()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Timetable#schedules
         * @methodOf lbServices.Timetable
         *
         * @description
         *
         * Queries schedules of Timetable.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R.schedules = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::get::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#count
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Counts schedules of Timetable.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.schedules.count = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::count::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#create
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Creates a new instance in schedules of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R.schedules.create = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::create::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#createMany
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Creates a new instance in schedules of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R.schedules.createMany = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::createMany::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#destroyAll
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Deletes all schedules of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.schedules.destroyAll = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::delete::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#destroyById
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Delete a related item by id for schedules.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for schedules
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.schedules.destroyById = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::destroyById::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#findById
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Find a related item by id for schedules.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for schedules
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R.schedules.findById = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::findById::Timetable::schedules"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Timetable.schedules#updateById
         * @methodOf lbServices.Timetable.schedules
         *
         * @description
         *
         * Update a related item by id for schedules.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for schedules
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R.schedules.updateById = function() {
          var TargetResource = $injector.get("Schedule");
          var action = TargetResource["::updateById::Timetable::schedules"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Schedule
 * @header lbServices.Schedule
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Schedule` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Schedule",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Schedules/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Schedule.timetable() instead.
        "prototype$__get__timetable": {
          url: urlBase + "/Schedules/:id/timetable",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#create
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Schedules",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#createMany
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Schedules",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#upsert
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Schedules",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#exists
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Schedules/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#findById
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Schedules/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#find
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Schedules",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#findOne
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Schedules/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#updateAll
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Schedules/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#deleteById
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Schedules/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#count
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Schedules/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#prototype$updateAttributes
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Schedules/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Schedule#createChangeStream
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Schedules/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Timetable.schedules.findById() instead.
        "::findById::Timetable::schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "GET"
        },

        // INTERNAL. Use Timetable.schedules.destroyById() instead.
        "::destroyById::Timetable::schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Timetable.schedules.updateById() instead.
        "::updateById::Timetable::schedules": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Timetables/:id/schedules/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Timetable.schedules() instead.
        "::get::Timetable::schedules": {
          isArray: true,
          url: urlBase + "/Timetables/:id/schedules",
          method: "GET"
        },

        // INTERNAL. Use Timetable.schedules.create() instead.
        "::create::Timetable::schedules": {
          url: urlBase + "/Timetables/:id/schedules",
          method: "POST"
        },

        // INTERNAL. Use Timetable.schedules.createMany() instead.
        "::createMany::Timetable::schedules": {
          isArray: true,
          url: urlBase + "/Timetables/:id/schedules",
          method: "POST"
        },

        // INTERNAL. Use Timetable.schedules.destroyAll() instead.
        "::delete::Timetable::schedules": {
          url: urlBase + "/Timetables/:id/schedules",
          method: "DELETE"
        },

        // INTERNAL. Use Timetable.schedules.count() instead.
        "::count::Timetable::schedules": {
          url: urlBase + "/Timetables/:id/schedules/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Schedule#updateOrCreate
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Schedule#update
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Schedule#destroyById
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Schedule#removeById
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Schedule` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Schedule#modelName
    * @propertyOf lbServices.Schedule
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Schedule`.
    */
    R.modelName = "Schedule";


        /**
         * @ngdoc method
         * @name lbServices.Schedule#timetable
         * @methodOf lbServices.Schedule
         *
         * @description
         *
         * Fetches belongsTo relation timetable.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Timetable` object.)
         * </em>
         */
        R.timetable = function() {
          var TargetResource = $injector.get("Timetable");
          var action = TargetResource["::get::Schedule::timetable"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Calendar
 * @header lbServices.Calendar
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Calendar` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Calendar",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Calendars/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Calendar#create
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Calendars",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#createMany
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Calendars",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#upsert
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Calendars",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#exists
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Calendars/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#findById
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Calendars/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#find
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Calendars",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#findOne
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Calendars/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#updateAll
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Calendars/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#deleteById
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Calendars/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#count
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Calendars/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#prototype$updateAttributes
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Calendars/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Calendar#createChangeStream
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Calendars/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Calendar#updateOrCreate
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Calendar#update
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Calendar#destroyById
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Calendar#removeById
         * @methodOf lbServices.Calendar
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Calendar` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Calendar#modelName
    * @propertyOf lbServices.Calendar
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Calendar`.
    */
    R.modelName = "Calendar";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Noticeboard
 * @header lbServices.Noticeboard
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Noticeboard` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Noticeboard",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Noticeboards/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Noticeboard.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Noticeboards/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#create
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Noticeboards",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#createMany
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Noticeboards",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#upsert
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Noticeboards",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#exists
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Noticeboards/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#findById
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Noticeboards/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#find
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Noticeboards",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#findOne
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Noticeboards/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#updateAll
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Noticeboards/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#deleteById
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Noticeboards/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#count
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Noticeboards/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#prototype$updateAttributes
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Noticeboards/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#createChangeStream
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Noticeboards/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#updateOrCreate
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#update
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#destroyById
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#removeById
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noticeboard` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Noticeboard#modelName
    * @propertyOf lbServices.Noticeboard
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Noticeboard`.
    */
    R.modelName = "Noticeboard";


        /**
         * @ngdoc method
         * @name lbServices.Noticeboard#school
         * @methodOf lbServices.Noticeboard
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Noticeboard::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Assignment
 * @header lbServices.Assignment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Assignment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Assignment",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Assignments/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Assignment.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/Assignments/:id/class",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#create
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Assignments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#createMany
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Assignments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#upsert
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Assignments",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#exists
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Assignments/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#findById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Assignments/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#find
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Assignments",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#findOne
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Assignments/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#updateAll
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Assignments/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#deleteById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Assignments/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#count
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Assignments/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#prototype$updateAttributes
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Assignments/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#createChangeStream
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Assignments/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Class.assignments.findById() instead.
        "::findById::Class::assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments.destroyById() instead.
        "::destroyById::Class::assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.assignments.updateById() instead.
        "::updateById::Class::assignments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/assignments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.assignments() instead.
        "::get::Class::assignments": {
          isArray: true,
          url: urlBase + "/Classes/:id/assignments",
          method: "GET"
        },

        // INTERNAL. Use Class.assignments.create() instead.
        "::create::Class::assignments": {
          url: urlBase + "/Classes/:id/assignments",
          method: "POST"
        },

        // INTERNAL. Use Class.assignments.createMany() instead.
        "::createMany::Class::assignments": {
          isArray: true,
          url: urlBase + "/Classes/:id/assignments",
          method: "POST"
        },

        // INTERNAL. Use Class.assignments.destroyAll() instead.
        "::delete::Class::assignments": {
          url: urlBase + "/Classes/:id/assignments",
          method: "DELETE"
        },

        // INTERNAL. Use Class.assignments.count() instead.
        "::count::Class::assignments": {
          url: urlBase + "/Classes/:id/assignments/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Assignment#updateOrCreate
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#update
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#destroyById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#removeById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Assignment#modelName
    * @propertyOf lbServices.Assignment
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Assignment`.
    */
    R.modelName = "Assignment";


        /**
         * @ngdoc method
         * @name lbServices.Assignment#class
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Assignment::class"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Library
 * @header lbServices.Library
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Library` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Library",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Libraries/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Library.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Libraries/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#create
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Libraries",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#createMany
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Libraries",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#upsert
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Libraries",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#exists
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Libraries/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#findById
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Libraries/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#find
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Libraries",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#findOne
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Libraries/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#updateAll
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Libraries/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#deleteById
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Libraries/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#count
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Libraries/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#prototype$updateAttributes
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Libraries/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Library#createChangeStream
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Libraries/change-stream",
          method: "POST"
        },

        // INTERNAL. Use School.libraries.findById() instead.
        "::findById::School::libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "GET"
        },

        // INTERNAL. Use School.libraries.destroyById() instead.
        "::destroyById::School::libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use School.libraries.updateById() instead.
        "::updateById::School::libraries": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Schools/:id/libraries/:fk",
          method: "PUT"
        },

        // INTERNAL. Use School.libraries() instead.
        "::get::School::libraries": {
          isArray: true,
          url: urlBase + "/Schools/:id/libraries",
          method: "GET"
        },

        // INTERNAL. Use School.libraries.create() instead.
        "::create::School::libraries": {
          url: urlBase + "/Schools/:id/libraries",
          method: "POST"
        },

        // INTERNAL. Use School.libraries.createMany() instead.
        "::createMany::School::libraries": {
          isArray: true,
          url: urlBase + "/Schools/:id/libraries",
          method: "POST"
        },

        // INTERNAL. Use School.libraries.destroyAll() instead.
        "::delete::School::libraries": {
          url: urlBase + "/Schools/:id/libraries",
          method: "DELETE"
        },

        // INTERNAL. Use School.libraries.count() instead.
        "::count::School::libraries": {
          url: urlBase + "/Schools/:id/libraries/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Library#updateOrCreate
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Library#update
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Library#destroyById
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Library#removeById
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Library` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Library#modelName
    * @propertyOf lbServices.Library
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Library`.
    */
    R.modelName = "Library";


        /**
         * @ngdoc method
         * @name lbServices.Library#school
         * @methodOf lbServices.Library
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Library::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.StudentParent
 * @header lbServices.StudentParent
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `StudentParent` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "StudentParent",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/StudentParents/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use StudentParent.parent() instead.
        "prototype$__get__parent": {
          url: urlBase + "/StudentParents/:id/parent",
          method: "GET"
        },

        // INTERNAL. Use StudentParent.student() instead.
        "prototype$__get__student": {
          url: urlBase + "/StudentParents/:id/student",
          method: "GET"
        },

        // INTERNAL. Use StudentParent.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/StudentParents/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#create
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/StudentParents",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#createMany
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/StudentParents",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#upsert
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/StudentParents",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#exists
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/StudentParents/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#findById
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/StudentParents/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#find
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/StudentParents",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#findOne
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/StudentParents/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#updateAll
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/StudentParents/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#deleteById
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/StudentParents/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#count
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/StudentParents/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#prototype$updateAttributes
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/StudentParents/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#createChangeStream
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/StudentParents/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Student.studentParents.findById() instead.
        "::findById::Student::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents.destroyById() instead.
        "::destroyById::Student::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Student.studentParents.updateById() instead.
        "::updateById::Student::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Students/:id/studentParents/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Student.studentParents() instead.
        "::get::Student::studentParents": {
          isArray: true,
          url: urlBase + "/Students/:id/studentParents",
          method: "GET"
        },

        // INTERNAL. Use Student.studentParents.create() instead.
        "::create::Student::studentParents": {
          url: urlBase + "/Students/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Student.studentParents.createMany() instead.
        "::createMany::Student::studentParents": {
          isArray: true,
          url: urlBase + "/Students/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Student.studentParents.destroyAll() instead.
        "::delete::Student::studentParents": {
          url: urlBase + "/Students/:id/studentParents",
          method: "DELETE"
        },

        // INTERNAL. Use Student.studentParents.count() instead.
        "::count::Student::studentParents": {
          url: urlBase + "/Students/:id/studentParents/count",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents.findById() instead.
        "::findById::Parent::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents.destroyById() instead.
        "::destroyById::Parent::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Parent.studentParents.updateById() instead.
        "::updateById::Parent::studentParents": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Parents/:id/studentParents/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Parent.studentParents() instead.
        "::get::Parent::studentParents": {
          isArray: true,
          url: urlBase + "/Parents/:id/studentParents",
          method: "GET"
        },

        // INTERNAL. Use Parent.studentParents.create() instead.
        "::create::Parent::studentParents": {
          url: urlBase + "/Parents/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Parent.studentParents.createMany() instead.
        "::createMany::Parent::studentParents": {
          isArray: true,
          url: urlBase + "/Parents/:id/studentParents",
          method: "POST"
        },

        // INTERNAL. Use Parent.studentParents.destroyAll() instead.
        "::delete::Parent::studentParents": {
          url: urlBase + "/Parents/:id/studentParents",
          method: "DELETE"
        },

        // INTERNAL. Use Parent.studentParents.count() instead.
        "::count::Parent::studentParents": {
          url: urlBase + "/Parents/:id/studentParents/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.StudentParent#updateOrCreate
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#update
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#destroyById
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#removeById
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `StudentParent` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.StudentParent#modelName
    * @propertyOf lbServices.StudentParent
    * @description
    * The name of the model represented by this $resource,
    * i.e. `StudentParent`.
    */
    R.modelName = "StudentParent";


        /**
         * @ngdoc method
         * @name lbServices.StudentParent#parent
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Fetches belongsTo relation parent.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Parent` object.)
         * </em>
         */
        R.parent = function() {
          var TargetResource = $injector.get("Parent");
          var action = TargetResource["::get::StudentParent::parent"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#student
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Fetches belongsTo relation student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.student = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::get::StudentParent::student"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.StudentParent#school
         * @methodOf lbServices.StudentParent
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::StudentParent::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Attendance
 * @header lbServices.Attendance
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Attendance` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Attendance",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Attendances/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Attendance.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/Attendances/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Attendance.student() instead.
        "prototype$__get__student": {
          url: urlBase + "/Attendances/:id/student",
          method: "GET"
        },

        // INTERNAL. Use Attendance.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Attendances/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#create
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Attendances",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#createMany
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Attendances",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#upsert
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Attendances",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#exists
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Attendances/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#findById
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Attendances/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#find
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Attendances",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#findOne
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Attendances/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#updateAll
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Attendances/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#deleteById
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Attendances/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#count
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Attendances/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#prototype$updateAttributes
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Attendances/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendance#createChangeStream
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Attendances/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Attendance#updateOrCreate
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Attendance#update
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Attendance#destroyById
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Attendance#removeById
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendance` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Attendance#modelName
    * @propertyOf lbServices.Attendance
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Attendance`.
    */
    R.modelName = "Attendance";


        /**
         * @ngdoc method
         * @name lbServices.Attendance#class
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Attendance::class"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Attendance#student
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Fetches belongsTo relation student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.student = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::get::Attendance::student"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Attendance#school
         * @methodOf lbServices.Attendance
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Attendance::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.ChatUser
 * @header lbServices.ChatUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ChatUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ChatUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/ChatUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__findById__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__destroyById__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__updateById__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ChatUser.joinedrooms.findById() instead.
        "prototype$__findById__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "GET"
        },

        // INTERNAL. Use ChatUser.joinedrooms.destroyById() instead.
        "prototype$__destroyById__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.updateById() instead.
        "prototype$__updateById__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ChatUser.joinedrooms.link() instead.
        "prototype$__link__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ChatUser.joinedrooms.unlink() instead.
        "prototype$__unlink__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.exists() instead.
        "prototype$__exists__joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__get__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Queries accessTokens of ChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/ChatUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__create__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/ChatUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__delete__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/ChatUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$__count__accessTokens
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Counts accessTokens of ChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/ChatUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use ChatUser.joinedrooms() instead.
        "prototype$__get__joinedrooms": {
          isArray: true,
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "GET"
        },

        // INTERNAL. Use ChatUser.joinedrooms.create() instead.
        "prototype$__create__joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "POST"
        },

        // INTERNAL. Use ChatUser.joinedrooms.destroyAll() instead.
        "prototype$__delete__joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.count() instead.
        "prototype$__count__joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#create
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/ChatUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#createMany
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/ChatUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#upsert
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/ChatUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#exists
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/ChatUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#findById
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/ChatUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#find
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/ChatUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#findOne
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/ChatUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#updateAll
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/ChatUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#deleteById
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/ChatUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#count
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/ChatUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#prototype$updateAttributes
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/ChatUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#createChangeStream
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/ChatUsers/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#login
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/ChatUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#logout
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/ChatUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#confirm
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/ChatUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#resetPassword
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/ChatUsers/reset",
          method: "POST"
        },

        // INTERNAL. Use Room.users.findById() instead.
        "::findById::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Room.users.destroyById() instead.
        "::destroyById::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.updateById() instead.
        "::updateById::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.users.link() instead.
        "::link::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.users.unlink() instead.
        "::unlink::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.exists() instead.
        "::exists::Room::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Room.users() instead.
        "::get::Room::users": {
          isArray: true,
          url: urlBase + "/Rooms/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Room.users.create() instead.
        "::create::Room::users": {
          url: urlBase + "/Rooms/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Room.users.createMany() instead.
        "::createMany::Room::users": {
          isArray: true,
          url: urlBase + "/Rooms/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Room.users.destroyAll() instead.
        "::delete::Room::users": {
          url: urlBase + "/Rooms/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.count() instead.
        "::count::Room::users": {
          url: urlBase + "/Rooms/:id/users/count",
          method: "GET"
        },

        // INTERNAL. Use Message.user() instead.
        "::get::Message::user": {
          url: urlBase + "/Messages/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#getCurrent
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/ChatUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.ChatUser#updateOrCreate
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#update
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#destroyById
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#removeById
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#getCachedCurrent
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.ChatUser#login} or
         * {@link lbServices.ChatUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A ChatUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#isAuthenticated
         * @methodOf lbServices.ChatUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser#getCurrentId
         * @methodOf lbServices.ChatUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.ChatUser#modelName
    * @propertyOf lbServices.ChatUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `ChatUser`.
    */
    R.modelName = "ChatUser";

    /**
     * @ngdoc object
     * @name lbServices.ChatUser.joinedrooms
     * @header lbServices.ChatUser.joinedrooms
     * @object
     * @description
     *
     * The object `ChatUser.joinedrooms` groups methods
     * manipulating `Room` instances related to `ChatUser`.
     *
     * Call {@link lbServices.ChatUser#joinedrooms ChatUser.joinedrooms()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.ChatUser#joinedrooms
         * @methodOf lbServices.ChatUser
         *
         * @description
         *
         * Queries joinedrooms of ChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::get::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#count
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Counts joinedrooms of ChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.joinedrooms.count = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::count::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#create
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Creates a new instance in joinedrooms of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.create = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::create::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#createMany
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Creates a new instance in joinedrooms of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.createMany = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::createMany::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#destroyAll
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Deletes all joinedrooms of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.joinedrooms.destroyAll = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::delete::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#destroyById
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Delete a related item by id for joinedrooms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.joinedrooms.destroyById = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::destroyById::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#exists
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Check the existence of joinedrooms relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.exists = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::exists::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#findById
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Find a related item by id for joinedrooms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.findById = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::findById::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#link
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Add a related item by id for joinedrooms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.link = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::link::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#unlink
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Remove the joinedrooms relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.joinedrooms.unlink = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::unlink::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ChatUser.joinedrooms#updateById
         * @methodOf lbServices.ChatUser.joinedrooms
         *
         * @description
         *
         * Update a related item by id for joinedrooms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for joinedrooms
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.joinedrooms.updateById = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::updateById::ChatUser::joinedrooms"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Room
 * @header lbServices.Room
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Room` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Room",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Rooms/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Room.users.findById() instead.
        "prototype$__findById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Room.users.destroyById() instead.
        "prototype$__destroyById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.updateById() instead.
        "prototype$__updateById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.users.link() instead.
        "prototype$__link__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.users.unlink() instead.
        "prototype$__unlink__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.exists() instead.
        "prototype$__exists__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Room.messages.findById() instead.
        "prototype$__findById__messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "GET"
        },

        // INTERNAL. Use Room.messages.destroyById() instead.
        "prototype$__destroyById__messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.messages.updateById() instead.
        "prototype$__updateById__messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.users() instead.
        "prototype$__get__users": {
          isArray: true,
          url: urlBase + "/Rooms/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Room.users.create() instead.
        "prototype$__create__users": {
          url: urlBase + "/Rooms/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Room.users.destroyAll() instead.
        "prototype$__delete__users": {
          url: urlBase + "/Rooms/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Room.users.count() instead.
        "prototype$__count__users": {
          url: urlBase + "/Rooms/:id/users/count",
          method: "GET"
        },

        // INTERNAL. Use Room.messages() instead.
        "prototype$__get__messages": {
          isArray: true,
          url: urlBase + "/Rooms/:id/messages",
          method: "GET"
        },

        // INTERNAL. Use Room.messages.create() instead.
        "prototype$__create__messages": {
          url: urlBase + "/Rooms/:id/messages",
          method: "POST"
        },

        // INTERNAL. Use Room.messages.destroyAll() instead.
        "prototype$__delete__messages": {
          url: urlBase + "/Rooms/:id/messages",
          method: "DELETE"
        },

        // INTERNAL. Use Room.messages.count() instead.
        "prototype$__count__messages": {
          url: urlBase + "/Rooms/:id/messages/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#create
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Rooms",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#createMany
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Rooms",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#upsert
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Rooms",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#exists
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Rooms/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#findById
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Rooms/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#find
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Rooms",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#findOne
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Rooms/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#updateAll
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Rooms/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#deleteById
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Rooms/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#count
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Rooms/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#prototype$updateAttributes
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Rooms/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Room#createChangeStream
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Rooms/change-stream",
          method: "POST"
        },

        // INTERNAL. Use ChatUser.joinedrooms.findById() instead.
        "::findById::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "GET"
        },

        // INTERNAL. Use ChatUser.joinedrooms.destroyById() instead.
        "::destroyById::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.updateById() instead.
        "::updateById::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ChatUser.joinedrooms.link() instead.
        "::link::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ChatUser.joinedrooms.unlink() instead.
        "::unlink::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.exists() instead.
        "::exists::ChatUser::joinedrooms": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ChatUsers/:id/joinedrooms/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use ChatUser.joinedrooms() instead.
        "::get::ChatUser::joinedrooms": {
          isArray: true,
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "GET"
        },

        // INTERNAL. Use ChatUser.joinedrooms.create() instead.
        "::create::ChatUser::joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "POST"
        },

        // INTERNAL. Use ChatUser.joinedrooms.createMany() instead.
        "::createMany::ChatUser::joinedrooms": {
          isArray: true,
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "POST"
        },

        // INTERNAL. Use ChatUser.joinedrooms.destroyAll() instead.
        "::delete::ChatUser::joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms",
          method: "DELETE"
        },

        // INTERNAL. Use ChatUser.joinedrooms.count() instead.
        "::count::ChatUser::joinedrooms": {
          url: urlBase + "/ChatUsers/:id/joinedrooms/count",
          method: "GET"
        },

        // INTERNAL. Use Message.room() instead.
        "::get::Message::room": {
          url: urlBase + "/Messages/:id/room",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Room#updateOrCreate
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Room#update
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Room#destroyById
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Room#removeById
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Room#modelName
    * @propertyOf lbServices.Room
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Room`.
    */
    R.modelName = "Room";

    /**
     * @ngdoc object
     * @name lbServices.Room.users
     * @header lbServices.Room.users
     * @object
     * @description
     *
     * The object `Room.users` groups methods
     * manipulating `ChatUser` instances related to `Room`.
     *
     * Call {@link lbServices.Room#users Room.users()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Room#users
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Queries users of Room.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::get::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#count
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Counts users of Room.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.users.count = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::count::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#create
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.create = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::create::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#createMany
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.createMany = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::createMany::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#destroyAll
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Deletes all users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyAll = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::delete::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#destroyById
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Delete a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyById = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::destroyById::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#exists
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Check the existence of users relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.exists = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::exists::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#findById
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Find a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.findById = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::findById::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#link
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Add a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.link = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::link::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#unlink
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Remove the users relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.unlink = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::unlink::Room::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.users#updateById
         * @methodOf lbServices.Room.users
         *
         * @description
         *
         * Update a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.users.updateById = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::updateById::Room::users"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Room.messages
     * @header lbServices.Room.messages
     * @object
     * @description
     *
     * The object `Room.messages` groups methods
     * manipulating `Message` instances related to `Room`.
     *
     * Call {@link lbServices.Room#messages Room.messages()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Room#messages
         * @methodOf lbServices.Room
         *
         * @description
         *
         * Queries messages of Room.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R.messages = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::get::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#count
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Counts messages of Room.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.messages.count = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::count::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#create
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Creates a new instance in messages of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R.messages.create = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::create::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#createMany
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Creates a new instance in messages of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R.messages.createMany = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::createMany::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#destroyAll
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Deletes all messages of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.messages.destroyAll = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::delete::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#destroyById
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Delete a related item by id for messages.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for messages
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.messages.destroyById = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::destroyById::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#findById
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Find a related item by id for messages.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for messages
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R.messages.findById = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::findById::Room::messages"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Room.messages#updateById
         * @methodOf lbServices.Room.messages
         *
         * @description
         *
         * Update a related item by id for messages.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for messages
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R.messages.updateById = function() {
          var TargetResource = $injector.get("Message");
          var action = TargetResource["::updateById::Room::messages"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Message
 * @header lbServices.Message
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Message` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Message",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Messages/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Message.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/Messages/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Message.room() instead.
        "prototype$__get__room": {
          url: urlBase + "/Messages/:id/room",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#create
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Messages",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#createMany
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Messages",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#upsert
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Messages",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#exists
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Messages/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#findById
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Messages/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#find
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Messages",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#findOne
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Messages/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#updateAll
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Messages/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#deleteById
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Messages/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#count
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Messages/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#prototype$updateAttributes
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Messages/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Message#createChangeStream
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Messages/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Room.messages.findById() instead.
        "::findById::Room::messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "GET"
        },

        // INTERNAL. Use Room.messages.destroyById() instead.
        "::destroyById::Room::messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Room.messages.updateById() instead.
        "::updateById::Room::messages": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Rooms/:id/messages/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Room.messages() instead.
        "::get::Room::messages": {
          isArray: true,
          url: urlBase + "/Rooms/:id/messages",
          method: "GET"
        },

        // INTERNAL. Use Room.messages.create() instead.
        "::create::Room::messages": {
          url: urlBase + "/Rooms/:id/messages",
          method: "POST"
        },

        // INTERNAL. Use Room.messages.createMany() instead.
        "::createMany::Room::messages": {
          isArray: true,
          url: urlBase + "/Rooms/:id/messages",
          method: "POST"
        },

        // INTERNAL. Use Room.messages.destroyAll() instead.
        "::delete::Room::messages": {
          url: urlBase + "/Rooms/:id/messages",
          method: "DELETE"
        },

        // INTERNAL. Use Room.messages.count() instead.
        "::count::Room::messages": {
          url: urlBase + "/Rooms/:id/messages/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Message#updateOrCreate
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Message#update
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Message#destroyById
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Message#removeById
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Message` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Message#modelName
    * @propertyOf lbServices.Message
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Message`.
    */
    R.modelName = "Message";


        /**
         * @ngdoc method
         * @name lbServices.Message#user
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ChatUser` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("ChatUser");
          var action = TargetResource["::get::Message::user"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Message#room
         * @methodOf lbServices.Message
         *
         * @description
         *
         * Fetches belongsTo relation room.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Room` object.)
         * </em>
         */
        R.room = function() {
          var TargetResource = $injector.get("Room");
          var action = TargetResource["::get::Message::room"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.BusService
 * @header lbServices.BusService
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `BusService` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "BusService",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/BusServices/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use BusService.bus() instead.
        "prototype$__get__bus": {
          url: urlBase + "/BusServices/:id/bus",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#create
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/BusServices",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#createMany
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/BusServices",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#upsert
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/BusServices",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#exists
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/BusServices/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#findById
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/BusServices/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#find
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/BusServices",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#findOne
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/BusServices/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#updateAll
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/BusServices/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#deleteById
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/BusServices/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#count
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/BusServices/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#prototype$updateAttributes
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/BusServices/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusService#createChangeStream
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/BusServices/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Bus.busServices.findById() instead.
        "::findById::Bus::busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bus.busServices.destroyById() instead.
        "::destroyById::Bus::busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bus.busServices.updateById() instead.
        "::updateById::Bus::busServices": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buses/:id/busServices/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bus.busServices() instead.
        "::get::Bus::busServices": {
          isArray: true,
          url: urlBase + "/Buses/:id/busServices",
          method: "GET"
        },

        // INTERNAL. Use Bus.busServices.create() instead.
        "::create::Bus::busServices": {
          url: urlBase + "/Buses/:id/busServices",
          method: "POST"
        },

        // INTERNAL. Use Bus.busServices.createMany() instead.
        "::createMany::Bus::busServices": {
          isArray: true,
          url: urlBase + "/Buses/:id/busServices",
          method: "POST"
        },

        // INTERNAL. Use Bus.busServices.destroyAll() instead.
        "::delete::Bus::busServices": {
          url: urlBase + "/Buses/:id/busServices",
          method: "DELETE"
        },

        // INTERNAL. Use Bus.busServices.count() instead.
        "::count::Bus::busServices": {
          url: urlBase + "/Buses/:id/busServices/count",
          method: "GET"
        },

        // INTERNAL. Use BusSubscription.busService() instead.
        "::get::BusSubscription::busService": {
          url: urlBase + "/BusSubscriptions/:id/busService",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.BusService#updateOrCreate
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.BusService#update
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.BusService#destroyById
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.BusService#removeById
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.BusService#modelName
    * @propertyOf lbServices.BusService
    * @description
    * The name of the model represented by this $resource,
    * i.e. `BusService`.
    */
    R.modelName = "BusService";


        /**
         * @ngdoc method
         * @name lbServices.BusService#bus
         * @methodOf lbServices.BusService
         *
         * @description
         *
         * Fetches belongsTo relation bus.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bus` object.)
         * </em>
         */
        R.bus = function() {
          var TargetResource = $injector.get("Bus");
          var action = TargetResource["::get::BusService::bus"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.ExpenseType
 * @header lbServices.ExpenseType
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ExpenseType` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ExpenseType",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/ExpenseTypes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use ExpenseType.expensePayments.findById() instead.
        "prototype$__findById__expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "GET"
        },

        // INTERNAL. Use ExpenseType.expensePayments.destroyById() instead.
        "prototype$__destroyById__expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ExpenseType.expensePayments.updateById() instead.
        "prototype$__updateById__expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ExpenseType.expensePayments() instead.
        "prototype$__get__expensePayments": {
          isArray: true,
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "GET"
        },

        // INTERNAL. Use ExpenseType.expensePayments.create() instead.
        "prototype$__create__expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "POST"
        },

        // INTERNAL. Use ExpenseType.expensePayments.destroyAll() instead.
        "prototype$__delete__expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "DELETE"
        },

        // INTERNAL. Use ExpenseType.expensePayments.count() instead.
        "prototype$__count__expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#create
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/ExpenseTypes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#createMany
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/ExpenseTypes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#upsert
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/ExpenseTypes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#exists
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/ExpenseTypes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#findById
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/ExpenseTypes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#find
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/ExpenseTypes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#findOne
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/ExpenseTypes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#updateAll
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/ExpenseTypes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#deleteById
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/ExpenseTypes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#count
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/ExpenseTypes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#prototype$updateAttributes
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/ExpenseTypes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#createChangeStream
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/ExpenseTypes/change-stream",
          method: "POST"
        },

        // INTERNAL. Use ExpensePayment.expenseType() instead.
        "::get::ExpensePayment::expenseType": {
          url: urlBase + "/ExpensePayments/:id/expenseType",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#updateOrCreate
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#update
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#destroyById
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#removeById
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.ExpenseType#modelName
    * @propertyOf lbServices.ExpenseType
    * @description
    * The name of the model represented by this $resource,
    * i.e. `ExpenseType`.
    */
    R.modelName = "ExpenseType";

    /**
     * @ngdoc object
     * @name lbServices.ExpenseType.expensePayments
     * @header lbServices.ExpenseType.expensePayments
     * @object
     * @description
     *
     * The object `ExpenseType.expensePayments` groups methods
     * manipulating `ExpensePayment` instances related to `ExpenseType`.
     *
     * Call {@link lbServices.ExpenseType#expensePayments ExpenseType.expensePayments()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.ExpenseType#expensePayments
         * @methodOf lbServices.ExpenseType
         *
         * @description
         *
         * Queries expensePayments of ExpenseType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R.expensePayments = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::get::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#count
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Counts expensePayments of ExpenseType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.expensePayments.count = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::count::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#create
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Creates a new instance in expensePayments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R.expensePayments.create = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::create::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#createMany
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Creates a new instance in expensePayments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R.expensePayments.createMany = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::createMany::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#destroyAll
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Deletes all expensePayments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.expensePayments.destroyAll = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::delete::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#destroyById
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Delete a related item by id for expensePayments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for expensePayments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.expensePayments.destroyById = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::destroyById::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#findById
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Find a related item by id for expensePayments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for expensePayments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R.expensePayments.findById = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::findById::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.ExpenseType.expensePayments#updateById
         * @methodOf lbServices.ExpenseType.expensePayments
         *
         * @description
         *
         * Update a related item by id for expensePayments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for expensePayments
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R.expensePayments.updateById = function() {
          var TargetResource = $injector.get("ExpensePayment");
          var action = TargetResource["::updateById::ExpenseType::expensePayments"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.ExpensePayment
 * @header lbServices.ExpensePayment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ExpensePayment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ExpensePayment",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/ExpensePayments/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use ExpensePayment.expenseType() instead.
        "prototype$__get__expenseType": {
          url: urlBase + "/ExpensePayments/:id/expenseType",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#create
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/ExpensePayments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#createMany
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/ExpensePayments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#upsert
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/ExpensePayments",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#exists
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/ExpensePayments/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#findById
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/ExpensePayments/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#find
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/ExpensePayments",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#findOne
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/ExpensePayments/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#updateAll
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/ExpensePayments/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#deleteById
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/ExpensePayments/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#count
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/ExpensePayments/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#prototype$updateAttributes
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/ExpensePayments/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#createChangeStream
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/ExpensePayments/change-stream",
          method: "POST"
        },

        // INTERNAL. Use ExpenseType.expensePayments.findById() instead.
        "::findById::ExpenseType::expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "GET"
        },

        // INTERNAL. Use ExpenseType.expensePayments.destroyById() instead.
        "::destroyById::ExpenseType::expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use ExpenseType.expensePayments.updateById() instead.
        "::updateById::ExpenseType::expensePayments": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/ExpenseTypes/:id/expensePayments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use ExpenseType.expensePayments() instead.
        "::get::ExpenseType::expensePayments": {
          isArray: true,
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "GET"
        },

        // INTERNAL. Use ExpenseType.expensePayments.create() instead.
        "::create::ExpenseType::expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "POST"
        },

        // INTERNAL. Use ExpenseType.expensePayments.createMany() instead.
        "::createMany::ExpenseType::expensePayments": {
          isArray: true,
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "POST"
        },

        // INTERNAL. Use ExpenseType.expensePayments.destroyAll() instead.
        "::delete::ExpenseType::expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments",
          method: "DELETE"
        },

        // INTERNAL. Use ExpenseType.expensePayments.count() instead.
        "::count::ExpenseType::expensePayments": {
          url: urlBase + "/ExpenseTypes/:id/expensePayments/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#updateOrCreate
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#update
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#destroyById
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#removeById
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpensePayment` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.ExpensePayment#modelName
    * @propertyOf lbServices.ExpensePayment
    * @description
    * The name of the model represented by this $resource,
    * i.e. `ExpensePayment`.
    */
    R.modelName = "ExpensePayment";


        /**
         * @ngdoc method
         * @name lbServices.ExpensePayment#expenseType
         * @methodOf lbServices.ExpensePayment
         *
         * @description
         *
         * Fetches belongsTo relation expenseType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ExpenseType` object.)
         * </em>
         */
        R.expenseType = function() {
          var TargetResource = $injector.get("ExpenseType");
          var action = TargetResource["::get::ExpensePayment::expenseType"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.FeeSetup
 * @header lbServices.FeeSetup
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `FeeSetup` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "FeeSetup",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/FeeSetups/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use FeeSetup.feeType() instead.
        "prototype$__get__feeType": {
          url: urlBase + "/FeeSetups/:id/feeType",
          method: "GET"
        },

        // INTERNAL. Use FeeSetup.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/FeeSetups/:id/class",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#create
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/FeeSetups",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#createMany
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/FeeSetups",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#upsert
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/FeeSetups",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#exists
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/FeeSetups/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#findById
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/FeeSetups/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#find
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/FeeSetups",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#findOne
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/FeeSetups/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#updateAll
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/FeeSetups/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#deleteById
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/FeeSetups/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#count
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/FeeSetups/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#prototype$updateAttributes
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/FeeSetups/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#createChangeStream
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/FeeSetups/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Class.feeSetups() instead.
        "::get::Class::feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "GET"
        },

        // INTERNAL. Use Class.feeSetups.create() instead.
        "::create::Class::feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use Class.feeSetups.createMany() instead.
        "::createMany::Class::feeSetups": {
          isArray: true,
          url: urlBase + "/Classes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use Class.feeSetups.update() instead.
        "::update::Class::feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "PUT"
        },

        // INTERNAL. Use Class.feeSetups.destroy() instead.
        "::destroy::Class::feeSetups": {
          url: urlBase + "/Classes/:id/feeSetups",
          method: "DELETE"
        },

        // INTERNAL. Use FeeType.feeSetups.findById() instead.
        "::findById::FeeType::feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "GET"
        },

        // INTERNAL. Use FeeType.feeSetups.destroyById() instead.
        "::destroyById::FeeType::feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use FeeType.feeSetups.updateById() instead.
        "::updateById::FeeType::feeSetups": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/FeeTypes/:id/feeSetups/:fk",
          method: "PUT"
        },

        // INTERNAL. Use FeeType.feeSetups() instead.
        "::get::FeeType::feeSetups": {
          isArray: true,
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "GET"
        },

        // INTERNAL. Use FeeType.feeSetups.create() instead.
        "::create::FeeType::feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use FeeType.feeSetups.createMany() instead.
        "::createMany::FeeType::feeSetups": {
          isArray: true,
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "POST"
        },

        // INTERNAL. Use FeeType.feeSetups.destroyAll() instead.
        "::delete::FeeType::feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups",
          method: "DELETE"
        },

        // INTERNAL. Use FeeType.feeSetups.count() instead.
        "::count::FeeType::feeSetups": {
          url: urlBase + "/FeeTypes/:id/feeSetups/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#updateOrCreate
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#update
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#destroyById
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#removeById
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeSetup` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.FeeSetup#modelName
    * @propertyOf lbServices.FeeSetup
    * @description
    * The name of the model represented by this $resource,
    * i.e. `FeeSetup`.
    */
    R.modelName = "FeeSetup";


        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#feeType
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Fetches belongsTo relation feeType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FeeType` object.)
         * </em>
         */
        R.feeType = function() {
          var TargetResource = $injector.get("FeeType");
          var action = TargetResource["::get::FeeSetup::feeType"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FeeSetup#class
         * @methodOf lbServices.FeeSetup
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::FeeSetup::class"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.BusSubscription
 * @header lbServices.BusSubscription
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `BusSubscription` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "BusSubscription",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/BusSubscriptions/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use BusSubscription.busService() instead.
        "prototype$__get__busService": {
          url: urlBase + "/BusSubscriptions/:id/busService",
          method: "GET"
        },

        // INTERNAL. Use BusSubscription.student() instead.
        "prototype$__get__student": {
          url: urlBase + "/BusSubscriptions/:id/student",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#create
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/BusSubscriptions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#createMany
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/BusSubscriptions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#upsert
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/BusSubscriptions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#exists
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/BusSubscriptions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#findById
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/BusSubscriptions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#find
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/BusSubscriptions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#findOne
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/BusSubscriptions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#updateAll
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/BusSubscriptions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#deleteById
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/BusSubscriptions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#count
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/BusSubscriptions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#prototype$updateAttributes
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/BusSubscriptions/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#createChangeStream
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/BusSubscriptions/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Student.busSubscriptions() instead.
        "::get::Student::busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "GET"
        },

        // INTERNAL. Use Student.busSubscriptions.create() instead.
        "::create::Student::busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "POST"
        },

        // INTERNAL. Use Student.busSubscriptions.createMany() instead.
        "::createMany::Student::busSubscriptions": {
          isArray: true,
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "POST"
        },

        // INTERNAL. Use Student.busSubscriptions.update() instead.
        "::update::Student::busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "PUT"
        },

        // INTERNAL. Use Student.busSubscriptions.destroy() instead.
        "::destroy::Student::busSubscriptions": {
          url: urlBase + "/Students/:id/busSubscriptions",
          method: "DELETE"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#updateOrCreate
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#update
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#destroyById
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#removeById
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusSubscription` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.BusSubscription#modelName
    * @propertyOf lbServices.BusSubscription
    * @description
    * The name of the model represented by this $resource,
    * i.e. `BusSubscription`.
    */
    R.modelName = "BusSubscription";


        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#busService
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Fetches belongsTo relation busService.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BusService` object.)
         * </em>
         */
        R.busService = function() {
          var TargetResource = $injector.get("BusService");
          var action = TargetResource["::get::BusSubscription::busService"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.BusSubscription#student
         * @methodOf lbServices.BusSubscription
         *
         * @description
         *
         * Fetches belongsTo relation student.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Student` object.)
         * </em>
         */
        R.student = function() {
          var TargetResource = $injector.get("Student");
          var action = TargetResource["::get::BusSubscription::student"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Exam
 * @header lbServices.Exam
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Exam` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Exam",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Exams/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Exam.class() instead.
        "prototype$__get__class": {
          url: urlBase + "/Exams/:id/class",
          method: "GET"
        },

        // INTERNAL. Use Exam.school() instead.
        "prototype$__get__school": {
          url: urlBase + "/Exams/:id/school",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#create
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Exams",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#createMany
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Exams",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#upsert
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Exams",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#exists
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Exams/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#findById
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Exams/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#find
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Exams",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#findOne
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Exams/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#updateAll
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Exams/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#deleteById
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Exams/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#count
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Exams/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#prototype$updateAttributes
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Exams/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Exam#createChangeStream
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Exams/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Class.exams.findById() instead.
        "::findById::Class::exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "GET"
        },

        // INTERNAL. Use Class.exams.destroyById() instead.
        "::destroyById::Class::exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Class.exams.updateById() instead.
        "::updateById::Class::exams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Classes/:id/exams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Class.exams() instead.
        "::get::Class::exams": {
          isArray: true,
          url: urlBase + "/Classes/:id/exams",
          method: "GET"
        },

        // INTERNAL. Use Class.exams.create() instead.
        "::create::Class::exams": {
          url: urlBase + "/Classes/:id/exams",
          method: "POST"
        },

        // INTERNAL. Use Class.exams.createMany() instead.
        "::createMany::Class::exams": {
          isArray: true,
          url: urlBase + "/Classes/:id/exams",
          method: "POST"
        },

        // INTERNAL. Use Class.exams.destroyAll() instead.
        "::delete::Class::exams": {
          url: urlBase + "/Classes/:id/exams",
          method: "DELETE"
        },

        // INTERNAL. Use Class.exams.count() instead.
        "::count::Class::exams": {
          url: urlBase + "/Classes/:id/exams/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Exam#updateOrCreate
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Exam#update
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Exam#destroyById
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Exam#removeById
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Exam` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Exam#modelName
    * @propertyOf lbServices.Exam
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Exam`.
    */
    R.modelName = "Exam";


        /**
         * @ngdoc method
         * @name lbServices.Exam#class
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Fetches belongsTo relation class.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.class = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Exam::class"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Exam#school
         * @methodOf lbServices.Exam
         *
         * @description
         *
         * Fetches belongsTo relation school.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `School` object.)
         * </em>
         */
        R.school = function() {
          var TargetResource = $injector.get("School");
          var action = TargetResource["::get::Exam::school"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Grade
 * @header lbServices.Grade
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Grade` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Grade",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Grades/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Grade#create
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Grades",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#createMany
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Grades",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#upsert
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Grades",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#exists
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Grades/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#findById
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Grades/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#find
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Grades",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#findOne
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Grades/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#updateAll
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Grades/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#deleteById
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Grades/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#count
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Grades/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#prototype$updateAttributes
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Grades/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Grade#createChangeStream
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Grades/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Grade#updateOrCreate
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Grade#update
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Grade#destroyById
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Grade#removeById
         * @methodOf lbServices.Grade
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Grade` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Grade#modelName
    * @propertyOf lbServices.Grade
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Grade`.
    */
    R.modelName = "Grade";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Marks
 * @header lbServices.Marks
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Marks` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Marks",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Marks/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Marks#create
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Marks",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#createMany
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Marks",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#upsert
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Marks",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#exists
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Marks/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#findById
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Marks/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#find
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Marks",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#findOne
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Marks/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#updateAll
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Marks/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#deleteById
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Marks/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#count
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Marks/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#prototype$updateAttributes
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Marks/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Marks#createChangeStream
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Marks/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Marks#updateOrCreate
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Marks#update
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Marks#destroyById
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Marks#removeById
         * @methodOf lbServices.Marks
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Marks` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Marks#modelName
    * @propertyOf lbServices.Marks
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Marks`.
    */
    R.modelName = "Marks";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.EmailN
 * @header lbServices.EmailN
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `EmailN` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "EmailN",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/EmailNs/:id",
      { 'id': '@id' },
      {
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.EmailN#modelName
    * @propertyOf lbServices.EmailN
    * @description
    * The name of the model represented by this $resource,
    * i.e. `EmailN`.
    */
    R.modelName = "EmailN";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch(err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
