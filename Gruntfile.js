module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        uglify: {
            options: {
                preserveComments: 'all'
            },
            src: {
                files: {
                    'build/socialight.min.js': [
                        'src/promise.js',
                        'src/socialight.js',
                        'src/xhr.js',
                        'src/twitter.js',
                        'src/facebook.js',
                        'src/linkedin.js',
                        'src/buffer.js',
                        'src/google-plus.js'
                    ]
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify' ]);
};
