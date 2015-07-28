'use strict';

var path = require('path');


module.exports = function(grunt) {


  // Load grunt tasks automatically, when needed

  require('jit-grunt')(grunt, {
    injector: 'grunt-asset-injector'
  });


  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);



  // Configure Grunt
  grunt.initConfig({


     watch: {

    injectController: {
       files: ['app/controllers/**/*.js'],
       tasks: ['injector:controllers']
     },
     injectDirectives: {
       files: ['app/directives/**/*.js'],
       tasks: ['injector:directives']
     },


      html: {
        files: ['app/**/*html' ,  'app/**/*scss', 'app/**/*scss'],
      },

      sass: {
        files: ['app/public/styles/**/*.{scss,sass}'],
        tasks: ['sass'],
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      livereload: {
        files: [
          'app/**/*.html',
          'app/**/*.js',
          'app/**/*.html',
        ],
        options: {
          livereload: true
        }
      },

    },


     sass: {
      dist: {
        files: {
             'app/public/styles/build/main.css': 'app/public/styles/sass/main.scss'
        }
      }
    },


    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/public/styles/css/',
          src: ['main.css', '!*.min.css'],
          dest: 'app/public/styles/build/',
          ext: '.min.css'
        }]
      }
    },


    wiredep: {

      target: {
        src: 'app/index.html',
        // ignorePath: '<%= yeoman.client %>/',
        // exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
      }

    },

    express: {
      dev: {
        options: {
            port: 3000,
            bases: path.resolve('app/'),
            debug: true,
            server: path.resolve('config/server/dev/server.js'),
        }
      }
    },

    injector: {
      style: {
        options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', '');
                return '<link rel="stylesheet" href="' + filePath + '">';
              },
              starttag: '<!-- injector:css -->',
              endtag: '<!-- endinjector -->'
            },
            files: {
              'app/index.html': ['app/public/styles/build/main.css'],
            }
        },


      // Inject component scss into app.scss
      js: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
            'app/index.html': ['app/app.js'],
        }
      },

      controllers: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:controllers -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
            'app/index.html': ['app/controllers/**/*.js'],
        }
      },

      directives: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:directives -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
            'app/index.html': ['app/directives/**/*.js'],
        }
      },
  },

  nodemon: {
    dev: {
     script: 'config/server/dev/server.js'
    }
  }, 
  
    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port%>',
        app: 'chrome'
      }
    }

  });

  // grunt.loadNpmTasks('grunt-express');
  grunt.registerTask('ex', [ 'injector']);
  grunt.registerTask('serve', [ 'express:dev' ,'sass' ,'cssmin','wiredep','open','injector', 'watch']);

};
