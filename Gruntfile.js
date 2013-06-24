/*
 backgrid-text-cell
 A backgrid extension
 https://github.com/wyuenho/backgrid-text-cell

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
      dist:[
        "dist",
        "components"
      ],
      api: [
        "api"
      ],
      default: [
        "*.min.*",
        "test/coverage/**/*"
      ]
    },
    concat: {
      backgrid: {
        options: {
          banner: '/*!\n  <%= pkg.name %>\n' +
            '  <%= pkg.repository.url %>\n\n' +
            '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '  Licensed under the MIT license.\n' +
            '*/\n\n'
        },
        src: [
          "src/*.js"
        ],
        dest: "dist/backgrid-text-cell.js"
      }
    },
    jasmine: {
      test: {
        version: "1.3.1",
        src: [
          "src/backgrid-text-cell.js"
        ],
        options: {
          specs: [
            "test/text-cell.js"
          ],
          /**
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
          **/
          vendor: [
            "components/jquery/jquery.js",
            "components/underscore/underscore.js",
            "components/backbone/backbone.js",
            "components/backgrid/lib/backgrid.js"
          ]
        }
      }
    },
    jsduck: {
      main: {
        src: ["src/*.js"],
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
          "dist/backgrid-text-cell.css": ["src/*.css"]
        }
      },
      "default": {
        options: {
          compress: true
        },
        files: {
          "dist/backgrid-text-cell.min.css": ["src/*.css"]
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
          "dist/backgrid-text-cell.min.js": ["src/*.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-recess");
  grunt.loadNpmTasks("grunt-jsduck");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("dist", ["uglify", "recess"]);
  grunt.registerTask("default", ["clean", "jsduck", "dist", "jasmine"]);
};
