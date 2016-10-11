module.exports = function(grunt) {


    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'extended'
                },
                files: {
                    'dist/css/style.css': 'src/css/*.scss'
                }
            } 
        },
        concat: {
            options: {
              separator: '',
            },
            dist: {
              src: ['src/js/intro.js', 'src/js/config.js', 'src/js/vars.js', 'src/js/main.js', 'src/js/zoomIn.js', 'src/js/zoomOut.js', 'src/js/controls.js', 'src/js/init.js', 'src/js/outro.js'],
              dest: 'dist/js/script.js',
            },
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile'},

                    ],
            },
        },
        imagemin: {
            dist: {
                files: [{
                expand: true,                              // Enable dynamic expansion
                cwd: 'src/',                     // Src matches are relative to this path
                src: ['img/*.{png,jpg,gif}'],// Actual patterns to match
                dest:'dist/'                      // Destination path prefix
                }]
            },
        },

        watch: {
            css: {
                files: 'src/css/*.scss',
                tasks: ['sass'],
                options: {
                  livereload: true,
                },
            },
            scripts: {
                files: 'src/js/*.js',
                tasks: ['concat'],
                options: {
                  interrupt: true,
                },
            },
            html: {
                files: 'src/*.html',
                tasks: ['copy'],
                options: {
                  interrupt: true,
                },
            },
            images: {
                files: ['src/img/*.{png,jpg,gif}'],
                tasks: ['imagemin:dist'],
                options: {
                spawn: false,
              }
            },
        },


            // 2. Configuration for concatinating files goes here.

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'concat', 'copy', 'imagemin', 'watch']);

};