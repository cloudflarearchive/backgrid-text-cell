/*
  backgrid-text-cell
  http://github.com/wyuenho/backgrid-text-cell

  Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
  Licensed under the MIT license.
*/

// jshint globalstrict:true, node:true

"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      options: {
        force: true
      },
      api: [
        "api/**/*"
      ],
      "default": [
        "*.min.*",
        "test/coverage/**/*"
      ]
    },
    jasmine: {
      test: {
        version: "1.3.1",
        src: [
          "backgrid-text-cell.js"
        ],
        options: {
          specs: [
            "test/text-cell.js"
          ],
          template: require("grunt-template-jasmine-istanbul"),
          templateOptions: {
            coverage: "test/coverage/coverage.json",
            report: {
              type: "html",
              options: {
                dir: "test/coverage"
              }
            }
          },
          vendor: [
            "test/vendor/js/jquery.js",
            "test/vendor/js/bootstrap.js",
            "test/vendor/js/underscore.js",
            "test/vendor/js/backbone.js",
            "test/vendor/js/backgrid.js",
          ]
        }
      }
    },
    jsduck: {
      main: {
        src: ["backgrid-text-cell.js"],
        dest: "api",
        options: {
          "title": "backgrid-text-cell",
          "no-source": true,
          "categories": "categories.json",
          "warnings": "-no_doc",
          "pretty-json": true
        }
      }
    },
    recess: {
      csslint: {
        options: {
          compile: true
        },
        files: {
          "backgrid-text-cell.css": ["backgrid-text-cell.css"]
        }
      },
      "default": {
        options: {
          compress: true
        },
        files: {
          "backgrid-text-cell.min.css": ["backgrid-text-cell.css"]
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: "some"
      },
      "default": {
        files: {
          "backgrid-text-cell.min.js": ["backgrid-text-cell.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-recess");
  grunt.loadNpmTasks("grunt-jsduck");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("dist", ["uglify", "recess"]);
  grunt.registerTask("default", ["clean", "jsduck", "dist", "jasmine"]);
};
