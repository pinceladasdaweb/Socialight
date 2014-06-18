var banner = '/* \n' +
            '-------------------------------- \n' +
            'Socialight \n' +
            '-------------------------------- \n' +
            '+ Get Social Network Share Counts with Vanilla JS \n' +
            '+ https://github.com/pinceladasdaweb/Socialight \n' +
            '+ version 0.0.5 \n' +
            '+ Copyright 2014 Pedro Rogerio \n' +
            '+ Licensed under the MIT license \n' +
            '\n' +
            '+ Documentation: https://github.com/pinceladasdaweb/Socialight \n' +
            '*/ \n';

module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        concat: {
            options: {
                banner: banner,
            },
            dist: {
                src: ['src/polyfill.js', 'src/promise.js', 'src/xhr.js', 'src/buffer.js', 'src/facebook.js', 'src/google-plus.js', 'src/linkedin.js', 'src/twitter.js', 'src/pinterest.js', 'src/socialight.js'],
                dest: 'build/socialight.js',
            },
        },
        uglify: {
            options: {
                banner: banner
            },
            src: {
                files: {
                    'build/socialight.min.js': ['build/socialight.js']
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'concat', 'uglify' ]);
};
