module.exports = function(grunt){
	grunt.initConfig({
        cssmin: {
			target: {
				files: [{
					expand: true, 
					cwd : 'public/css', 
					src : ['*.css'],
					dest : 'public/css', ext: '.min.css'
				}]
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: [{
					expand: true,
					cwd: 'public/js',
					src: '*.js',
					dest: 'public/js', ext: '.min.js'
				}]
			}
		},
		nodemon: {
			dev: {
				script: 'bin/www'
			}
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('dev', ['cssmin','uglify','nodemon']);
};