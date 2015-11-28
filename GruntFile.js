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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify:build']);

};