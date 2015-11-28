module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: ['reactify']
                },
                files: {
                    'public/javascripts/bundle.js': 'client/react/**/*.jsx'
                }
            },
            build: {
                options: {
                    debug: false,
                    transform: ['reactify']
                },
                files: {
                    'public/javascripts/bundle.js': 'client/react/**/*.jsx'
                }
            }
        },
        watch: {
            browserify: {
                files: ['client/react/**/*.jsx', 'client/react/**/*.js'],
                tasks: ['browserify:dev']
            },
            options: {
                nospawn: true
            }
        },
        concat: {
            dist: {
                src: [
                    'client/sass/**/*.scss',
                ],
                dest: 'client/sass/build.scss',
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/sass',
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify:build', 'concat', 'sass', 'cssmin']);

};