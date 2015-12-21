module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            browserify: {
                files: ['client/react/**/*.jsx', 'client/react/**/*.js'],
                tasks: ['browserify:dev']
            },
            concat: {
                files: ['client/sass/**/*.scss'],
                tasks: ['concat:dist']
            },
            sass: {
                files: ['build/sass/**/*.scss'],
                tasks: ['sass:dist']
            },
            cssmin: {
                files: ['public/stylesheets/**/*.css'],
                tasks: ['cssmin']
            },
            livereload: {
                options: { livereload: true },
                files: ['public/**/*'],
            },
            options: {
                nospawn: false
            }
        },
        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: ['reactify']
                },
                files: {
                    'public/javascripts/bundle.js': ['client/react/**/*.jsx','client/react/**/*.js']
                }
            },
            dist: {
                options: {
                    debug: false,
                    transform: ['reactify']
                },
                files: {
                    'public/javascripts/bundle.js': ['client/react/**/*.jsx','client/react/**/*.js']
                }
            }
        },
        bower_concat: {
            main: {
                dest: 'public/javascripts/vendor/bower.js',
                cssDest: 'public/stylesheets/vendor/bower.css',
                mainFiles: {
                    bootstrap: [ 'dist/css/bootstrap.min.css', 'dist/js/bootstrap.min.js' ]
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'client/sass/**/*.scss',
                ],
                dest: 'build/sass/build.scss',
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/sass',
                    src: ['build.scss'],
                    dest: 'public/stylesheets',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/stylesheets',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify:dist', 'bower_concat', 'concat', 'sass', 'cssmin']);

};