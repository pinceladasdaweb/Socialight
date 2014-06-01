module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        uglify: {
            options: {
                preserveComments: 'all'
            },
            src: {
                files: {
                    'build/socialight.min.js': ['src/socialight.js']
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify' ]);
};
