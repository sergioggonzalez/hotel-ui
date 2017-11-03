module.exports = function(grunt) {

    grunt.initConfig({
       clean: {
            dist: ['dist']
        },
        copy: {
            views: {
              files: [
                {
                    expand: true,
                    cwd: 'app/',
                    src: [
                        'views/**/*.html',
                        'assets/**/*.'
                    ], 
                    dest: 'dist/'
                }
              ],
            },
          },
        concat: {
          js: {
            src: ['app/scripts/**/*.js'],
            dest: 'dist/scripts/scripts.js',
          },
          css: {
            src: ['app/styles/**/*.css'],
            dest: 'dist/styles/styles.css',
          }
        },
        watch: {
            options: {
                livereload: true,
            },
            indexHtml: {
                files: ['app/index.html'],
                tasks: ['build'],
            },
            html: {
                files: ['app/views/**/*.html'],
                tasks: ['copy:views'],
            },
            js: {
              files: ['app/scripts/**/*.js'],
              tasks: ['concat:js'],
            },
            css: {
                files: ['app/styles/**/*.css'],
                tasks: ['concat:css'],
            },
            files: ['assets/**/*.*'],
            includeSource: {
                // Watch for added and deleted scripts to update index.html
                files: ['app/**/*.js','app/**/*.css'],
                tasks: ['includeSource'],
                options: {
                    event: ['added', 'deleted']
                }
            }
          },
          connect: {
            server: {
              options: {
                port: 8080,
                base: './dist',
                hostname: '0.0.0.0',
                protocol: 'http',
                livereload: true,
                open: true,
              }
            }
          },
          includeSource: {
                options: {
                //This is the directory inside which grunt-include-source will be looking for files
                basePath: 'app'
            },
            app: {
                files: {
                    //Overwriting index.html
                    'app/index.html': 'app/index.html'
                }
            }
        },
        replace: {
            concatenated: {
                files: [
                    {
                        cwd: 'app/',
                        dest: 'dist/',
                        expand: true,
                        src: [ 'index.html' ]
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
                            replacement: '<script src="scripts/vendo.js"></script>\n'
                                        + '<script src="scripts/scripts.js"></script>'
                        },
                        {
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: '<link href="styles/vendo.css" rel="stylesheet" type="text/css">\n'
                                        + '<link href="styles/styles.css" rel="stylesheet" type="text/css">'
                        }
                    ]
                }
            }
        },
        bower_concat: {
            all: {
              dest: {
                'js': 'dist/scripts/vendo.js',
                'css': 'dist/styles/vendo.css'
              },
              mainFiles: {
                'bootstrap': 'dist/css/bootstrap.min.css',
                'jquery-ui': ['jquery-ui.min.js', 'themes/base/jquery-ui.min.css']
              },
              dependencies: {

              },
              bowerOptions: {
                relative: false
              }
            }
          }
      });
    
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['build']);

    grunt.registerTask('dev', ['build', 'connect', 'watch']);

    grunt.registerTask('build', ['clean:dist','bower_concat', 'concat', 'includeSource', 'replace:concatenated', 'copy:views']);
};