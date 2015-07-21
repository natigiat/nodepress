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


      // html: {
      //   files: ['app/**/*html' ,  'app/**/*scss', 'app/**/*scss'],
      // },

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
      options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
        },
      local_dependencies: {
        files: {
          'app/index.html': ['app/public/js/**/*.js', 'app/public/styles/build/main.css'],
        }
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